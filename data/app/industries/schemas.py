from pydantic import BaseModel, constr
from typing import List

# KeywordBase 모델 정의
class KeywordBase(BaseModel):
    keyword_name: constr(max_length=255)  # 최대 길이 제한

class KeywordCreate(KeywordBase):
    industry_id: int

class Keyword(KeywordBase):  # Keyword 모델 추가
    keyword_id: int
    industry_id: int

    class Config:
        orm_mode = True

# IndustryBase 모델 정의
class IndustryBase(BaseModel):
    industry_name: constr(max_length=255)  # 최대 길이 제한

class IndustryCreate(IndustryBase):
    pass

# Industry 모델에서 keywords를 List[str]으로 반환
class Industry(IndustryBase):
    industry_id: int
    keywords: List[str]  # 키워드 이름만 리스트로 포함

    class Config:
        orm_mode = True
