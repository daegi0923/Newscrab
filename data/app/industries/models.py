from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

# Industry 모델 정의 (industry 테이블)
class Industry(Base):
    __tablename__ = "industry"
    
    industry_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    industry_name = Column(String(255, collation='utf8mb4_unicode_ci'), nullable=False, unique=True)  # collation 추가

    # relationship to Keyword
    keywords = relationship("Keyword", back_populates="industry")
    news_list = relationship("News", back_populates="industry")


# Keyword 모델 정의 (keyword 테이블)
class Keyword(Base):
    __tablename__ = "keyword"
    
    keyword_id = Column(Integer, primary_key=True, index=True, autoincrement=True)  # auto_increment 설정
    industry_id = Column(Integer, ForeignKey("industry.industry_id"), nullable=False)
    keyword_name = Column(String(255, collation='utf8mb4_unicode_ci'), nullable=False, unique=True)  # collation 추가
    
    # relationship to Industry
    industry = relationship("Industry", back_populates="keywords")
