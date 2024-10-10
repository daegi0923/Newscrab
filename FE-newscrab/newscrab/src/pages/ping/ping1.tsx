import React from "react";
import styled from "styled-components";
import bg from "@assets/ping/pingbg.png";
import ping from "@assets/ping/깡깡핑.png";

const Container = styled.div`
  height: 95.5%;
  width: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  padding: 20px;
  transform: translateX(55%);
`;

const ContentWrapper = styled.div`
  background: white;
  width: 40vw;
  max-width: 500px;
  padding: 110px 10px 20px 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  position: relative;
  margin-top: 25px;
`;

const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
  span:first-child {
    font-family: "Paper";
  }

  span:last-child {
    font-family: "Moya", sans-serif;
    font-weight: 100;
    font-size: 30px;
    color: #ad1267;
  }
`;

const CharacterImage = styled.img`
  width: 240px;
  position: absolute;
  top: -110px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const Description = styled.p`
  font-size: 18px;
  color: #555;
  z-index: 0;
  position: relative;
  font-family: "Paper5";
  font-weight: 400;
`;

const Button = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 7px 12px;
  background-color: #f05642;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  margin-right: 10px;
  margin-bottom: 10px;
  font-family: "Paper5";
`;

const Ping1: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <CharacterImage src={ping} alt="깡깡핑" />
        <Title>
          <span>당신은.. </span>
          <span>깡깡핑!</span>
        </Title>
        <Description>
          철강 산업은 강한 내구성과 안정성이 필수인 산업입니다.<br/>튼튼하고 오래가는 제품을 만들어내는 게 중요하죠.
          <br/>
          <br/>
          <br/>
          당신은 철벽 방어!<br/>안정성을 중시하고, 무슨 일이 있어도 흔들리지 않는 성격이에요.<br/>철강처럼 강한 의지를 가진 당신에게 딱 어울리는 산업입니다!
        </Description>
        <Button href="/scrap">철강 뉴스 스크랩하러 가기!</Button>
        <Button href="/mypage">돌아가기</Button>
      </ContentWrapper>
    </Container>
  );
};

export default Ping1;