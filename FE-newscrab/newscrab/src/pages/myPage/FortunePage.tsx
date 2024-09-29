import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import closedCookie from '@assets/common/forcoo.png'; 
import openCookieImage from '@assets/common/forkie.png'; 

const shine = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
`;

// 종이가 날아오는 애니메이션
const flyIn = keyframes`
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: translateY(20px) rotate(10deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
`;

// 열릴 때 효과
const cookieAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.7) rotate(15deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f7f7;
`;

const FortuneCookieImage = styled(animated.img)`
  width: 200px;
  height: 200px;
  cursor: pointer;
  animation: ${shine} 3s infinite ease-in-out;
`;

const OpenedCookieImage = styled(animated.img)`
  width: 300px;
  height: 300px;
  animation: ${cookieAnimation} 1s forwards; 
`;

const MessagePaper = styled(animated.div)`
  width: 300px;
  background-color: #fff6e5;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #d1bebe;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin-top: 20px;
  animation: ${flyIn} 2s forwards;
`;

const ShineEffect = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: -150%;
    width: 300%;
    height: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: rotate(25deg);
    animation: shine 2s infinite ease-in-out;
  }
`;

const messages = [
  "111",
  "222",
  "333",
  "444",
  "555",
  "666",
  "777"
];

const FortuneCookie: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [fortuneMessage, setFortuneMessage] = useState<string | null>(null);

  const openCookie = () => {
    setIsOpened(true);
    setFortuneMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const cookieSpring = useSpring({
    transform: isOpened ? 'scale(0)' : 'scale(1)',
  });

  const openCookieSpring = useSpring({
    opacity: isOpened ? 1 : 0,
    transform: isOpened ? 'scale(1)' : 'scale(0)',
  });

  return (
    <PageContainer>
      {!isOpened && (
        <FortuneCookieImage
          style={cookieSpring}
          src={closedCookie} 
          alt="Closed Fortune Cookie"
          onClick={openCookie}
        />
      )}

      {isOpened && (
        <>
          <OpenedCookieImage
            style={openCookieSpring}
            src={openCookieImage}
            alt="Open Fortune Cookie"
          />
          
          {fortuneMessage && (
            <MessagePaper>
              {fortuneMessage}
            </MessagePaper>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default FortuneCookie;
