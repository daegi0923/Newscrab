from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from .industry_keywords import industry_keywords
from . import models, schemas
from typing import List

# APIRouter 인스턴스 생성
router = APIRouter()

# 데이터베이스 세션 생성 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# industry_keywords 딕셔너리를 keyword 테이블에 저장하는 함수
def insert_keywords_to_db(industry_keywords, db: Session):
    try:
        for industry_name, keywords in industry_keywords.items():
            industry = db.query(models.Industry).filter(models.Industry.industry_name == industry_name).first()
            if industry:
                industry_id = industry.industry_id
                for keyword in keywords:
                    existing_keyword = db.query(models.Keyword).filter(
                        models.Keyword.keyword_name == keyword,
                        models.Keyword.industry_id == industry_id
                    ).first()
                    if existing_keyword:
                        print(f"Keyword '{keyword}' already exists for industry '{industry_name}'. Skipping.")
                        continue
                    new_keyword = models.Keyword(
                        industry_id=industry_id,
                        keyword_name=keyword
                    )
                    db.add(new_keyword)

        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error occurred: {e}")
        raise
    finally:
        db.close()

# 산업군 생성 API
@router.post("/", response_model=schemas.Industry)
def create_industry(industry: schemas.IndustryCreate, db: Session = Depends(get_db)):
    existing_industry = db.query(models.Industry).filter(models.Industry.industry_name == industry.industry_name).first()
    
    if existing_industry:
        raise HTTPException(status_code=400, detail="Industry already exists")

    db_industry = models.Industry(industry_name=industry.industry_name)
    db.add(db_industry)
    db.commit()
    db.refresh(db_industry)
    return db_industry

# 산업군 목록 조회 API
@router.get("/", response_model=List[schemas.Industry])
def read_industries(db: Session = Depends(get_db)):
    industries = db.query(models.Industry).all()
    
    result = []
    for industry in industries:
        keywords = db.query(models.Keyword.keyword_name).filter(
            models.Keyword.industry_id == industry.industry_id
        ).all()
        
        keyword_list = [k[0] for k in keywords]
        
        result.append({
            "industry_id": industry.industry_id,
            "industry_name": industry.industry_name,
            "keywords": keyword_list
        })
    
    return result

# 산업군별 키워드 조회 API
@router.get("/{industry_name}/keywords/", response_model=List[str])
def get_keywords_by_industry(industry_name: str, db: Session = Depends(get_db)):
    industry = db.query(models.Industry).filter(models.Industry.industry_name == industry_name).first()

    if not industry:
        raise HTTPException(status_code=404, detail="Industry not found")
    
    keywords = db.query(models.Keyword.keyword_name).filter(
        models.Keyword.industry_id == industry.industry_id
    ).all()

    keyword_list = [k[0] for k in keywords]
    return keyword_list

# 산업군과 키워드를 삽입하는 API 엔드포인트
@router.post("/insert_keywords/")
def insert_keywords(industry_keywords: dict, db: Session = Depends(get_db)):
    insert_keywords_to_db(industry_keywords, db)
    return {"message": "Keywords inserted successfully"}
