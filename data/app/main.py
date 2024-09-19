from fastapi import FastAPI
from app.keywords.routes import router as keyword_router


app = FastAPI()

@app.get("/reco")
def hello():
    return {"Hello": "World"}

# /reco/industries로 라우터 포함
app.include_router(keyword_router, prefix="/reco/industries")
