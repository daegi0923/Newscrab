# Node.js 공식 이미지 사용. 경량화된 Alpine Linux 기반
FROM node:18.20.4-alpine AS build

# 작업 디렉토리 설정. 컨테이너 내 앱의 기본 경로
WORKDIR /app

# 라이브러리 설치에 필요한 파일만 복사
COPY package.json .
COPY package-lock.json .

# 라이브러리 설치
RUN npm ci

# 소스코드 복사
COPY . /app

# 소스 코드 빌드
RUN npm run build