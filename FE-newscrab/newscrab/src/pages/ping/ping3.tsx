import React from "react";
import styled from "styled-components";
import bg from "@assets/ping/pingbg.png";
import ping from "@assets/ping/판교핑.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

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
    color: #814AFF;
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

const Ping3: React.FC = () => {
  return (
    <Wrapper>
    <Container>
      <ContentWrapper>
        <CharacterImage src={ping} alt="판교핑" />
        <Title>
          <span>당신은.. </span>
          <span>판교핑!</span>
        </Title>
        <Description>
        IT 산업은 기술 혁신과 빠른 변화가 중요한 분야예요.<br/>최신 트렌드에 민감하고, 늘 새로운 기술을 탐구하죠.
          <br/>
          <br/>
          <br/>
          당신은 최신 기술을 금방 익히는 트렌드 세터!<br/>변화를 두려워하지 않고,<br/>늘 새로운 도전을 즐기는 당신은 IT 산업에 안성맞춤입니다.
        </Description>
        <Button href="/mainNews">IT 뉴스 스크랩하러 가기!</Button>
        <Button href="/mypage">돌아가기</Button>
      </ContentWrapper>
    </Container>
    </Wrapper>
  );
};

export default Ping3;