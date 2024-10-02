import React from "react";
import styled from "styled-components";

// 텍스트 스타일링
const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
`;

const Tab: React.FC = () => {
  return <Message>사용자님을 위한 추천 뉴스에요!</Message>;
};

export default Tab;
