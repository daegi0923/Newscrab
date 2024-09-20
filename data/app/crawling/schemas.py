from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NewsBase(BaseModel):
    news_url: str
    news_title: str
    news_content: str
    news_company: str
    news_published_at: datetime
    view: Optional[int] = 0
    scrapCnt: Optional[int] = 0
    related_news_id_1: Optional[int] = None
    related_news_id_2: Optional[int] = None
    related_news_id_3: Optional[int] = None

class NewsCreate(NewsBase):
    news_industry_id: int

class News(NewsBase):
    news_id: int
    news_industry_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
