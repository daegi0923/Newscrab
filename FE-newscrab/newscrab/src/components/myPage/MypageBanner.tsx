import React from 'react';
import styled from 'styled-components';

interface MypageBannerProps {
  img: string | null;
  title: string;
}

const MypageBanner: React.FC<MypageBannerProps> = ({ img, title }) => {
  return (
    <CardContainer>
      {img && <CardImage src={img} alt={title} />}
      <Overlay />
      <Title>{title}</Title>
    </CardContainer>
  );
};

// 배경 이미지 스타일
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 반짝거리는 오버레이 효과
const Overlay = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 219, 112, 0.8) 45%,
    rgba(132, 50, 255, 0.6) 50%,
    transparent 54%
  );
  filter: brightness(1.2);
  mix-blend-mode: screen;
  background-size: 150% 150%;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

// 배너 위에 표시될 제목 스타일
const Title = styled.div`
  position: absolute;
  z-index: 20;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
`;

// 배경 이미지와 오버레이를 감싸는 컨테이너
const CardContainer = styled.div`
  background-color: #f0f0f0;
  position: relative;
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  &:hover ${Overlay} {
    opacity: 1;
  }
`;

export default MypageBanner;
