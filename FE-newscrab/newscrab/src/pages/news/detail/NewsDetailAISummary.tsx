import React, { useState } from "react";
import styled from "styled-components";
import { fetchNewsSummary } from "@apis/chatgpt/chatgpt";

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
  white-space: pre-wrap;
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
  newsId: number; // newsId를 받아옴
  onTransferText: (text: string) => void; // summaryText를 업데이트하는 함수
}

const NewsDetailAISummary: React.FC<NewsDetailAISummaryProps> = ({ newsId, onTransferText }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleAIButtonClick = async () => {
    setShowSummary(!showSummary); // 버튼을 클릭할 때마다 상태를 토글

    // AI 요약 요청이 이미 있는 경우 다시 요청하지 않음
    if (!showSummary && summaryText === "") {
        setLoading(true); // 로딩 상태 시작
        try {
          const summary = await fetchNewsSummary(newsId); // API 요청
          // <br/> 태그를 줄바꿈으로 변환
          const formattedSummary = summary.replace(/<br\s*\/?>/gi, '\n');
          setSummaryText(formattedSummary); // 받아온 요약 데이터를 저장
        } catch (error) {
          console.error("뉴스 요약 요청 실패:", error);
          setSummaryText("요약을 가져오는 데 실패했습니다.");
        } finally {
          setLoading(false); // 로딩 상태 종료
        }
      }
  };

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
          {loading ? (
            <AISummaryText>요약을 가져오는 중...</AISummaryText> // 로딩 중 텍스트
          ) : (
            <>
              <AISummaryText>뉴스 본문을 자동으로 요약한 내용입니다.</AISummaryText>
              <AISummaryTextContainer>
                {summaryText.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                        <br />
                    </React.Fragment>
                ))}
              </AISummaryTextContainer>
              <TextTransferButton onClick={handleTextTransfer}>
                위의 텍스트로 보내기
              </TextTransferButton>
            </>
          )}
        </AISummaryBox>
      )}
    </div>
  );
};

export default NewsDetailAISummary;
