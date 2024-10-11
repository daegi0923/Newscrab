# 
FROM python:3.9

ENV JAVA_HOME /usr/lib/jvm/java-1.7-openjdk/jre
RUN apt-get update && apt-get install -y g++ default-jdk
RUN pip install konlpy

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

RUN apt install -y ./google-chrome-stable_current_amd64.deb

# 
COPY ./app /code/app

RUN chmod +x /code/app/crawling/chromedriver

# FastAPI 서버 실행 (8000번 포트)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
