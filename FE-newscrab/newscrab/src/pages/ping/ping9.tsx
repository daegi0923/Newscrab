import React from "react";
import styled from "styled-components";
import bg from "@assets/ping/pingbg.png";
import ping from "@assets/ping/기름핑.png";

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
    color: #FF0D0D;
  }
`;

const CharacterImage = styled.img`
  width: 320px;
  position: absolute;
  top: -115px;
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

const Ping9: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <CharacterImage src={ping} alt="기름핑" />
        <Title>
          <span>당신은.. </span>
          <span>기름핑!</span>
        </Title>
        <Description>
        정유 산업은 세계에 에너지를 공급하는 중요한 산업입니다.<br/>자원을 효율적으로 관리하고, 안정적인 생산이 중요하죠.
          <br/>
          <br/>
          <br/>
          당신은 효율성 끝판왕!<br/>낭비 없이, 언제나 효율적으로 일을 처리하는 성격이에요.<br/>정유 산업처럼 빠른 결정과 안정적인 관리가 중요한 분야에 딱 맞아요!
        </Description>
        <Button href="/scrap">정유 뉴스 스크랩하러 가기!</Button>
        <Button href="/mypage">돌아가기</Button>
      </ContentWrapper>
    </Container>
  );
};

export default Ping9;