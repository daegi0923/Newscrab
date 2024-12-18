import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ping from "@assets/ping/test4.png"; // 캐릭터 이미지 import

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

const AnswerButton = styled.button`
  background-color: rgba(0, 123, 255, 0.1);
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
    background-color: rgba(0, 123, 255, 0.3);
  }
`;

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 20px;
  font-family: "Paper";
`;

const ProgressBar = styled.div<{ filled: boolean }>`
  width: 40px;
  height: 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.filled ? "#007bff" : "#e0e0e0")};
  border-radius: 5px;
`;

const CharacterImage = styled.img`
  width: 310px;
  height: auto;
  margin-bottom: 5px;
`;

const Test4: React.FC<{ onSelect: (answerIndex: number) => void }> = ({ onSelect }) => {
  const navigate = useNavigate();

  const handleAnswer = (answerIndex: number) => {
    onSelect(answerIndex);
    navigate("/test5");
  };

  return (
    <BackgroundContainer>
      <WhiteContainer>
        <ProgressBarContainer>
          {[...Array(6)].map((_, index) => (
            <ProgressBar key={index} filled={index < 4} />
          ))}
        </ProgressBarContainer>
        <CharacterImage src={ping} alt="Ping Character" />
        <Title>흑백요리사에 출연한다면 누구에게 심사받지?</Title>
        <AnswerButton onClick={() => handleAnswer(0)}>조보아씨 이거 한번 먹어봐유, 백종원</AnswerButton>
        <AnswerButton onClick={() => handleAnswer(1)}>저는 채소의 익힘을 중요시 하거덩여, 안성재</AnswerButton>
      </WhiteContainer>
    </BackgroundContainer>
  );
};

export default Test4;
