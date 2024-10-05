import React from "react";
import styled, { css } from "styled-components";

// 애니메이션 효과를 위한 CSS
const fadeAnimation = css`
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  &.active {
    opacity: 1;
  }
`;

// CarouselItem 스타일 컴포넌트
const CarouselItemWrapper = styled.div<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? "block" : "none")};
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  ${fadeAnimation}
`;

interface CarouselItemProps {
  isActive: boolean;
  children: React.ReactNode;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ isActive, children }) => {
  return (
    <CarouselItemWrapper
      className={isActive ? "active" : ""}
      isActive={isActive}
    >
      {children}
    </CarouselItemWrapper>
  );
};

export default CarouselItem;
