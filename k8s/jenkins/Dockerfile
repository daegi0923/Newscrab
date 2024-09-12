FROM jenkins/jenkins:lts

USER root  # 루트 사용자로 변경하여 패키지 설치

# Docker CLI 설치
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \
    apt-get update && \
    apt-get install -y docker-ce-cli

USER jenkins  # 다시 jenkins 사용자로 전환
