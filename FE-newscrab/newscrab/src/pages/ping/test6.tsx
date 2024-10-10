import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ping from "@assets/ping/기름핑.png"; 

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

const ProgressBar = styled.div<{ filled: boolean }>`
  width: 40px;
  height: 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.filled ? "#007bff" : "#e0e0e0")};
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 20px;
  font-family: "Paper";
`;

const CharacterImage = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

const industryMapping: { [key: number]: { [key: number]: string[] } } = {
  0: {
    0: ['금융', '석유화학', '철강', '정유'], // 대충 다 넣음
    1: ['IT', '디스플레이', '바이오헬스', '섬유', '가전'], // 스프 먼저
    2: ['정보통신기기', '반도체', '이차전지', '자동차', '조선', '일반기계'], // 면 먼저
  },
  1: {
    0: ['정유', '철강', '석유화학', '반도체'], // 자극적인 음식
    1: ['IT', '디스플레이', '정보통신기기', '바이오헬스'], // SNS
    2: ['금융', '섬유', '석유화학', '정유'], // 잠
    3: ['자동차', '가전', '조선', '일반기계', '이차전지'] // 운동
  },
  2: {
    0: ['금융', '철강', '정유', '가전', '정보통신기기', '석유화학', '자동차', '조선'], // 치킨
    1: ['IT', '바이오헬스', '섬유', '디스플레이', '이차전지', '반도체', '일반기계'] // 신메뉴 도전
  },
  3: {
    0: ['가전', '정보통신기기', '조선', '자동차', '정유', 'IT', '금융'], // 백종원
    1: ['반도체', '바이오헬스', '철강', '석유화학', '이차전지', '섬유', '디스플레이', '일반기계'] // 안성재
  },
  4: {
    0: ['자동차', '정보통신기기', '반도체', '이차전지', 'IT'], // 빠른 전개
    1: ['철강', '석유화학', '정유', '반도체', '금융'], // 스킵 안 함
    2: ['금융', '석유화학', '바이오헬스', '섬유'], // 해석 영상까지 다 봄
    3: ['가전', '디스플레이', '조선', '일반기계', '섬유'] // 중간에 멈춤
  },
  5: {
    0: ['IT', '바이오헬스', '반도체', '이차전지', '디스플레이', '가전', '섬유'], // 집에서
    1: ['금융', '철강', '석유화학', '정유', '조선', '정보통신기기', '자동차', '일반기계'] // 사무실
  }
};

const allIndustries = ['금융', '석유화학', '철강', '정유', 'IT', '디스플레이', '바이오헬스', '섬유', '정보통신기기', '반도체', '이차전지', '자동차', '가전', '조선', '일반기계'];

const Test6: React.FC<{ onSelect: (answerIndex: number) => void, answers: number[] }> = ({ onSelect, answers }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!answers.includes(-1)) {
      calculateResult(answers);
    }
  }, [answers]);

  const handleAnswer = (answerIndex: number) => {
    onSelect(answerIndex);
  };

  const calculateResult = (userAnswers: number[]) => {
    const industryScores: { [key: string]: number } = {};

    // 기본 1점
    allIndustries.forEach((industry) => {
      industryScores[industry] = 1;
    });

    // 가중치
    userAnswers.forEach((answer, questionIndex) => {
      const selectedIndustries = industryMapping[questionIndex][answer];
      const weight = getWeightForQuestion(questionIndex); // 각 질문에 대한 가중치 적용
      selectedIndustries.forEach((industry) => {
        industryScores[industry] += weight;
      });
    });

    // 가장 높은 점수
    const bestIndustry = Object.keys(industryScores).reduce((a, b) =>
      industryScores[a] > industryScores[b] ? a : b
    );

    console.log("Final Result: ", bestIndustry);
    navigate(getResultPageForIndustry(bestIndustry));
  };

  const getWeightForQuestion = (questionIndex: number) => {
    switch (questionIndex) {
      case 0: return 3; // 1
      case 2: return 2; // 3
      case 3: return 2; // 4
      case 5: return 3; // 6
      default: return 1; // 나머지
    }
  };

  const getResultPageForIndustry = (industry: string) => {
    switch (industry) {
      case '철강': return '/ping1';
      case '석유화학': return '/ping2';
      case 'IT': return '/ping3';
      case '금융': return '/ping4';
      case '가전': return '/ping5';
      case '정보통신기기': return '/ping6';
      case '일반기계': return '/ping7';
      case '조선': return '/ping8';
      case '정유': return '/ping9';
      case '자동차': return '/ping10';
      case '디스플레이': return '/ping11';
      case '바이오헬스': return '/ping12';
      case '반도체': return '/ping13';
      case '이차전지': return '/ping14';
      case '섬유': return '/ping15';
      default: return '/ping1';
    }
  };

  return (
    <BackgroundContainer>
      <WhiteContainer>
        <ProgressBarContainer>
          {[...Array(6)].map((_, index) => (
            <ProgressBar key={index} filled={index < 6} />
          ))}
        </ProgressBarContainer>
        <CharacterImage src={ping} alt="Ping Character" />
        <Title>당신이 선호하는 근무 환경은?</Title>
        <AnswerButton onClick={() => handleAnswer(0)}>집에서</AnswerButton>
        <AnswerButton onClick={() => handleAnswer(1)}>사무실에서</AnswerButton>
      </WhiteContainer>
    </BackgroundContainer>
  );
};

export default Test6;
