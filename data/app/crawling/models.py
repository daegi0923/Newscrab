from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class News(Base):
    __tablename__ = "news"
    
    news_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    news_industry_id = Column(Integer, ForeignKey("industry.industry_id"), nullable=False)
    news_url = Column(String(255), nullable=False)
    news_title = Column(String(255), nullable=False)
    news_content = Column(Text, nullable=False)
    news_company = Column(String(255), nullable=False)
    news_published_at = Column(DateTime, nullable=False)
    view = Column(Integer, nullable=False, default=0)
    scrapCnt = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    related_news_id_1 = Column(Integer, nullable=True)
    related_news_id_2 = Column(Integer, nullable=True)
    related_news_id_3 = Column(Integer, nullable=True)
    
    # Relationship with Industry
    industry = relationship("Industry", back_populates="news_list")
