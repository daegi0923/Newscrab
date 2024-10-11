import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ping from "@assets/ping/test5.png";

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
  width: 250px;
  height: auto;
  margin-bottom: 5px;
`;

const Test5: React.FC<{ onSelect: (answerIndex: number) => void }> = ({ onSelect }) => {
  const navigate = useNavigate();

  const handleAnswer = (answerIndex: number) => {
    onSelect(answerIndex);
    navigate("/test6");
  };

  return (
    <BackgroundContainer>
      <WhiteContainer>
        <ProgressBarContainer>
          {[...Array(6)].map((_, index) => (
            <ProgressBar key={index} filled={index < 5} />
          ))}
        </ProgressBarContainer>
        <CharacterImage src={ping} alt="Ping Character" />
        <Title>영화를 볼 때 나의 스타일은?</Title>
        <AnswerButton onClick={() => handleAnswer(0)}>빨리빨리 진행돼야 몰입 가능! 🏃‍♂️</AnswerButton>
        <AnswerButton onClick={() => handleAnswer(1)}>스킵? 그런 거 없음 ⛔</AnswerButton>
        <AnswerButton onClick={() => handleAnswer(2)}>해석 영상까지 풀코스로 봐줘야 😎</AnswerButton>
        <AnswerButton onClick={() => handleAnswer(3)}>한 번에 못 보고 자꾸 끊긴다... 근데 괜찮음. 🙃</AnswerButton>
      </WhiteContainer>
    </BackgroundContainer>
  );
};

export default Test5;
