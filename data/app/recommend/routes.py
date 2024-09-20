from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from . import models
from app.database import SessionLocal, engine
from fastapi import APIRouter
from typing import List
import pandas as pd
import numpy as np


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

    print(users)
    print(scrabs)
    print(user_news_like)
    print(user_industry)
    if users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"users" : users, 
            "scrabs" : scrabs, 
            "user_news_like" : user_news_like,
            "user_industry" : user_industry}
