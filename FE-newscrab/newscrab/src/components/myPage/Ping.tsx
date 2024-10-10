import React from 'react';
import styled from 'styled-components';
import MypageBanner from '@components/myPage/MypageBanner';

// import { useNavigate } from 'react-router-dom';

const PingContainer = styled.div`
  margin-right: 3%;
  width: 45%;
`;

const Ping: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/testpage');
  };

  return (
    <PingContainer>
      <MypageBanner img={'movingPing.gif'} title='당신의 취준핑은?' color='#F898C2'>
      </MypageBanner>

    </PingContainer>
  );
};

export default Ping;
