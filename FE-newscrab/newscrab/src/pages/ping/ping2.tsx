import React from "react";
import styled from "styled-components";
import bg from "@assets/ping/pingbg.png";
import ping from "@assets/ping/케미핑.png";

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
    color: #4BF6FF;
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
    <Wrapper>
    <Container>
      <ContentWrapper>
        <CharacterImage src={ping} alt="케미핑" />
        <Title>
          <span>당신은.. </span>
          <span>케미핑!</span>
        </Title>
        <Description>
        석유화학 산업은 고도의 기술과 공정 관리가 필요한 분야입니다.<br/>큰 그림을 그리면서도 세부사항을 철저하게 챙겨야 해요.          
          <br/>
          <br/>
          <br/>
          당신은 문제 해결사!<br/>복잡한 문제도 차근차근 풀어가는 성격이에요.<br/>긴 호흡으로 끝까지 해내는 당신에게 석유화학이 잘 어울려요.
        </Description>
        <Button href="/mainNews">석유화학 뉴스 스크랩하러 가기!</Button>
        <Button href="/mypage">돌아가기</Button>
      </ContentWrapper>
    </Container>
    </Wrapper>
  );
};

export default Ping1;