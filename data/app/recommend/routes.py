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
    print(scrap_like_df)
    print(user_news_matrix)







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
    print("user_sim")
    print(user_sim)
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

def collaborative_filtering(user_id: int, db: Session):
    interaction_cnt = len(scrap_like_df[scrap_like_df['user_id'] == user_id])
    # 현재 유저의 인덱스 찾기
    user_ids = scrap_like_df['user_id'].unique()
    user_idx = np.where(user_ids == user_id)[0][0]
    if interaction_cnt < 10:
        user_similarity = calculate_industry_similarity(user_id, db)
    else:
        user_similarity = calculate_interaction_similarity(user_id, db)
        
        

    # 유사한 유저가 3명 이하면 빈 리스트 리턴
    if len(user_similarity) < 1:
        return None
    
    n_top = 3
    # user_similarity 딕셔너리를 DataFrame으로 변환
    similarity_df = pd.DataFrame(user_similarity, columns=['user_id', 'similarity'])

    # 유사도 기준으로 내림차순 정렬 후 상위 N명 선택
    top_users = similarity_df.sort_values(by='similarity', ascending=False).head(n_top)['user_id']
    print(top_users)
    similar_users_records = user_news_matrix.loc[top_users]


    print(similar_users_records)
    contents_score = similar_users_records.sum(axis = 0)
    print(contents_score)
    


    # 유사한 사용자가 찜하거나 스크랩한 뉴스를 추천
    recommended_news = set()
    # 요청 사용자 기록
    print(user_news_matrix, user_id)
    user_record = user_news_matrix.loc[user_id]
    print(user_record)
    for news_id, score in contents_score.items():
        print(news_id, score)
        if user_news_matrix.loc[user_id, news_id] == 0:  # 현재 사용자가 보지 않은 뉴스
            recommended_news.add(news_id)
    
    return list(recommended_news)



async def get_id_from_body(request:Request):
    body = await request.json()  # 요청 Body를 JSON으로 파싱
    print(body)
    return body.get("user_id")  # 'name' 파라미터 추출

@router.get("/list")
def read_item(user_id: int = Body(...), db: Session = Depends(get_db)):
# def read_item(user_id: int = 1, db: Session = Depends(get_db)):

    # Scrap 테이블에서 user_id가 스크랩한 뉴스의 news_id 조회
    # 아래 주석 풀면, 상호작용 데이터가 없을 때만 조회해서 갱신
    # if not scrap_like_df or not user_news_matrix:
    #     get_scrap_like_dataframe(db)
    get_scrap_like_dataframe(db)

    user_based_recommend_news_list = collaborative_filtering(user_id, db)
    print()
    # recommend_news = db.query(models.News).filter(models.News.news_id.in_(news_list)).all()
    # print(recommend_news)
    return {
        "user_base" : user_based_recommend_news_list,
        "item_base" : [],
		"latest" : []
    }



# 일정 시간이 되면 업데이트할 데이터들
scrap_like_df = None
user_news_matrix = None
# ---------------------
