import React from "react";
import styled from "styled-components";
import bg from "@assets/ping/pingbg.png";
import ping from "@assets/ping/짜릿핑.png";

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
    color: #FFE204;
  }
`;

const CharacterImage = styled.img`
  width: 280px;
  position: absolute;
  top: -120px;
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

const Ping14: React.FC = () => {
  return (
    <Wrapper>
    <Container>
      <ContentWrapper>
        <CharacterImage src={ping} alt="짜릿핑" />
        <Title>
          <span>당신은.. </span>
          <span>짜릿핑!</span>
        </Title>
        <Description>
        이차전지 산업은 미래 에너지를 책임지는 산업입니다.<br/>안정성과 효율성이 가장 중요한 기술 중심의 분야죠.
          <br/>
          <br/>
          <br/>
          에너지 만땅인 당신!<br/>끊임없이 새로움을 추구하고, 미래지향적인 성향을 가지고 있어요.<br/>꾸준히 완수해내는 당신에게 이차전지 산업이 잘 맞습니다.
        </Description>
        <Button href="/mainNews">이차전지 뉴스 스크랩하러 가기!</Button>
        <Button href="/mypage">돌아가기</Button>
      </ContentWrapper>
    </Container>
    </Wrapper>
  );
};

export default Ping14;