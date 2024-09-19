from fastapi import FastAPI

app = FastAPI()

@app.get("/reco")
def hello():
    return {"Hello": "World"}