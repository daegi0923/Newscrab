import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PingContainer = styled.div`
  margin-right: 3%;
  border: 1px solid black;
  width: 45%;
`;

const Ping: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/testpage');
  };

  return (
    <PingContainer onClick={handleClick}>
      <h3>당신의 취준핑은?</h3>

    </PingContainer>
  );
};

export default Ping;
