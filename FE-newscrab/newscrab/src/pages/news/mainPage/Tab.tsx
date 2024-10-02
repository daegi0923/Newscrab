import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 import
import styled from "styled-components";

// 탭 스타일링
const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 100px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const TabItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 15px;
  color: #007bff;

  &:hover {
    color: #000; /* 마우스 오버 시 색상 변화 */
  }
`;

const Tab: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <div>
      <TabContainer>
        <TabItem onClick={() => navigate("/rcmdNews")}>추천 뉴스 ⏵</TabItem>
        <TabItem onClick={() => navigate("/news")}>최신 뉴스 ⏵</TabItem>
        <TabItem>인기 뉴스</TabItem>
      </TabContainer>
    </div>
  );
};

export default Tab;
