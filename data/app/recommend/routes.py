from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from . import models
from app.database import SessionLocal, engine
from fastapi import APIRouter
from typing import List
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


router = APIRouter()

# 의존성 주입을 통한 DB 세션 생성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 데이터베이스에서 데이터 가져오기
@router.get("/test")
def read_item(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    scrabs = db.query(models.Scrap).all()
    user_news_like = db.query(models.UserNewsLike).all()
    user_industry = db.query(models.UserIndustry).all()
    
    news_list = db.query(models.News).all()
    recommend_news = collaborative_filtering(1, db)

    if users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {
            "recommend" : recommend_news,
            "users" : users, 
            "scrabs" : scrabs, 
            "user_news_like" : user_news_like,
            "user_industry" : user_industry,
            "news_list" : news_list,
            }



def collaborative_filtering(user_id: int, db: Session):
    # 데이터 불러오기
    users = db.query(models.User).all()
    scrabs = db.query(models.Scrap).all()
    user_news_like = db.query(models.UserNewsLike).all()
    user_industry = db.query(models.UserIndustry).all()
    user_news_read = db.query(models.UserNewsRead).all()
    print(len(scrabs))
    
    # 사용자-뉴스 행렬에 한 칸을 더 추가해 산업 정보를 넣음 (len(scrabs) + 1)
    user_news_matrix = np.zeros((len(users), len(scrabs) + 1))
    print("userMat :", user_news_matrix)

    # 선호 산업 정보를 벡터의 첫 번째 열에 추가
    for industry in user_industry:
        user_idx = industry.user_id - 1
        industry_preference = industry.industry_id  # 선호하는 산업 정보
        user_news_matrix[user_idx][0] = industry_preference  # 첫 번째 열에 추가
    
    # 뉴스 찜 및 스크랩 정보 추가
    for like in user_news_like:
        user_idx = like.user_id - 1
        news_idx = like.news_id  # 뉴스 인덱스는 1부터 시작
        user_news_matrix[user_idx][news_idx] = 1  # 찜한 뉴스는 1로 표시
    
    for scrap in scrabs:
        user_idx = scrap.user_id - 1
        news_idx = scrap.news_id  # 뉴스 인덱스는 1부터 시작
        user_news_matrix[user_idx][news_idx] += 1  # 스크랩한 뉴스는 2로 표시 (가중치 부여 가능)
    
    # 코사인 유사도 계산
    user_similarity = cosine_similarity(user_news_matrix)
    print(user_similarity)
    
    # 현재 사용자의 유사한 사용자 찾기
    similar_users_idx = np.argsort(-user_similarity[user_id - 1])[1:4]  # 상위 3명의 유사 사용자
    
    # 유사한 사용자가 찜하거나 스크랩한 뉴스를 추천
    recommended_news = set()
    for idx in similar_users_idx:
        for i, news in enumerate(user_news_matrix[idx]):
            if news > 0 and user_news_matrix[user_id - 1][i] == 0:  # 현재 사용자가 보지 않은 뉴스
                recommended_news.add(i)
    
    print("userMat :", user_news_matrix)
    return list(recommended_news)

