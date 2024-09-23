from fastapi import Depends, FastAPI, HTTPException, Body
from sqlalchemy.orm import Session
from . import models
from app.database import SessionLocal, engine
from fastapi import APIRouter
from typing import List
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


router = APIRouter()

# 의존성 주입을 통한 DB 세션 생성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 데이터베이스에서 데이터 가져오기




def get_scrap_like_dataframe(db: Session):
    # Scrap 테이블에서 user_id와 news_id를 가져옴
    scrap_data = db.query(models.Scrap.user_id, models.Scrap.news_id).all()
    
    # UserNewsLike 테이블에서 user_id와 news_id를 가져옴
    like_data = db.query(models.UserNewsLike.user_id, models.UserNewsLike.news_id).all()

    # Scrap 데이터프레임 생성
    scrap_df = pd.DataFrame(scrap_data, columns=['user_id', 'news_id'])
    scrap_df['scrap'] = 1  # scrap한 경우는 1로 표시

    # Like 데이터프레임 생성
    like_df = pd.DataFrame(like_data, columns=['user_id', 'news_id'])
    like_df['like'] = 1  # like한 경우는 1로 표시

    # Scrap과 Like를 outer join하여 결합
    merged_df = pd.merge(scrap_df, like_df, on=['user_id', 'news_id'], how='outer')

    # 결측치 처리: scrap이나 like가 없는 경우 0으로 채움
    merged_df['scrap'] = merged_df['scrap'].fillna(0)
    merged_df['like'] = merged_df['like'].fillna(0)


    return merged_df


# 새로운 사용자에 대해 UserIndustry 기반으로 유사도를 계산하는 함수
def calculate_industry_similarity(user_id:int, db: Session):
    # 새로운 사용자의 선호 산업을 가져옴
    new_user_industries = db.query(UserIndustry).filter(UserIndustry.user_id == user_id).all()
    industry_ids = {industry.industry_id for industry in new_user_industries}

    # 기존 사용자를 모두 가져와서 산업 선호도를 비교
    user_sim = {}
    for user in db.query(User).all():
        if user.user_id == user_id:
            continue
        user_industries = db.query(UserIndustry).filter(UserIndustry.user_id == user.user_id).all()
        user_industry_ids = {industry.industry_id for industry in user_industries}

        # 교집합을 이용하여 산업 선호도의 유사도를 계산
        intersection = len(industry_ids & user_industry_ids)
        union = len(industry_ids | user_industry_ids)

        # Jaccard 유사도 계산 (교집합 / 합집합)
        similarity = intersection / union if union > 0 else 0
        user_sim[user.user_id] = similarity

    # 유사도가 높은 사용자 N명을 반환
    nearest_users = sorted(user_sim.items(), key=lambda x: x[1], reverse=True)[:num_sim_user_top_N]
    return nearest_users


def collaborative_filtering(user_id: int, db: Session):
    # scrap_like_df에서 user_id를 가져옴
    scrap_like_df = get_scrap_like_dataframe(db)
    
    # user_id 리스트를 추출 (user_news_matrix의 인덱스와 매칭될 user_id 목록)
    user_ids = scrap_like_df['user_id'].unique()
    
    # user_id에 해당하는 뉴스 데이터를 matrix로 변환 (user_news_matrix는 user_id 순서대로 정렬된 행렬)
    user_news_matrix = scrap_like_df.pivot_table(index='user_id', columns='news_id', values='interaction', fill_value=0)
    
    # 코사인 유사도 계산
    user_similarity = cosine_similarity(user_news_matrix)

    # 유사한 유저가 3명 이하면 빈 리스트 리턴
    if len(user_similarity) < 4:
        return []
    
    # 현재 유저의 인덱스 찾기
    user_idx = np.where(user_ids == user_id)[0][0]

    # 유사한 사용자 찾기 (유사도가 가장 높은 사용자들을 정렬, 자기 자신 제외)
    similar_users_idx = np.argsort(-user_similarity[user_idx])[1:top_n]

    # 유사한 사용자의 인덱스를 user_id로 변환
    similar_user_ids = [user_ids[idx] for idx in similar_users_idx]

    # 유사한 사용자가 찜하거나 스크랩한 뉴스를 추천
    recommended_news = set()
    for similar_user_id in similar_user_ids:
        similar_user_idx = np.where(user_ids == similar_user_id)[0][0]  # similar_user_id에 해당하는 행을 찾음
        for i, news in enumerate(user_news_matrix.iloc[similar_user_idx]):
            if news > 0 and user_news_matrix.iloc[user_idx, i] == 0:  # 현재 사용자가 보지 않은 뉴스
                recommended_news.add(user_news_matrix.columns[i])
    
    return list(recommended_news)



@router.get("/list")
def read_item(user_id: int = Body(...), db: Session = Depends(get_db)):
    # Scrap 테이블에서 user_id가 스크랩한 뉴스의 news_id 조회
    scrap_query = db.query(models.Scrap.news_id).filter(models.Scrap.user_id == user_id)
    
    # UserNewsLike 테이블에서 user_id가 좋아요를 누른 뉴스의 news_id 조회
    like_query = db.query(models.UserNewsLike.news_id).filter(models.UserNewsLike.user_id == user_id)

    # scrap_query와 like_query를 합친 후 distinct한 news_id의 개수를 count
    total_news_count = db.query(func.count(func.distinct(scrap_query.union(like_query).subquery().c.news_id))).scalar()

    if total_news_count < 5:
        recommend_news = calculate_industry_similarity(user_id, db)
    else:
        recommend_news = collaborative_filtering(user_id, db)
        

    if users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {
            "recommend" : recommend_news,
            "users" : users, 
            "scrabs" : scrabs, 
            "user_news_like" : user_news_like,
            "user_industry" : user_industry,
            "news_list" : news_list,
            }
