from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crawling.models import News
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from bs4 import BeautifulSoup  # HTML 텍스트 추출을 위해 사용
import pandas as pd

router = APIRouter()

# 데이터베이스 세션 생성 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 뉴스 본문에서 텍스트만 추출하는 함수 (BeautifulSoup 사용)
def extract_text_from_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    result = soup.get_text(separator=" ", strip=True)
    # print(result)
    return result

# 연관 뉴스 추천 함수
def recommend_related_news(input_word, final_df):
    # Step 2: 뉴스 제목과 본문을 결합하여 벡터화 (입력된 단어도 함께 벡터화)
    corpus = final_df['news_title'] + " " + final_df['news_content_text']  # 제목과 본문을 결합한 텍스트

    # 입력된 단어를 포함한 전체 코퍼스를 벡터화
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(corpus)

    # Step 3: 입력된 단어를 벡터화
    input_tfidf = tfidf_vectorizer.transform([input_word])

    # Step 4: 입력된 단어와 뉴스 기사 간의 코사인 유사도 계산
    cosine_sim = cosine_similarity(input_tfidf, tfidf_matrix)

    # Step 5: 유사도가 높은 상위 3개의 뉴스 기사 추출
    sim_scores = list(enumerate(cosine_sim[0]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[:3]  # 상위 3개 기사

    # 상위 3개 뉴스의 news_id 추출 (numpy 타입을 파이썬 기본 타입으로 변환)
    related_news_ids = [int(final_df.iloc[idx]['news_id']) for idx, score in sim_scores]

    return related_news_ids

# 뉴스 검색 엔드포인트
@router.get("/search_related_news/")
def search_related_news(keyword: str, db: Session = Depends(get_db)):
    # 데이터베이스에서 모든 뉴스를 가져옴
    news_data = db.query(News).all()

    # 뉴스 데이터에서 HTML 본문(news_content)에서 텍스트 추출 후 임시 'news_content_text' 생성
    final_df = pd.DataFrame([{
        'news_id': news.news_id,
        'news_title': news.news_title if news.news_title else "",
        'news_content_text': extract_text_from_html(news.news_content) if news.news_content else ""  # HTML에서 텍스트 추출
    } for news in news_data])

    # 데이터가 없을 경우 예외 처리
    if final_df.empty:
        raise HTTPException(status_code=404, detail="뉴스 데이터를 찾을 수 없습니다.")

    # 연관 뉴스 추천 함수 호출
    related_news_ids = recommend_related_news(keyword, final_df)

    # 추천된 뉴스가 없을 경우 예외 처리
    if not related_news_ids:
        raise HTTPException(status_code=404, detail="해당 키워드와 관련된 뉴스를 찾을 수 없습니다.")

    # Step 6: 3개의 관련 뉴스 ID 리턴
    response = {
        "related_news_id_1": related_news_ids[0] if len(related_news_ids) > 0 else None,
        "related_news_id_2": related_news_ids[1] if len(related_news_ids) > 1 else None,
        "related_news_id_3": related_news_ids[2] if len(related_news_ids) > 2 else None
    }

    return response
