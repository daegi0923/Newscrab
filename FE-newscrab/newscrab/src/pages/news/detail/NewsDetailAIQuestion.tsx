import React, { useState } from "react";
import styled from "styled-components";

// AI 예상질문 버튼 스타일 정의
const AIButtonStyled = styled.button`
  background-color: #ffdb4d;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  margin-top: 10px; /* 버튼과 텍스트 입력란 사이의 간격 조정 */
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f0c36d;
  }

  &:active {
    background-color: #d9a654;
  }
`;

// AI 예상질문 상자 스타일 정의
const AIQuestionBox = styled.div`
  background-color: #f6f7f8;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// 예상 질문 텍스트를 감싸는 상자 정의
const AIQuestionTextContainer = styled.div`
  background-color: #f0f0f0;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
`;

const AIQuestionHeader = styled.h4`
  margin: 0;
  font-weight: bold;
  color: #666;
`;

const AIQuestionText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
`;

const TextTransferButton = styled.button`
  background-color: #ffdb4d;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0c36d;
  }

  &:active {
    background-color: #d9a654;
  }
`;

interface NewsDetailAIQuestionProps {
  onTransferText: (text: string) => void; // opinionText를 업데이트하는 함수
}

const NewsDetailAIQuestion: React.FC<NewsDetailAIQuestionProps> = ({ onTransferText }) => {
  const [showQuestion, setShowQuestion] = useState(false);

  const handleAIButtonClick = () => {
    setShowQuestion(!showQuestion); // 버튼을 클릭할 때마다 상태를 토글
  };

  const questionText = `
  1. 트리콜마트가 납품업체에 대금을 지급하지 않은 이유는 무엇인가요?

  2. 납품업체들이 피해를 해결하기 위해 어떤 조치를 취하고 있나요?
  
  3. 이번 사태가 지역 경제에 미치는 영향은 무엇인가요?`;

  const handleTextTransfer = () => {
    onTransferText(questionText); // AI 예상 질문을 추가하는 함수 호출
  };

  return (
    <div>
      <AIButtonStyled onClick={handleAIButtonClick}>
        AI 예상질문
      </AIButtonStyled>
      {showQuestion && (
        <AIQuestionBox>
          <AIQuestionHeader>AI 예상질문</AIQuestionHeader>
          <AIQuestionText>뉴스 본문을 바탕으로 자동 생성된 질문입니다.</AIQuestionText>
          <AIQuestionTextContainer>
            <AIQuestionText>{questionText}</AIQuestionText>
          </AIQuestionTextContainer>
          <TextTransferButton onClick={handleTextTransfer}>
            위의 텍스트로 보내기
          </TextTransferButton>
        </AIQuestionBox>
      )}
    </div>
  );
};

export default NewsDetailAIQuestion;
