import pandas as pd
import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crawling.models import News
from app.industries.models import Industry  
from datetime import datetime

router = APIRouter()

# 데이터베이스 세션 생성 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CSV 파일을 불러와 DB에 저장하는 API
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
        return {"message": "CSV data uploaded successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
