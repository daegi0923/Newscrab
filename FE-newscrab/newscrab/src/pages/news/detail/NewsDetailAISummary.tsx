import React, { useState } from "react";
import styled from "styled-components";

// AI 요약 버튼 스타일 정의
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

// AI 요약 상자 스타일 정의
const AISummaryBox = styled.div`
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

// 요약 텍스트를 감싸는 상자 정의
const AISummaryTextContainer = styled.div`
  background-color: #f0f0f0;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
`;

const AISummaryHeader = styled.h4`
  margin: 0;
  font-weight: bold;
  color: #666;
`;

const AISummaryText = styled.p`
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

interface NewsDetailAISummaryProps {
  onTransferText: (text: string) => void; // summaryText를 업데이트하는 함수
}

const NewsDetailAISummary: React.FC<NewsDetailAISummaryProps> = ({ onTransferText }) => {
  const [showSummary, setShowSummary] = useState(false);

  const handleAIButtonClick = () => {
    setShowSummary(!showSummary); // 버튼을 클릭할 때마다 상태를 토글
  };

  const summaryText = `
  <서론> 부산 지역의 트리콜마트가 납품업체에 대금을 지급하지 않아 소규모 업체들이 피해를 호소하고 있습니다.

  <본론> 일부 업체는 6개월 동안 대금을 받지 못했고, 본사는 법적 해결을 요구하며 소극적인 태도를 보였습니다.
  
  <결론> 영세 납품업체들은 대응 비용이 부담되며 상황이 더욱 악화되고 있습니다.`;

  const handleTextTransfer = () => {
    onTransferText(summaryText); // summaryText를 업데이트하는 함수를 호출
  };

  return (
    <div>
      <AIButtonStyled onClick={handleAIButtonClick}>
        AI 요약
      </AIButtonStyled>
      {showSummary && (
        <AISummaryBox>
          <AISummaryHeader>AI 요약</AISummaryHeader>
          <AISummaryText>뉴스 본문을 자동으로 요약한 내용입니다.</AISummaryText>
          <AISummaryTextContainer>
            <AISummaryText>{summaryText}</AISummaryText>
          </AISummaryTextContainer>
          <TextTransferButton onClick={handleTextTransfer}>
            위의 텍스트로 보내기
          </TextTransferButton>
        </AISummaryBox>
      )}
    </div>
  );
};

export default NewsDetailAISummary;
