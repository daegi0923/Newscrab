import pandas as pd
import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crawling.models import News
from app.industries.models import Industry  
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

router = APIRouter()

# 데이터베이스 세션 생성 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
        news_data = db.query(News).all()
        final_df = pd.DataFrame([{
            'news_id': news.news_id,
            'news_title': news.news_title
        } for news in news_data])

        # TF-IDF 벡터라이저를 사용해 뉴스 제목 간의 유사도 계산
        tfidf_vectorizer = TfidfVectorizer()
        tfidf_matrix = tfidf_vectorizer.fit_transform(final_df['news_title'])  # 뉴스 제목을 벡터화
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)  # 코사인 유사도 계산

        # 연관 뉴스 데이터 업데이트
        for idx, row in final_df.iterrows():
            sim_scores = list(enumerate(cosine_sim[idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)  # 유사도 순으로 정렬
            sim_scores = sim_scores[1:4]  # 자기 자신 제외, 상위 3개 뉴스 선택

            # 연관 뉴스의 ID를 저장
            related_ids = [final_df.iloc[i[0]]['news_id'] for i in sim_scores]

            # DB에서 뉴스 업데이트
            news_to_update = db.query(News).filter(News.news_id == row['news_id']).first()
            if news_to_update:
                news_to_update.related_news_id_1 = related_ids[0] if len(related_ids) > 0 else None
                news_to_update.related_news_id_2 = related_ids[1] if len(related_ids) > 1 else None
                news_to_update.related_news_id_3 = related_ids[2] if len(related_ids) > 2 else None
                db.add(news_to_update)
        
        db.commit()
        return {"message": "CSV data uploaded and related news updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
