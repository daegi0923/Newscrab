from sqlalchemy import Column, Integer, ForeignKey, DateTime, String, Date, Enum, Text
from sqlalchemy.orm import relationship
from ..database import Base
from datetime import datetime
from app.crawling.models import News
from app.industries.models import Industry  


class User(Base):
    __tablename__ = 'user'

    user_id = Column(Integer, primary_key=True, index=True)
    login_id = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    birthday = Column(Date, nullable=False)

    user_news_likes = relationship('UserNewsLike', back_populates='user')
    user_news_reads = relationship('UserNewsRead', back_populates='user')
    user_industries = relationship('UserIndustry', back_populates='user')
    scraps = relationship('Scrap', back_populates='user')


class UserNewsLike(Base):
    __tablename__ = 'user_news_like'

    user_news_like_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.user_id'), nullable=False)
    news_id = Column(Integer, ForeignKey('news.news_id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship('User', back_populates='user_news_likes')
    news = relationship('News')


class UserIndustry(Base):
    __tablename__ = 'user_industry'

    user_industry_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.user_id'), nullable=False)
    industry_id = Column(Integer, ForeignKey('industry.industry_id'), nullable=False)
    pre_rank = Column(Integer, nullable=False)

    user = relationship('User', back_populates='user_industries')
    industry = relationship('Industry')


class UserNewsRead(Base):
    __tablename__ = 'user_news_read'

    user_news_read_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.user_id'), nullable=False)
    news_id = Column(Integer, ForeignKey('news.news_id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship('User', back_populates='user_news_reads')
    news = relationship('News')


class Scrap(Base):
    __tablename__ = 'scrap'

    scrap_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.user_id'), nullable=False)
    news_id = Column(Integer, ForeignKey('news.news_id'), nullable=False)
    scrap_summary = Column(Text)
    comment = Column(Text)

    user = relationship('User', back_populates='scraps')
    news = relationship('News')


