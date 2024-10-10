import React from "react";
import styled from "styled-components";
import bg from "@assets/ping/pingbg.png";
import ping from "@assets/ping/픽셀핑.png";

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
    color: #34E3FE;
  }
`;

const CharacterImage = styled.img`
  width: 330px;
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

const Ping11: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <CharacterImage src={ping} alt="픽셀핑" />
        <Title>
          <span>당신은.. </span>
          <span>픽셀핑!</span>
        </Title>
        <Description>
        디스플레이 산업은 시각적인 아름다움과 기술의 융합이 중요해요.<br/>창의력과 세밀한 기술이 필요합니다.
          <br/>
          <br/>
          <br/>
          창의력이 뛰어난 당신!<br/>시각적인 요소를 중요시하고, 아름다운 결과물을 만들어내죠.<br/>디테일을 중시하는 당신은 디스플레이 산업과 딱 맞아요!
        </Description>
        <Button href="/scrap">디스플레이 뉴스 스크랩하러 가기!</Button>
        <Button href="/mypage">돌아가기</Button>
      </ContentWrapper>
    </Container>
  );
};

export default Ping11;