import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()  # .env 파일을 로드

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")  # .env 파일에서 DATABASE_URL 불러오기

engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 세션 로컬 설정
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base 클래스 생성 (모든 모델이 이 클래스를 상속받음)
Base = declarative_base()
