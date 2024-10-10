import React from "react";
import styled from "styled-components";
import bg from "@assets/ping/pingbg.png";
import ping from "@assets/ping/케미핑.png";

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
  margin-top: 20%;
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 20px;
  color: #333;
  position: absolute; // 절대 위치로 캐릭터 위로 배치
  top: 115px; // 원하는 위치로 설정
  left: 50%;
  transform: translateX(-50%);
  z-index: 2; // 캐릭터보다 위에 배치
  span:first-child {
    font-family: "Paper";
  }

  span:last-child {
    font-family: "Moya", sans-serif;
    font-weight: 100;
    font-size: 38px;
    color: #4BF6FF;
  }
`;
const CharacterImage = styled.img`
  width: 280px;
  position: absolute;
  top: -135px;
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

const Ping2: React.FC = () => {
  return (
    <Container>
        <Title>
          <span>당신은.. </span>
          <span>케미핑!</span>
        </Title>
      <ContentWrapper>
        <CharacterImage src={ping} alt="케미핑" />
        <Description>
        석유화학 산업은 고도의 기술과 공정 관리가 필요한 분야입니다.<br/>큰 그림을 그리면서도 세부사항을 철저하게 챙겨야 해요.          
          <br/>
          <br/>
          <br/>
          당신은 문제 해결사!<br/>복잡한 문제도 차근차근 풀어가는 성격이에요.<br/>긴 호흡으로 끝까지 해내는 당신에게 석유화학이 잘 어울려요.
        </Description>
        <Button href="/scrap">석유화학 뉴스 스크랩하러 가기!</Button>
        <Button href="/mypage">돌아가기</Button>
      </ContentWrapper>
    </Container>
  );
};

export default Ping2;