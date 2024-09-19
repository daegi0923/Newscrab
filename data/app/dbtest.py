from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.industry_keywords import industry_keywords
from app import models, schemas  
from typing import List

# 데이터베이스 테이블 생성
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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
            # 먼저 industry_name으로 industry_id를 찾습니다.
            industry = db.query(models.Industry).filter(models.Industry.industry_name == industry_name).first()

            # 만약 해당 산업군이 존재하지 않는다면 생략하거나 로그를 남길 수 있습니다.
            if industry:
                industry_id = industry.industry_id

                # 각 산업군의 키워드를 keyword 테이블에 삽입합니다.
                for keyword in keywords:
                    # 이미 같은 키워드가 존재하는지 확인
                    existing_keyword = db.query(models.Keyword).filter(
                        models.Keyword.keyword_name == keyword,
                        models.Keyword.industry_id == industry_id
                    ).first()

                    # 중복된 키워드는 건너뜁니다.
                    if existing_keyword:
                        print(f"Keyword '{keyword}' already exists for industry '{industry_name}'. Skipping.")
                        continue
                    
                    # 중복이 없으면 새로운 키워드 추가
                    new_keyword = models.Keyword(
                        industry_id=industry_id,
                        keyword_name=keyword
                    )
                    db.add(new_keyword)

        db.commit()  # 모든 삽입을 커밋합니다.
    except Exception as e:
        db.rollback()  # 오류 발생 시 롤백합니다.
        print(f"Error occurred: {e}")
        raise
    finally:
        db.close()  # 세션을 종료합니다.

# 산업군 생성 API
@app.post("/industries/", response_model=schemas.Industry)
def create_industry(industry: schemas.IndustryCreate, db: Session = Depends(get_db)):
    # 중복된 industry_name이 있는지 확인
    existing_industry = db.query(models.Industry).filter(models.Industry.industry_name == industry.industry_name).first()
    
    if existing_industry:
        raise HTTPException(status_code=400, detail="Industry already exists")

    # 중복이 없으면 새로운 산업군을 생성
    db_industry = models.Industry(industry_name=industry.industry_name)
    db.add(db_industry)
    db.commit()
    db.refresh(db_industry)
    return db_industry


# 산업군 목록 조회 API
@app.get("/industries/", response_model=List[schemas.Industry])
def read_industries(db: Session = Depends(get_db)):
    industries = db.query(models.Industry).all()  # 모든 산업군 조회
    
    # 각 산업군의 키워드 리스트를 str 형태로 변환하여 반환
    result = []
    for industry in industries:
        keywords = db.query(models.Keyword.keyword_name).filter(
            models.Keyword.industry_id == industry.industry_id
        ).all()
        
        # keywords 리스트를 키워드 이름만 리스트로 변환
        keyword_list = [k[0] for k in keywords]
        
        # Industry 스키마에 맞게 결과 생성
        result.append({
            "industry_id": industry.industry_id,
            "industry_name": industry.industry_name,
            "keywords": keyword_list
        })
    
    return result

# 산업군별 키워드 조회 API (industry_name으로 조회)
@app.get("/industries/{industry_name}/keywords/", response_model=List[str])
def get_keywords_by_industry(industry_name: str, db: Session = Depends(get_db)):
    # 산업군 조회
    industry = db.query(models.Industry).filter(models.Industry.industry_name == industry_name).first()

    if not industry:
        raise HTTPException(status_code=404, detail="Industry not found")
    
    # 해당 산업군의 키워드 조회
    keywords = db.query(models.Keyword.keyword_name).filter(
        models.Keyword.industry_id == industry.industry_id
    ).all()

    # 키워드 이름 리스트로 변환하여 반환
    keyword_list = [k[0] for k in keywords]
    return keyword_list


# 산업군과 키워드를 삽입하는 API 엔드포인트
@app.post("/insert_keywords/")
def insert_keywords(db: Session = Depends(get_db)):
    insert_keywords_to_db(industry_keywords, db)  # 위에서 정의한 함수 호출
    return {"message": "Keywords inserted successfully"}