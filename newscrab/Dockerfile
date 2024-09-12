# gradle 이미지로 빌드만
FROM gradle:7.6.4-jdk-focal AS build

WORKDIR /app

COPY build.gradle settings.gradle ./

RUN gradle dependencies --no-daemon

COPY . /app

# 빌드해서 jar 파일 생성
RUN gradle clean build --no-daemon

# JRE 이미지로 런타임 이미지 생성
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/build/libs/*.jar /app/newscrab.jar

EXPOSE 8080
ENTRYPOINT [ "java" ]
CMD [ "-jar", "newscrab.jar" ]
