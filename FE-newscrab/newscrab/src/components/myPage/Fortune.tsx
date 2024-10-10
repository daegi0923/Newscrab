import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MypageBanner from '@components/myPage/MypageBanner';

const FortuneContainer = styled.div`
  border-radius: 20px;
  width: 45%;
  cursor: pointer;
`;



const Fortune: React.FC = () => {
  const navigate = useNavigate();

  const handleFortune = () => {
    console.log('Navigating to fortune page');
    navigate('/fortune');
  };

  return (
    <FortuneContainer onClick={handleFortune}>
      <MypageBanner img={'movingCookie.gif'} title='오늘의 포춘쿠키🍪' color='#BDD6E6'>
      </MypageBanner>
    </FortuneContainer>
  );
};

export default Fortune;
