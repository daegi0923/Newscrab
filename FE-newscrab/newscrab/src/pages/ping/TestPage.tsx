import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Pingtest from "@assets/ping/pingtest.png"

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  text-align: center;
`;

const Image = styled.img`
  width: 700px; // 이미지 크기
  height: auto;
  margin-bottom: 20px;
`;

const StartButton = styled.button`
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: absolute;
  // bottom: 340px;
  // right: 485px;
  bottom: 38%;
  right: 34%;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.1); /* 완전 투명한 배경 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Paper7", sans-serif;
  font-weight: 100; 
  font-size: 18px;
  transition: background-color 0.3s ease;

  /* Hover 시 배경만 불투명하게 */
  &:hover {
    background-color: rgba(255, 255, 255, 0.5); /* hover 시 약간의 투명한 배경색 */
  }
`;

const TestPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Image src={Pingtest} alt="Test Image" />
      <StartButton onClick={() => navigate("/test1")}>테스트 시작하기</StartButton>
    </Container>
  );
};

export default TestPage;
