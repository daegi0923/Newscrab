from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crawling.models import News
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from bs4 import BeautifulSoup  # HTML 텍스트 추출을 위해 사용
import pandas as pd
import re

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

# 키워드가 포함된 가장 중요한 문장을 TF-IDF 기반으로 추출하는 함수
def extract_important_sentence(news_content_text, keyword):
    # 뉴스 본문을 문장 단위로 분리 (정규 표현식을 사용)
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', news_content_text)

    # 키워드가 포함된 문장들 추출
    keyword_sentences = [sentence for sentence in sentences if keyword in sentence]

    # 키워드가 포함된 문장이 없으면 None 반환
    if not keyword_sentences:
        return None

    # 각 문장을 TF-IDF로 벡터화
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(keyword_sentences)

    # 입력된 키워드를 벡터화
    keyword_tfidf = tfidf_vectorizer.transform([keyword])

    # 입력된 키워드와 각 문장 간의 코사인 유사도 계산
    cosine_sim = cosine_similarity(keyword_tfidf, tfidf_matrix)

    # 가장 높은 유사도를 가진 문장을 선택
    best_sentence_idx = cosine_sim.argmax()  # 유사도가 가장 높은 문장의 인덱스
    important_sentence = keyword_sentences[best_sentence_idx]

    return important_sentence

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

    # 관련 뉴스 중 하나의 본문에서 중요한 문장 추출
    important_sentence = None
    for news_id in related_news_ids:
        news_row = final_df[final_df['news_id'] == news_id]
        important_sentence = extract_important_sentence(news_row['news_content_text'].values[0], keyword)
        if important_sentence:
            break

    if not important_sentence:
        raise HTTPException(status_code=404, detail="키워드가 포함된 문장을 찾을 수 없습니다.")

    # 관련 뉴스 ID와 중요한 문장을 반환
    response = {
        "related_news_id_1": related_news_ids[0] if len(related_news_ids) > 0 else None,
        "related_news_id_2": related_news_ids[1] if len(related_news_ids) > 1 else None,
        "related_news_id_3": related_news_ids[2] if len(related_news_ids) > 2 else None,
        "important_sentence": important_sentence
    }

    return response

# 뉴스 검색 엔드포인트 (관련 뉴스와 중요 문장 추출 API)
@router.get("/ex_sentence/")
def ex_sentence(keyword: str, db: Session = Depends(get_db)):
    # 데이터베이스에서 모든 뉴스를 가져옴
    news_data = db.query(News).all()

    # 뉴스 데이터에서 HTML 본문(news_content)에서 텍스트 추출 후 임시 'news_content_text' 생성
    final_df = pd.DataFrame([{
        'news_id': news.news_id,
        'news_title': news.news_title if news.news_title else "",
        'news_content_text': extract_text_from_html(news.news_content) if news.news_content else ""
    } for news in news_data])

    if final_df.empty:
        raise HTTPException(status_code=404, detail="뉴스 데이터를 찾을 수 없습니다.")

    # 연관 뉴스 추천 함수 호출
    related_news_ids = recommend_related_news(keyword, final_df)

    if not related_news_ids:
        raise HTTPException(status_code=404, detail="해당 키워드와 관련된 뉴스를 찾을 수 없습니다.")

    # 관련 뉴스 중 하나의 본문에서 중요한 문장 추출
    important_sentence = None
    for news_id in related_news_ids:
        news_row = final_df[final_df['news_id'] == news_id]
        important_sentence = extract_important_sentence(news_row['news_content_text'].values[0], keyword)
        if important_sentence:
            break

    if not important_sentence:
        raise HTTPException(status_code=404, detail="키워드가 포함된 문장을 찾을 수 없습니다.")

    # 관련 뉴스 ID와 중요한 문장을 반환
    response = {
        "related_news_id_1": related_news_ids[0] if len(related_news_ids) > 0 else None,
        "related_news_id_2": related_news_ids[1] if len(related_news_ids) > 1 else None,
        "related_news_id_3": related_news_ids[2] if len(related_news_ids) > 2 else None,
        "important_sentence": important_sentence
    }

    return response