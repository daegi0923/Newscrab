import { Link } from "react-router-dom";
import styled from "styled-components";
import BgImage from "@assets/landing/bgImage.png";

// Styled Components로 버튼 스타일 정의
const StyledButton = styled(Link)`
  padding: 10px 20px;
  font-size: 1rem;
  margin: 0 10px;
  border-radius: 20px;
  background-color: #fff;
  color: #000;
  text-decoration: none; /* 링크 밑줄 제거 */
  border: none;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: #f0f0f0; /* 호버 시 색상 변화 */
  }
`;

const LandingPage: React.FC = () => {
  return (
    <>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
          }
          #root {
            height: 100%;
          }
        `}
      </style>
      <div
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          margin: "0",
          padding: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          NEWSCRAB
        </h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
          원하는 뉴스와 키워드를 손쉽게 모아보세요{" "}
          <span role="img" aria-label="crab">
            🦀
          </span>
        </p>
        <div>
          {/* Styled Components로 만든 버튼 사용 */}
          <StyledButton to="/login">로그인</StyledButton>
          <StyledButton to="/signup1">회원가입</StyledButton>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
