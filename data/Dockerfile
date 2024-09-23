# 
FROM python:3.9

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./app /code/app


# FastAPI 서버 실행 (8000번 포트)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
