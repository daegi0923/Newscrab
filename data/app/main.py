from fastapi import FastAPI
from app.industries.routes import router as industries_router
from app.crawling.routes import router as crawling_router 
from app.voca.routes import router as voca_router 
from app.scrap.routes import router as scrap_router 
from app.recommend.routes import router as recommend_router 


app = FastAPI()

@app.get("/api/v1/reco/test")
def hello():
    return {"Hello": "World"}

# /reco/industries로 라우터 포함
app.include_router(industries_router, prefix="/api/v1/reco/industries")

# /reco/crawling으로 라우터 포함 (필요한 경로로 설정)
app.include_router(crawling_router, prefix="/api/v1/reco/crawling")

app.include_router(voca_router, prefix="/api/v1/reco/voca")

app.include_router(scrap_router, prefix="/api/v1/reco/scrap")
app.include_router(recommend_router, prefix="/api/v1/reco/scrap")