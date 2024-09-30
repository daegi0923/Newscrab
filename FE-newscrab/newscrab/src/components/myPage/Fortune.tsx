import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FortuneContainer = styled.div`
  border: 1px solid black;
  width: 45%;
  cursor: pointer;
`;

const Fortune: React.FC = () => {
  const navigate = useNavigate();

  const handleFortune = () => {
    console.log('Navigating to fortune page');
    navigate('/fortune');
  }

  return (
    <FortuneContainer>
      <h3 onClick={handleFortune}>오늘의 포춘쿠키🍪</h3>
    </FortuneContainer>
  );
};

export default Fortune;
