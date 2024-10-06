import os
from fastapi import APIRouter, Depends, HTTPException, Query  
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crawling.models import News, NewsKeyword, NewsPhoto  
from app.industries.models import Industry  
from datetime import datetime, timedelta
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd
import joblib
import time
import re
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from konlpy.tag import Okt
from apscheduler.schedulers.background import BackgroundScheduler
import logging

router = APIRouter()

# 전역적으로 okt와 tfidf vectorizer 선언
okt = Okt()
classifier_path = os.path.join(os.path.dirname(__file__), 'random_forest_model_ssafy_5year.pkl')
vectorizer_path = os.path.join(os.path.dirname(__file__), 'tfidf_vectorizer_ssafy_5year.pkl')
classifier = joblib.load(classifier_path)
vectorizer = joblib.load(vectorizer_path)

# 데이터베이스 세션 생성 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def update_related_news(db: Session, new_news_ids):
    start_time = time.time()

    # 모든 뉴스 데이터를 가져옵니다 (기존 뉴스 + 새로 추가된 뉴스)
    all_news_data = db.query(News).all()

    if not all_news_data:
        print("데이터베이스에 뉴스가 없습니다.")
        return

    # DataFrame으로 변환하여 처리
    final_df = pd.DataFrame([{
        'news_id': news.news_id,
        'news_title': news.news_title if news.news_title else "" 
    } for news in all_news_data])

    # TF-IDF를 사용하여 모든 뉴스의 제목을 벡터화
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(final_df['news_title'])

    # 코사인 유사도를 계산하여 연관 뉴스 추출
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # 새로 추가된 뉴스와 기존 뉴스 사이의 연관 뉴스 추출
    for idx, row in final_df.iterrows():
        if row['news_id'] in new_news_ids:  # 새로 추가된 뉴스인 경우
            sim_scores = list(enumerate(cosine_sim[idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            sim_scores = sim_scores[1:4]  # 가장 유사한 3개의 뉴스를 추출

            related_ids = [final_df.iloc[i[0]]['news_id'] for i in sim_scores]
            news_to_update = db.query(News).filter(News.news_id == row['news_id']).first()
            if news_to_update:
                news_to_update.related_news_id_1 = related_ids[0] if len(related_ids) > 0 else None
                news_to_update.related_news_id_2 = related_ids[1] if len(related_ids) > 1 else None
                news_to_update.related_news_id_3 = related_ids[2] if len(related_ids) > 2 else None
                db.add(news_to_update)
    
    db.commit()
    end_time = time.time()  # 시간 측정 종료
    print(f"연관 뉴스 업데이트 소요 시간: {end_time - start_time}초")



# TF-IDF 키워드 추출 함수
def extract_keywords_tfidf(text):
    # 명사만 추출
    nouns = okt.nouns(text)
    
    # 불용어 제거
    korean_stopwords = [
        "의", "가", "이", "은", "들", "는", "좀", "잘", "걍", "과", "도", "를", "으로", "자", "에", "와", "한", "하다", "있다", 
        "수", "그", "다", "같이", "더", "그리고", "중", "또한", "그러나", "등", "고", "것", "위",
        "지난", "이번", "이후", "지난해", "개월", "오전", "랍니", "그룹", "모든", "어디", "최근", "오늘",
    ]
    nouns = [noun for noun in nouns if noun not in korean_stopwords]

    # TF-IDF로 변환
    if nouns:
        text_for_tfidf = ' '.join(nouns)
        tfidf_matrix = vectorizer.transform([text_for_tfidf])
        feature_names = vectorizer.get_feature_names_out()
        scores = tfidf_matrix.toarray().flatten()

        # 상위 10개의 키워드 반환
        top_keywords = [feature_names[i] for i in np.argsort(scores)[-10:]]
        return ' '.join(top_keywords)
    else:
        return ""

# 크롤링 및 데이터 처리 함수
def crawl_news_data(start_date: datetime, end_date: datetime):
    start_time = time.time()
    
    # 크롬 드라이버 설정
    chrome_driver_path = os.path.join(os.path.dirname(__file__), 'chromedriver.exe')
    service = Service(chrome_driver_path)
    options = Options()
    # #크롬 창 숨기기
    # options.add_argument("--headless")  # 헤드리스 모드 설정
    # options.add_argument("--no-sandbox")  # 리눅스 환경에서 권한 문제 방지
    # options.add_argument("--disable-dev-shm-usage")  # 메모리 부족 문제 방지
    # #------------------------------------------------------------------
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    driver = webdriver.Chrome(service=service, options=options)

    # 데이터를 저장할 리스트 초기화
    data = []

    # 날짜 범위를 생성 (start_date부터 end_date까지)
    date_range = pd.date_range(start=start_date, end=end_date)

    for single_date in date_range:
        page = 1
        formatted_date = single_date.strftime('%Y%m%d')

        while True:
            url = f"https://finance.naver.com/news/news_list.naver?mode=LSS3D&section_id=101&section_id2=258&section_id3=402&date={formatted_date}&page={page}"
            driver.get(url)
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            news_items = soup.select('ul.realtimeNewsList dd.articleSubject a')

            if not news_items:
                print(f"더 이상 뉴스가 없습니다. 총 {page-1} 페이지 크롤링 완료.")
                break

            for item in news_items:
                try:
                    news_link = item.get('href')
                    news_title = item.text.strip()

                    driver.get(news_link)
                    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'newsct_article')))
                    news_html = driver.page_source
                    news_soup = BeautifulSoup(news_html, 'html.parser')
                    news_body = news_soup.find('div', id='newsct_article')
                    news_body_text = news_body.text.replace('\n', ' ').replace('\t', ' ').strip() if news_body else ""

                    if len(news_body_text) < 300:
                        print(f"뉴스 본문이 300자 미만입니다. 뉴스 링크: {news_link}")
                        continue

                    news_company = news_soup.find('img', class_='media_end_head_top_logo_img light_type _LAZY_LOADING _LAZY_LOADING_INIT_HIDE')
                    news_company_text = news_company['title'] if news_company else None
                    news_published_at = news_soup.find('span', class_='media_end_head_info_datestamp_time _ARTICLE_DATE_TIME')
                    news_published_at_text = news_published_at['data-date-time'] if news_published_at else None
                    # 뉴스 이미지 추출 (id가 'img_a'로 시작하는 모든 div 태그 안의 img 태그 선택)
                    img_divs = news_soup.find_all('div', id=re.compile(r'^img_a'))  # id가 'img_a'로 시작하는 모든 div 태그 선택
                    photo_urls = []

                    # 각 div 안에서 img 태그 추출
                    for div in img_divs:
                        img_tags = div.find_all('img')  # div 안에 있는 모든 img 태그 선택
                        photo_urls.extend([img['src'] for img in img_tags if img.get('src')])  # src 속성이 있는 경우 URL 저장

                    keywords = extract_keywords_tfidf(news_body_text if news_body_text else "")

                    keywords_str = [keywords]
                    X_new_tfidf = vectorizer.transform(keywords_str)

                    y_pred_proba = classifier.predict_proba(X_new_tfidf)
                    class_labels = classifier.classes_

                    predicted_industry = class_labels[np.argmax(y_pred_proba)]

                    # 데이터를 딕셔너리 형태로 저장
                    data.append({
                        'news_url': news_link,
                        'news_title': news_title,
                        'news_content': news_body,  
                        'news_company': news_company_text,
                        'news_published_at': news_published_at_text,
                        'extracted_keywords': keywords,
                        'predicted_industry': predicted_industry,
                        'photo_urls': photo_urls,
                    })

                except Exception as e:
                    print(f"Error processing {news_link}: {e}")

            page += 1

    driver.quit()
    end_time = time.time()
    print(f"크롤링 소요 시간: {end_time - start_time}초")

    # 리스트 형태의 데이터를 반환
    return data

@router.post("/crawl_and_store/")
def crawl_and_store(
    start_date: str = Query(None, description="시작 날짜 (YYYY-MM-DD 형식)"),
    end_date: str = Query(None, description="끝나는 날짜 (YYYY-MM-DD 형식)"),
    db: Session = Depends(get_db)
):  
    # 시작 날짜와 끝 날짜 기본값 설정: 지정하지 않으면 오늘 날짜로 설정
    if not start_date:
        start_date = datetime.today().strftime('%Y-%m-%d')  # 오늘 날짜
    if not end_date:
        end_date = datetime.today().strftime('%Y-%m-%d')  # 오늘 날짜

    # 문자열로 받은 날짜를 datetime 객체로 변환
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.strptime(end_date, '%Y-%m-%d')

    # 크롤링 데이터 호출 (날짜 범위 포함)
    data = crawl_news_data(start_date=start_date, end_date=end_date)

    new_news_ids = []
    start_time = time.time()
    # DB에 저장
    for row in data:
        # `news_url` 중복 확인
        existing_news = db.query(News).filter(News.news_url == row['news_url']).first()
        if existing_news:
            print(f"중복된 뉴스 URL: {row['news_url']} - 저장하지 않습니다.")
            continue  # 중복된 경우 추가하지 않고 다음 row로 이동

        industry = db.query(Industry).filter(Industry.industry_name == row['predicted_industry']).first()
        if industry:
            news = News(
                news_industry_id=industry.industry_id,
                news_url=row['news_url'],
                news_title=row['news_title'],
                news_content=row['news_content'],
                news_company=row['news_company'],
                news_published_at=datetime.strptime(row['news_published_at'], '%Y-%m-%d %H:%M:%S') if row['news_published_at'] else None,
                created_at=datetime.now(),
                updated_at=datetime.now(),
            )
            db.add(news)
            db.commit()

            # 새롭게 추가된 뉴스 ID 저장
            new_news_ids.append(news.news_id)

            # 뉴스와 연결된 사진 URL들을 news_photo 테이블에 저장
            for photo_url in row['photo_urls']:
                news_photo = NewsPhoto(
                    news_id=news.news_id,
                    photo_url=photo_url
                )
                db.add(news_photo)
            db.commit()
            

            # 키워드를 news_keyword 테이블에 저장
            keywords = row['extracted_keywords'].split()  # 키워드들을 공백으로 분리
            for keyword in keywords:
                existing_keyword = db.query(NewsKeyword).filter(
                    NewsKeyword.news_id == news.news_id,
                    NewsKeyword.news_keyword_name == keyword
                ).first()

                if not existing_keyword:
                    news_keyword = NewsKeyword(
                        industry_id=industry.industry_id,
                        news_id=news.news_id,
                        news_keyword_name=keyword
                    )
                    db.add(news_keyword)
            db.commit()
    end_time = time.time()  # 시간 측정 종료
    print(f"키워드 추출 소요 시간: {end_time - start_time}초")
    
    # 관련 뉴스 업데이트
    update_related_news(db, new_news_ids)
    return {"message": "Crawling and data storage completed successfully"}


# 새로운 GET 엔드포인트 추가
@router.get("/crawl_and_check/")
def crawl_and_check():
    data = crawl_news_data()
    # 데이터를 바로 반환
    return {"data": data}


# CSV 파일을 불러와 DB에 저장하고 연관 뉴스 업데이트하는 API
@router.post("/upload_csv/")
def upload_csv(db: Session = Depends(get_db)):
    try:
        # 파일 경로를 코드에서 지정
        file_path = os.path.join(os.path.dirname(__file__), 'naver_news_data_option_crawling_keyword.csv')

        # 파일 존재 여부 확인
        if not os.path.isfile(file_path):
            raise HTTPException(status_code=404, detail="CSV file not found")

        # CSV 파일 불러오기
        df = pd.read_csv(file_path)

        # 각 row를 DB에 저장
        start_time = time.time()
        for _, row in df.iterrows():
            # industry_name으로 industry_id 찾기
            industry = db.query(Industry).filter(Industry.industry_name == row['industry']).first()
            if not industry:
                raise HTTPException(status_code=404, detail=f"Industry '{row['industry']}' not found")

            # news_url 중복 확인
            existing_news = db.query(News).filter(News.news_url == row['news_url']).first()
            if existing_news:
                continue  # 중복된 경우 추가하지 않고 다음 row로 이동

            news = News(
                news_industry_id=industry.industry_id,  # 찾은 industry_id 사용
                news_url=row['news_url'],
                news_title=row['news_title'],
                news_content=row['news_content_text'],
                news_company=row['news_company'],
                news_published_at=datetime.strptime(row['news_published_at'], '%Y-%m-%d %H:%M:%S'),
                created_at=datetime.now(),  # 현재 날짜로 설정
                updated_at=datetime.now(),  # 현재 날짜로 설정
            )
            db.add(news)
            db.commit()

            # 뉴스 본문에서 키워드 추출
            keywords = extract_keywords_tfidf(news.news_content)  # 키워드 추출
            keyword_list = keywords.split()  # 공백 기준으로 키워드 리스트화

            # 추출된 키워드를 news_keyword 테이블에 저장
            for keyword in keyword_list:
                existing_keyword = db.query(NewsKeyword).filter(
                    NewsKeyword.news_id == news.news_id,
                    NewsKeyword.news_keyword_name == keyword
                ).first()

                if not existing_keyword:
                    news_keyword = NewsKeyword(
                        industry_id=industry.industry_id,
                        news_id=news.news_id,
                        news_keyword_name=keyword
                    )
                    db.add(news_keyword)
            db.commit()
        end_time = time.time()  # 시간 측정 종료
        print(f"키워드 추출 소요 시간: {end_time - start_time}초")

        # DB에서 뉴스 데이터 가져오기
        update_related_news(db)
        return {"message": "CSV data uploaded and related news updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

# # 로그 설정
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # 스케줄러 초기화
# scheduler = BackgroundScheduler()

# # 크롤링 및 데이터 처리 함수 (기존의 crawl_news_data 함수 재사용)
# def scheduled_crawl_news_data():
#     logger.info("스케줄러 작업 시작")
#     db = next(get_db())  # 데이터베이스 세션 생성 (올바르게 세션을 닫지 않음 - 개선 필요)
#     try:
#         start_date = datetime.today().strftime('%Y-%m-%d')
#         end_date = datetime.today().strftime('%Y-%m-%d')

#         # 크롤링 데이터 호출 (오늘 날짜로 설정)
#         data = crawl_news_data(start_date=start_date, end_date=end_date)
#         logger.info(f"{len(data)}개의 뉴스 크롤링 완료")

#         new_news_ids = []
#         for row in data:
#             # 중복 뉴스 확인 및 DB 저장 로직
#             existing_news = db.query(News).filter(News.news_url == row['news_url']).first()
#             if existing_news:
#                 continue  # 중복된 경우 건너뜀

#             industry = db.query(Industry).filter(Industry.industry_name == row['predicted_industry']).first()
#             if industry:
#                 news = News(
#                     news_industry_id=industry.industry_id,
#                     news_url=row['news_url'],
#                     news_title=row['news_title'],
#                     news_content=row['news_content'],
#                     news_company=row['news_company'],
#                     news_published_at=datetime.strptime(row['news_published_at'], '%Y-%m-%d %H:%M:%S') if row['news_published_at'] else None,
#                     created_at=datetime.now(),
#                     updated_at=datetime.now(),
#                 )
#                 db.add(news)
#                 db.commit()

#                 new_news_ids.append(news.news_id)

#                 for photo_url in row['photo_urls']:
#                     news_photo = NewsPhoto(
#                         news_id=news.news_id,
#                         photo_url=photo_url
#                     )
#                     db.add(news_photo)
#                 db.commit()

#                 keywords = row['extracted_keywords'].split()
#                 for keyword in keywords:
#                     existing_keyword = db.query(NewsKeyword).filter(
#                         NewsKeyword.news_id == news.news_id,
#                         NewsKeyword.news_keyword_name == keyword
#                     ).first()

#                     if not existing_keyword:
#                         news_keyword = NewsKeyword(
#                             industry_id=industry.industry_id,
#                             news_id=news.news_id,
#                             news_keyword_name=keyword
#                         )
#                         db.add(news_keyword)
#                 db.commit()

#         # 관련 뉴스 업데이트
#         update_related_news(db, new_news_ids)

#         print("크롤링 작업 완료")

#     finally:
#         db.close()  # 세션 종료
#         logger.info("스케줄러 작업 완료")

# # 스케줄러 설정 (매일 특정 시간에 크롤링 작업 실행 예시)
# def start_scheduler():
#     if not scheduler.running:  # 스케줄러가 이미 실행 중인지 확인
#         logger.info("스케줄러 시작")
#         # 매 시간 정각마다 실행 (minute=0 설정)
#         scheduler.add_job(scheduled_crawl_news_data, 'cron', minute=25)
#         scheduler.start()
#         logger.info(f"현재 스케줄러에 등록된 작업들: {scheduler.get_jobs()}")

# # 백그라운드에서 스케줄러 실행
# @router.on_event("startup")
# def on_startup():
#     start_scheduler() 