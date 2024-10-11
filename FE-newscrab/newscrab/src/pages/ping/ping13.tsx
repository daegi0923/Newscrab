import React from "react";
import styled from "styled-components";
import bg from "@assets/ping/pingbg.png";
import ping from "@assets/ping/반도핑.png";

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
    color: #00A5FF;
  }
`;

const CharacterImage = styled.img`
  width: 300px;
  position: absolute;
  top: -140px;
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

const Ping13: React.FC = () => {
  return (
    <Wrapper>
    <Container>
      <ContentWrapper>
        <CharacterImage src={ping} alt="반도핑" />
        <Title>
          <span>당신은.. </span>
          <span>반도핑!</span>
        </Title>
        <Description>
        반도체 산업은 높은 정밀도와 작은 디테일이 중요한 산업입니다.<br/>빠르게 발전하는 기술을 다루죠.
          <br/>
          <br/>
          <br/>
          당신은 디테일 전문가!<br/>미세한 부분까지 놓치지 않고, 작은 것도 세심하게 처리해요.<br/>논리적이고 체계적인 반도체 산업과 잘 어울립니다!
        </Description>
        <Button href="/mainNews">반도체 뉴스 스크랩하러 가기!</Button>
        <Button href="/mypage">돌아가기</Button>
      </ContentWrapper>
    </Container>
    </Wrapper>
  );
};

export default Ping13;