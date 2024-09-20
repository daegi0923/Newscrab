from fastapi import FastAPI
from app.industries.routes import router as industries_router
from app.crawling.routes import router as crawling_router 
from app.recommend.routes import router as recommend_router 

app = FastAPI()

@app.get("/reco/test")
def hello():
    return {"Hello": "World"}

# /reco/industries로 라우터 포함
app.include_router(industries_router, prefix="/reco/industries")

# /reco/crawling으로 라우터 포함 (필요한 경로로 설정)
app.include_router(crawling_router, prefix="/reco/crawling")

# /reco/recommend
app.include_router(recommend_router, prefix="/reco/recommend")