import React from "react";
import styled from "styled-components";
import bg from "@assets/ping/pingbg.png";
import ping from "@assets/ping/혼수핑.png";

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
    color: #FFE204;
  }
`;

const CharacterImage = styled.img`
  width: 310px;
  position: absolute;
  top: -95px;
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

const Ping5: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <CharacterImage src={ping} alt="혼수핑" />
        <Title>
          <span>당신은.. </span>
          <span>혼수핑!</span>
        </Title>
        <Description>
        가전 산업은 사용자의 편리함을 최우선으로 생각하는 분야입니다.<br/>실용적인 기술을 만들어내는 게 핵심이에요.
          <br/>
          <br/>
          <br/>
          당신은 실용주의자!<br/>복잡한 것보다는 실용적인 것을 좋아하는 것 같아요.<br/>남들에게 도움이 되는 제품을 만드는 가전 산업이 딱이에요!
        </Description>
        <Button href="/scrap">가전 뉴스 스크랩하러 가기!</Button>
        <Button href="/mypage">돌아가기</Button>
      </ContentWrapper>
    </Container>
  );
};

export default Ping5;