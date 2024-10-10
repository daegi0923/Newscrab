import React, { useState } from "react";
import styled from "styled-components";
import { fetchPredQuestions } from "@apis/chatgpt/chatgpt";
import gifImage from "@assets/galaxy.gif";

// 버튼과 GIF를 묶는 div 스타일 정의 (가로로 정렬)
const AIButtonContainer = styled.div`
  display: flex;
  align-items: center;

`;

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

// GIF 이미지 스타일 정의
const GIFImage = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-left: 8px; /* 버튼과의 간격 */
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

// Close 버튼 스타일 정의 (우측 상단 X)
const CloseButtonStyled = styled.button`
  position: absolute;
  top: 12px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #333;
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

const AIQuestionLoadingText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  white-space: pre-wrap;
  display: inline-block;
  width: 100%; // 부모 요소 크기에 맞춤
  
  animation: blinkAnimation 1s step-start infinite;

  @keyframes blinkAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const AIQuestionText = styled.p`
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

interface NewsDetailAIQuestionProps {
    newsId: number; // 뉴스 ID 전달
    summaryText: string; // 요약 텍스트를 전달
    onTransferText: (text: string) => void; // opinionText를 업데이트하는 함수
  }

const stripHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>?/gm, ''); // 모든 HTML 태그를 제거
};

const NewsDetailAIQuestion: React.FC<NewsDetailAIQuestionProps> = ({ newsId, summaryText, onTransferText }) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionText, setQuestionText] = useState(""); // 예상 질문 저장
  const [loading, setLoading] = useState(false); // 로딩 상태 저장

  const handleAIButtonClick = async () => {
    setShowQuestion(!showQuestion); // 버튼 클릭 시 상태 토글

    // 이미 질문이 있으면 API 요청을 다시 하지 않음
    if (!showQuestion && questionText === "") {
      setLoading(true); // 로딩 시작
      try {
        const questions = await fetchPredQuestions({ text: summaryText, newsId }); // API 호출
        setQuestionText(questions); // 질문 저장
      } catch (error) {
        console.error("예상 질문 가져오기 실패:", error);
        setQuestionText("예상 질문을 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false); // 로딩 종료
      }
    }
  };

  const handleCloseQuestion = () => {
    setShowQuestion(false);
  };

  const handleTextTransfer = () => {
    onTransferText(questionText); // AI 예상 질문을 추가하는 함수 호출
  };

  return (
    <div>
      <AIButtonContainer>
        <AIButtonStyled onClick={handleAIButtonClick}>
          AI 예상질문
        </AIButtonStyled>
         <GIFImage src={gifImage} alt="loading" /> {/* GIF 추가 */}
      </AIButtonContainer>
      {showQuestion && (
        <AIQuestionBox>
          <CloseButtonStyled onClick={handleCloseQuestion}>X</CloseButtonStyled> 
          <AIQuestionHeader>AI 예상질문</AIQuestionHeader>
          {loading ? (
            <AIQuestionLoadingText>예상 질문을 가져오는 중...</AIQuestionLoadingText>
          ) : (
            <>
              <AIQuestionText>뉴스 본문을 바탕으로 자동 생성된 질문입니다.</AIQuestionText>
              <AIQuestionTextContainer>
                <AIQuestionText>{stripHtmlTags(questionText)}</AIQuestionText>
              </AIQuestionTextContainer>
              <TextTransferButton onClick={handleTextTransfer}>
                위의 텍스트로 보내기
              </TextTransferButton>
            </>
          )}
        </AIQuestionBox>
      )}
    </div>
  );
};

export default NewsDetailAIQuestion;
