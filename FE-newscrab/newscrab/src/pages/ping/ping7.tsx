import React from "react";
import styled from "styled-components";
import bg from "@assets/ping/pingbg.png";
import ping from "@assets/ping/메카핑.png";

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
  width: 270px;
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

const Ping7: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <CharacterImage src={ping} alt="메카핑" />
        <Title>
          <span>당신은.. </span>
          <span>메카핑!</span>
        </Title>
        <Description>
        일반기계 산업은 정밀하고 안정적인 기계 작업을 중요시하는 분야예요.<br/>모든 공정이 정확하게 맞아떨어져야 하죠.
          <br/>
          <br/>
          <br/>
          당신은 디테일 장인!<br/>사소한 부분도 놓치지 않고, 정확하게 일처리를 하는 성격이에요.<br/>기계처럼 착착 맞아떨어지는 걸 좋아하는 당신에게 잘 맞아요!
        </Description>
        <Button href="/scrap">일반기계 뉴스 스크랩하러 가기!</Button>
        <Button href="/mypage">돌아가기</Button>
      </ContentWrapper>
    </Container>
  );
};

export default Ping7;