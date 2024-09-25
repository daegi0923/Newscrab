from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

# News 모델 정의 (news 테이블)
class News(Base):
    __tablename__ = "news"

    news_id = Column(Integer, primary_key=True, index=True)
    news_industry_id = Column(Integer, ForeignKey("industry.industry_id"), name="industry_id")  
    news_url = Column(String(255), unique=True, nullable=False)
    news_title = Column(String(255), nullable=False)
    news_content = Column(Text, nullable=False)
    news_company = Column(String(255), nullable=True)
    news_published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
    view = Column(Integer, default=0)
    scrap_cnt = Column(Integer, default=0, name="scrap_cnt")
    related_news_id_1 = Column(Integer, nullable=True)
    related_news_id_2 = Column(Integer, nullable=True)
    related_news_id_3 = Column(Integer, nullable=True)

    # Industry와의 관계 설정
    industry = relationship("Industry", back_populates="news_list")
    keywords = relationship("NewsKeyword", back_populates="news")
    photos = relationship("NewsPhoto", back_populates="news", cascade="all, delete-orphan")


# NewsKeyword 모델 정의 (news_keyword 테이블)
class NewsKeyword(Base):
    __tablename__ = "news_keyword"

    keyword_id = Column(Integer, primary_key=True, autoincrement=True)
    industry_id = Column(Integer, ForeignKey("industry.industry_id"), nullable=False)
    news_id = Column(Integer, ForeignKey("news.news_id"), nullable=False)
    news_keyword_name = Column(String(255, collation='utf8mb4_unicode_ci'), nullable=False)

    # Industry와의 관계 설정
    industry = relationship("Industry", back_populates="news_keywords")
    news = relationship("News", back_populates="keywords")

# NewsPhoto 모델 정의
class NewsPhoto(Base):
    __tablename__ = "news_photo"

    photo_id = Column(Integer, primary_key=True, autoincrement=True)  # 자동 증가되는 photo_id
    news_id = Column(Integer, ForeignKey("news.news_id", ondelete="CASCADE"), nullable=False)  # news_id를 외래키로 설정
    photo_url = Column(String(255), nullable=False)  # 사진 URL

    # News 모델과의 관계 설정 (Many-to-One)
    news = relationship("News", back_populates="photos")
