import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crawling.models import News
from app.industries.models import Industry  
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd
import joblib
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from konlpy.tag import Okt

router = APIRouter()

# 데이터베이스 세션 생성 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def update_related_news(db: Session):
    news_data = db.query(News).all()
    final_df = pd.DataFrame([{
        'news_id': news.news_id,
        'news_title': news.news_title
    } for news in news_data])

    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(final_df['news_title'])
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    for idx, row in final_df.iterrows():
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:4]

        related_ids = [final_df.iloc[i[0]]['news_id'] for i in sim_scores]
        news_to_update = db.query(News).filter(News.news_id == row['news_id']).first()
        if news_to_update:
            news_to_update.related_news_id_1 = related_ids[0] if len(related_ids) > 0 else None
            news_to_update.related_news_id_2 = related_ids[1] if len(related_ids) > 1 else None
            news_to_update.related_news_id_3 = related_ids[2] if len(related_ids) > 2 else None
            db.add(news_to_update)
    
    db.commit()


@router.post("/crawl_and_store/")
def crawl_and_store(db: Session = Depends(get_db)):
    start_time = time.time()

    # ChromeDriver 경로 설정
    chrome_driver_path = os.path.join(os.path.dirname(__file__), 'chromedriver.exe')
    service = Service(chrome_driver_path)
    options = Options()
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    driver = webdriver.Chrome(service=service, options=options)

    # 모델 및 벡터라이저 로드
    classifier_path = os.path.join(os.path.dirname(__file__), 'random_forest_model.pkl')
    vectorizer_path = os.path.join(os.path.dirname(__file__), 'tfidf_vectorizer.pkl')
    classifier = joblib.load(classifier_path)
    vectorizer = joblib.load(vectorizer_path)

    # Okt 형태소 분석기 초기화
    okt = Okt()

    # 불용어 리스트 정의
    korean_stopwords = [
        "의", "가", "이", "은", "들", "는", "좀", "잘", "걍", "과", "도", "를", "으로", "자", "에", "와", "한", "하다", "있다", 
        "수", "그", "다", "같이", "더", "그리고", "중", "또한", "그러나", "등", "고", "것", "위",
        "지난", "이번", "이후", "지난해", "개월", "오전", "랍니", "그룹", "모든", "어디", "최근", "오늘",
    ]

    # 명사만 추출하는 함수 정의
    def okt_nouns(text):
        return ' '.join(okt.nouns(text))

    # TF-IDF 키워드 추출 함수
    def extract_keywords_tfidf(text):
        nouns = okt_nouns(text)
        for stopword in korean_stopwords:
            nouns = nouns.replace(f" {stopword} ", " ")
        if not nouns.strip():
            return ""
        tfidf_vectorizer = TfidfVectorizer()
        try:
            tfidf_matrix = tfidf_vectorizer.fit_transform([nouns])
        except ValueError:
            return ""
        scores = tfidf_matrix.toarray().flatten()
        feature_names = tfidf_vectorizer.get_feature_names_out()
        tfidf_scores = pd.Series(scores, index=feature_names).sort_values(ascending=False)
        top_keywords = tfidf_scores.head(10).index.tolist()
        return ' '.join(top_keywords)

    # 데이터를 저장할 리스트 초기화
    data = {
        'news_url': [],
        'news_title': [],
        'news_content': [],
        'news_company': [],
        'news_published_at': [],
        'extracted_keywords': [],
        'predicted_industry': [],
    }

    today = datetime.datetime.today().strftime('%Y%m%d')
    page = 1

    while True:
        url = f"https://finance.naver.com/news/news_list.naver?mode=LSS3D&section_id=101&section_id2=258&section_id3=402&date={today}&page={page}"
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

                # 중복 체크
                existing_news = db.query(News).filter(News.news_url == news_link).first()
                if existing_news:
                    print(f"중복된 뉴스 URL 발견: {news_link}. 저장을 건너뜁니다.")
                    continue

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
                keywords = extract_keywords_tfidf(news_body_text if news_body_text else "")
                data['extracted_keywords'].append(keywords)

                keywords_str = [keywords]
                X_new_tfidf = vectorizer.transform(keywords_str)

                y_pred_proba = classifier.predict_proba(X_new_tfidf)
                class_labels = classifier.classes_

                predicted_industry = class_labels[np.argmax(y_pred_proba)]

                data['news_url'].append(news_link)
                data['news_title'].append(news_title)
                data['news_content'].append(news_body)
                data['news_company'].append(news_company_text)
                data['news_published_at'].append(news_published_at_text)
                data['predicted_industry'].append(predicted_industry)

            except Exception as e:
                print(f"Error processing {news_link}: {e}")

        page += 1

    driver.quit()

    # 데이터를 Pandas DataFrame으로 변환
    df = pd.DataFrame(data)

    # DB에 저장
    for _, row in df.iterrows():
        industry = db.query(Industry).filter(Industry.industry_name == row['predicted_industry']).first()
        if industry:
            news = News(
                news_industry_id=industry.industry_id,
                news_url=row['news_url'],
                news_title=row['news_title'],
                news_content=row['news_content'],
                news_company=row['news_company'],
                news_published_at=datetime.datetime.strptime(row['news_published_at'], '%Y-%m-%d %H:%M:%S') if row['news_published_at'] else None,
                created_at=datetime.datetime.now(),
                updated_at=datetime.datetime.now(),
            )
            db.add(news)
    
    db.commit()
    
    # 관련 뉴스 업데이트
    update_related_news(db)

    end_time = time.time()
    print(f"크롤링 소요 시간: {end_time - start_time}초")
    return {"message": "Crawling and data storage completed successfully"}

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

        # DB에서 뉴스 데이터 가져오기
        update_related_news(db)
        return {"message": "CSV data uploaded and related news updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
