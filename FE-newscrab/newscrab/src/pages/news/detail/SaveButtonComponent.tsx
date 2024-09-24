import React from "react";
import styled from "styled-components";

const SaveButton = styled.button`
  background-color: #f0c36d;
  border: none;
  border-radius: 12px; /* 버튼 크기를 줄이기 위해 border-radius를 작게 조정 */
  padding: 8px 16px; /* 패딩 크기를 줄여 버튼을 더 작게 만듦 */
  font-size: 12px; /* 글자 크기를 줄임 */
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px; /* NewsDetailScrap과의 간격을 유지하기 위해 마진 추가 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자의 크기와 강도 */

  &:hover {
    background-color: #d9a654;
  }

  &:active {
    background-color: #c89640;
  }
`;

const SaveButtonComponent: React.FC = () => {
  return <SaveButton onClick={() => alert("저장되었습니다!")}>저장</SaveButton>;
};

export default SaveButtonComponent;
