import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MypageBanner from '@components/myPage/MypageBanner';

const FortuneContainer = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  width: 45%;
  cursor: pointer;
`;
const FortuneUpper = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  width: 45%;
  cursor: pointer;
`;

const styles = {
  fortuneUpper: {},
  fortuneLower: {},
};

const Fortune: React.FC = () => {
  const navigate = useNavigate();

  const handleFortune = () => {
    console.log('Navigating to fortune page');
    navigate('/fortune');
  };

  return (
    <FortuneContainer>
      <MypageBanner img={''} title='오늘의 포춘쿠키🍪'>
      </MypageBanner>
    </FortuneContainer>
  );
};

export default Fortune;
