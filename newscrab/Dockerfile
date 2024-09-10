FROM gradle:8.8-jdk-focal AS build

WORKDIR /app

COPY build.gradle settings.gradle ./

RUN gradle dependencies --no-daemon

COPY . /app

RUN gradle clean build --no-daemon