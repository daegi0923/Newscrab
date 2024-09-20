from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class NewsBase(BaseModel):
    news_url: str
    news_title: str
    news_content: str
    news_company: Optional[str]
    news_published_at: Optional[datetime]

class NewsCreate(NewsBase):
    news_industry_id: int  

class NewsUpdate(BaseModel):
    news_url: Optional[str]
    news_title: Optional[str]
    news_content: Optional[str]
    news_company: Optional[str]
    news_published_at: Optional[datetime]
    news_industry_id: Optional[int]  

class News(NewsBase):
    news_id: int
    news_industry_id: int  
    created_at: datetime
    updated_at: datetime
    view: int
    scrapCnt: int
    related_news_id_1: Optional[int]
    related_news_id_2: Optional[int]
    related_news_id_3: Optional[int]

    class Config:
        orm_mode = True