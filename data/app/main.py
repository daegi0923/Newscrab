from fastapi import FastAPI

app = FastAPI()

@app.get("/reco/test")
def hello():
    return {"Hello": "World testtest"}