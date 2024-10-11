import { Link } from "react-router-dom";
import styled from "styled-components";
import BgImage from "@assets/landing/bgImage.png";

// Styled Components로 버튼 스타일 정의
const StyledButton = styled(Link)`
  padding: 8px 25px;
  font-size: 1rem;
  margin-right: 2%;
  border-radius: 12px;
  background-color: #fff;
  color: #000;
  text-decoration: none;
  border: 1px solid white;
  display: inline-block;
  text-align: center;
  font-weight: 800;

  &:hover {
    background-color: rgba(255, 255, 255, 0);
    color: #fff;
    border: 1px solid white;
  }
`;

const StyledButton1 = styled(Link)`
  padding: 8px 20px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.75);
  font-size: 1rem;
  margin-right: 2%;
  border-radius: 12px;
  color: #fff;
  text-decoration: none;
  border: 1px solid white;
  display: inline-block;
  text-align: center;
  font-weight: 800;

  &:hover {
    background-color: #fff;
    color: black;
  }
`;

// Title 스타일 정의 (Scheherazade New 폰트 적용, 얇은 폰트)
const Title = styled.h1`
  font-size: 3.5rem;
  font-family: "Scheherazade New", serif;
  font-weight: 100;
  margin-bottom: -2.5rem;
  color: white;
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: white;
  text-align: center;
`;

const Section = styled.div`
  position: absolute;
  left: 5%;
  top: 35%;
  z-index: 2;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const StyledContainer = styled.div`
  background-image: url(${BgImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

// Carousel1 컴포넌트
const Carousel1: React.FC = () => {
  return (
    <>
      <StyledContainer>
        {/* 검은색 오버레이 추가 */}
        <Overlay />

        {/* 실제 컨텐츠는 오버레이 위에 표시 */}
        <Section>
          <Title>NEWSCRAB</Title>
          <Description>
            원하는 뉴스와 키워드를 손쉽게 모아보세요{" "}
            <span role="img" aria-label="crab">
              🦀
            </span>
          </Description>

          <div>
            <StyledButton to="/login">로그인</StyledButton>
            <StyledButton1 to="/signup1">회원가입</StyledButton1>
          </div>
        </Section>
      </StyledContainer>
    </>
  );
};

export default Carousel1;
