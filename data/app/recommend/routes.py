from fastapi import Depends, FastAPI, HTTPException, Request
from sqlalchemy.orm import Session
from . import models
from app.database import SessionLocal, engine
from fastapi import APIRouter
from typing import List
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from .schemas import NewsResponse
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler

router = APIRouter()

# 의존성 주입을 통한 DB 세션 생성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_scrap_like_dataframe(db: Session):
    global scrap_like_df, user_news_matrix
    # Scrap 테이블에서 user_id와 news_id를 가져옴
    scrap_data = db.query(models.Scrap.user_id, models.Scrap.news_id, models.Scrap.created_at).all()
    
    # UserNewsLike 테이블에서 user_id와 news_id를 가져옴
    like_data = db.query(models.UserNewsLike.user_id, models.UserNewsLike.news_id, models.UserNewsLike.created_at).all()

    # Scrap 데이터프레임 생성
    scrap_df = pd.DataFrame(scrap_data, columns=['user_id', 'news_id', 'created_at'])
    scrap_df['scrap'] = 1  # scrap한 경우는 1로 표시

    # Like 데이터프레임 생성
    like_df = pd.DataFrame(like_data, columns=['user_id', 'news_id', 'created_at'])
    like_df['like'] = 1  # like한 경우는 1로 표시

    # Scrap과 Like를 outer join하여 결합
    merged_df = pd.merge(scrap_df, like_df, on=['user_id', 'news_id'], how='outer', suffixes=('_scrap', '_like'))
    print(merged_df.columns)
    # 결측치 처리: scrap이나 like가 없는 경우 0으로 채움
    merged_df['scrap'] = merged_df['scrap'].fillna(0)
    merged_df['like'] = merged_df['like'].fillna(0)

        # 현재 시간과 일주일 전 시간을 계산
    now = datetime.now()
    one_week_ago = now - timedelta(weeks=1)

    # 인터랙션 계산 (일주일 이내이면 1.5배 가중치 적용)
    def calculate_interaction(row):
        # created_at_scrap과 created_at_like가 NaN이 아닌지 확인하고, datetime인지 확인한 후 비교
        if pd.notna(row['created_at_scrap']) and isinstance(row['created_at_scrap'], datetime):
            scrap_weight = 1.5 if row['created_at_scrap'] >= one_week_ago else 1
        else:
            scrap_weight = 1

        if pd.notna(row['created_at_like']) and isinstance(row['created_at_like'], datetime):
            like_weight = 1.5 if row['created_at_like'] >= one_week_ago else 1
        else:
            like_weight = 1
        
        # scrap이 있으면 2, like가 있으면 1, 일주일 이내일 경우 가중치 적용
        if row['scrap'] > 0:
            return 2 * scrap_weight
        elif row['like'] > 0:
            return 1 * like_weight
        else:
            return 0
    
    # apply를 사용해 각 row에 대해 계산
    scrap_like_df = merged_df
    scrap_like_df['interaction'] = scrap_like_df.apply(calculate_interaction, axis=1)

    # 유저-뉴스 상호작용 매트릭스 생성
    user_news_matrix = scrap_like_df.pivot_table(index='user_id', columns='news_id', values='interaction', fill_value=0)
    
    # 결과 확인
    # print(scrap_like_df)
    # print(user_news_matrix)







# 새로운 사용자에 대해 UserIndustry 기반으로 유사도를 계산하는 함수
def calculate_industry_similarity(user_id:int, db: Session):
    # 새로운 사용자의 선호 산업을 가져옴
    new_user_industries = db.query(models.UserIndustry).filter(models.UserIndustry.user_id == user_id).all()
    industry_ids = {industry.industry_id for industry in new_user_industries}

    # 기존 사용자를 모두 가져와서 산업 선호도를 비교
    user_sim = {}
    for user in db.query(models.User).all():
        if user.user_id == user_id:
            continue
        user_industries = db.query(models.UserIndustry).filter(models.UserIndustry.user_id == user.user_id).all()
        user_industry_ids = {industry.industry_id for industry in user_industries}

        # 교집합을 이용하여 산업 선호도의 유사도를 계산
        intersection = len(industry_ids & user_industry_ids)
        union = len(industry_ids | user_industry_ids)

        # Jaccard 유사도 계산 (교집합 / 합집합)
        similarity = intersection / union if union > 0 else 0
        user_sim[user.user_id] = similarity

    # 유사도가 높은 사용자 반환
    # print("user_sim")
    # print(user_sim)
    return user_sim

def calculate_interaction_similarity(user_id:int, db:Session):
    query_user = user_id
    user_sim = dict() # {사용자 iD : 유사도 형태로 저장}
    # 사용자 별 유사도(cosine similarity) 계산 (query_user 자신과는 계산 안함)
    # print('user_news_matrix : ')
    # print(user_news_matrix)
    # print(user_news_matrix.index)
    user_similarity = cosine_similarity(user_news_matrix)
    # print(user_similarity)
    query_user_idx = list(user_news_matrix.index).index(user_id)
    # print(user_similarity[query_user_idx])
    for idx, user in enumerate(user_news_matrix.index):
        if idx == query_user_idx:
            continue
        user_sim[user] = float(user_similarity[query_user_idx][idx])
    # print(user_sim)
    return user_sim

# collaborative_filtering 함수 내부에서:
def collaborative_filtering(user_id: int, db: Session):
    interaction_cnt = len(scrap_like_df[scrap_like_df['user_id'] == user_id])
    user_ids = scrap_like_df['user_id'].unique()
    
    if interaction_cnt < 10:
        user_similarity = calculate_industry_similarity(user_id, db)
    else:
        user_similarity = calculate_interaction_similarity(user_id, db)

    if len(user_similarity) < 1:
        return None

    n_top = 5
    similarity_df = pd.DataFrame(user_similarity, columns=['user_id', 'similarity'])
    top_users = similarity_df.sort_values(by='similarity', ascending=False).head(n_top)['user_id']
    similar_users_records = user_news_matrix.loc[top_users]
    contents_score = similar_users_records.sum(axis=0)

    # 점수에 따라 상위 10개의 뉴스 정렬
    top_news = contents_score.sort_values(ascending=False).head(10)

    recommended_news = set()
    for news_id, score in top_news.items():
        if interaction_cnt:
            if user_news_matrix.loc[user_id, news_id] == 0:
                recommended_news.add(news_id)
        else:
            recommended_news.add(news_id)

    return list(recommended_news), top_news

 
from datetime import datetime, timedelta

def get_related_news(news_list, scores, user_id, db: Session):
    user_industry = db.query(models.UserIndustry.industry_id).filter(user_id == user_id)
    related_news_list = dict()
    # print("user_industry" , user_industry)
    one_week_ago = datetime.now() - timedelta(days=7)  # 일주일 전 기준

    for news_id, original_score in zip(news_list, scores):
        news = db.query(models.News).filter(models.News.news_id == news_id).first()

        # 산업군 매칭 가중치 계산
        industry_weight = 1.0
        if user_industry and news.industry in user_industry:
            industry_weight = 3

        # 최신 뉴스 가중치 계산
        latest_news_weight = 1.0
        if news.news_published_at >= one_week_ago:  # 일주일 이내
            latest_news_weight = 2

        # 최종 점수 계산
        final_score = original_score * latest_news_weight * industry_weight

        # 관련 뉴스의 ID로 조회하여 생성 날짜에 따라 점수 추가
        related_news_ids = [news.related_news_id_1, news.related_news_id_2, news.related_news_id_3]
        for related_news_id in related_news_ids:
            if related_news_id:
                related_news = db.query(models.News).filter(models.News.news_id == related_news_id).first()
                if related_news and related_news.created_at >= one_week_ago:
                    # 일주일 이내라면 점수에 1.5배 가중치 추가
                    final_score *= 1.5

        # 관련 뉴스 ID와 점수 저장
        related_news_list[news_id] = final_score

        # 역참조된 뉴스에 대해 점수 계산
        reverse_related_news = db.query(models.News).filter(
            (models.News.related_news_id_1 == news_id) |
            (models.News.related_news_id_2 == news_id) |
            (models.News.related_news_id_3 == news_id)
        ).all()

        for reverse_news in reverse_related_news:
            reverse_score = original_score
            if reverse_news.created_at >= one_week_ago:
                reverse_score *= 1.5  # 일주일 이내인 경우 가중치 적용
            related_news_list[reverse_news.news_id] = reverse_score

    # 중복 제거 후 상위 30개 추출
    unique_news = {k: v for k, v in sorted(related_news_list.items(), key=lambda item: item[1], reverse=True)}
    return dict(list(unique_news.items())[:10])



def get_latest_news(user_id: int, db:Session):
    # 사용자 선호 산업 리스트 추출 (최대 3개)
    user_industry_ids = db.query(models.UserIndustry.industry_id).filter(models.UserIndustry.user_id == user_id).all()
    # print(user_industry_ids)
    # 산업별로 최신 뉴스 10개씩 추출
    latest_news = []
    for industry in user_industry_ids:
        # print(industry)
        news_list = db.query(models.News.news_id).filter(models.News.news_industry_id == industry[0]).order_by(models.News.news_published_at.desc()).limit(10).all()
        for news in news_list:
            latest_news.append(news[0])

    return latest_news

async def get_id_from_body(request:Request):
    body = await request.json()  # 요청 Body를 JSON으로 파싱
    # print(body)
    return body.get("user_id")  # 'name' 파라미터 추출

@router.get("/list/{user_id}")
def read_item(user_id: int, db: Session = Depends(get_db)):
    # if scrap_like_df is None:
    #     get_scrap_like_dataframe(db)

    # user_based_recommend_news_list, ub_scores = collaborative_filtering(user_id, db)
    # ib_news_list = get_related_news(user_based_recommend_news_list, ub_scores, user_id, db)

    # interaction_cnt = len(scrap_like_df[scrap_like_df['user_id'] == user_id])
    # if interaction_cnt:
    #     user_interactions = user_news_matrix.loc[user_id]
    # else:
    #     user_interactions = {}

    # interacted_news_ids = set()
    # for news_id, interaction in user_interactions.items():
    #     if interaction > 0:
    #         interacted_news_ids.add(news_id)

    # item_based_recommend_news_list = list(set(ib_news_list.keys()) - set(user_based_recommend_news_list) - interacted_news_ids)
    
    
    industry_latest_news = get_latest_news(user_id, db)
    # industry_latest_news_list = list(set(industry_latest_news) - interacted_news_ids)
    return {
        "user_base": [1105, 3714, 2836, 3021, 2918, 2894, 736, 2789, 4407, 4460, 1226 ],  # 임시 user_base
        "item_base": [3036, 3174, 3185, 3052, 3031, 3028, 2878, 4504, 3327, 2945],  # 임시 item_base
        # "user_base": user_based_recommend_news_list[:10],  # 상위 10개 뉴스
        # "item_base": list(item_based_recommend_news_list)[:10],  # 상위 10개 뉴스
        "latest": industry_latest_news_list
    }


def update_interaction_matrix(db: Session):
    global scrap_like_df, user_news_matrix
    get_scrap_like_dataframe(db)

# 10분마다 상호작용 행렬 갱신
scheduler = BackgroundScheduler()
scheduler.add_job(update_interaction_matrix, 'interval', minutes=10, args=[next(get_db())])
scheduler.start()

# 일정 시간이 되면 업데이트할 데이터들
scrap_like_df = None
user_news_matrix = None
# ---------------------
