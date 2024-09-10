FROM gradle:8.8-jdk-focal AS build

WORKDIR /app
# Gradle과 프로젝트 관련 파일들을 복사
COPY build.gradle settings.gradle gradle /app/
COPY gradlew /app/gradlew
COPY gradlew.bat /app/gradlew.bat
COPY gradle/wrapper /app/gradle/wrapper
COPY src /app/src

# gradlew에 실행 권한 추가 및 dos2unix 변환
RUN chmod +x /app/gradlew && dos2unix /app/gradlew

# Gradle을 사용하여 애플리케이션 빌드
RUN ./gradlew build

CMD ["java", "-jar", "build/libs/newscrab-0.0.1-SNAPSHOT.jar"]