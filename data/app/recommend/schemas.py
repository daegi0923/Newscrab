from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional


# News 모델 정의 (news 테이블)
class NewsResponse(BaseModel):
    newsId: int = Field(..., alias="news_id")
    newsTitle: str = Field(..., alias="news_title")
    industryId: int = Field(..., alias="industry_id")
    newsContent: str = Field(..., alias="news_content")
    newsPublishedAt: datetime = Field(..., alias="news_published_at")
    newsCompany: str = Field(..., alias="news_company")
    createdAt: datetime = Field(..., alias="created_at")
    updatedAt: datetime = Field(..., alias="updated_at")
    newsUrl: str = Field(..., alias="news_url")
    view: int
    scrapCnt: int = Field(..., alias="scrap_cnt")
    photoUrlList: Optional[List[str]] = Field(None, alias="photo_url_list")

    class Config:
        allow_population_by_field_name = True
