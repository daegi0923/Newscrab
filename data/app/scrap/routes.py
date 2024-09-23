from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crawling.models import News
from summa import summarizer
from bs4 import BeautifulSoup

router = APIRouter()

# 데이터베이스 세션 생성 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def extract_text_from_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    result = soup.get_text(separator=" ", strip=True)
    return result

# 뉴스 본문 요약 함수 (summa 라이브러리 사용)
def summarize_news_content(news_content, num_sentences=3):
    summary = summarizer.summarize(news_content, ratio=0.2)  # 요약 비율을 통해 요약 문장 수 조절
    return summary

# 뉴스 요약 API
@router.get("/summarize/{news_id}")
def summarize(news_id: int, db: Session = Depends(get_db)):
    # 뉴스 ID로 뉴스 조회
    news = db.query(News).filter(News.news_id == news_id).first()

    # 뉴스가 존재하지 않을 경우 예외 처리
    if not news:
        raise HTTPException(status_code=404, detail="해당 뉴스가 존재하지 않습니다.")

    # 뉴스 본문에서 HTML 텍스트 추출
    news_content = news.news_content
    if not news_content:
        raise HTTPException(status_code=404, detail="뉴스 본문이 비어있습니다.")

    # HTML 형식에서 텍스트만 추출
    text_content = extract_text_from_html(news_content)

    # 뉴스 본문 요약
    summary = summarize_news_content(text_content, num_sentences=3)

    # 요약된 내용 반환
    return {
        "news_id": news_id,
        "summary": summary
    }
