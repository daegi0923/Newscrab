import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ping from "@assets/ping/test1.png";

const BackgroundContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

const WhiteContainer = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 450px;
  text-align: center;
  font-family: "Paper";
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 20px;
  font-family: "Paper";
`;

const CharacterImage = styled.img`
  width: 190px;
  height: auto;
  // margin-bottom: 10px;
`;

const AnswerButton = styled.button`
  background-color: rgba(0, 123, 255, 0.1); /* 반투명 배경 */
  color: #007bff;
  border: 2px solid #007bff;
  width: 100%;
  padding: 15px;
  margin-top: 15px;
  border-radius: 10px;
  font-family: "Paper";
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 123, 255, 0.3); /* Hover 시 더 불투명하게 */
  }
`;

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div<{ filled: boolean }>`
  width: 40px;
  height: 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.filled ? "#007bff" : "#e0e0e0")};
  border-radius: 5px;
`;

const Test1: React.FC<{ onSelect: (answerIndex: number) => void }> = ({ onSelect }) => {
  const navigate = useNavigate();

  const handleAnswer = (answerIndex: number) => {
    onSelect(answerIndex);
    navigate("/test2");
  };

  return (
    <BackgroundContainer>
      <WhiteContainer>
        <ProgressBarContainer>
          {[...Array(6)].map((_, index) => (
            <ProgressBar key={index} filled={index < 1} />
          ))}
        </ProgressBarContainer>
        <Title>라면을 끓일 때 당신은?</Title>
        <CharacterImage src={ping} alt="Ping Character" />
        <AnswerButton onClick={() => handleAnswer(0)}>귀찮다 대충 다 넣자🙂</AnswerButton>
        <AnswerButton onClick={() => handleAnswer(1)}>물의 온도를 높이기 위해선 역시 스프 먼저!</AnswerButton>
        <AnswerButton onClick={() => handleAnswer(2)}>어쩌라고 면 먼저</AnswerButton>
      </WhiteContainer>
    </BackgroundContainer>
  );
};

export default Test1;
