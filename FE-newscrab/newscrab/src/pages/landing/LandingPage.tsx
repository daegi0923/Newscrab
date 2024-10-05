import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Carousel1 from "./Carousel1";
import Carousel2 from "./Carousel2";
import Carousel3 from "./Carousel3";
import Carousel4 from "./Carousel4";
import ButtonPagination from "./ButtonPagination";

// CarouselItem 스타일 컴포넌트
const CarouselItemWrapper = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  z-index: ${(props) => (props.isActive ? 1 : 0)};
`;

interface CarouselItemProps {
  isActive: boolean;
  children: React.ReactNode;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ isActive, children }) => {
  return (
    <CarouselItemWrapper isActive={isActive}>{children}</CarouselItemWrapper>
  );
};

const LandingPage: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const totalPages = 4; // 총 캐러셀 페이지 수

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setActivePage(pageNumber);
    }
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        handlePageChange(activePage === totalPages ? 1 : activePage + 1);
      } else {
        handlePageChange(activePage === 1 ? totalPages : activePage - 1);
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [activePage]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* 페이지네이션 컴포넌트 */}
      <ButtonPagination
        activePage={activePage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />

      {/* 캐러셀 페이지 */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <CarouselItem isActive={activePage === 1}>
          <Carousel1 />
        </CarouselItem>
        <CarouselItem isActive={activePage === 2}>
          <Carousel2 />
        </CarouselItem>
        <CarouselItem isActive={activePage === 3}>
          <Carousel3 />
        </CarouselItem>
        <CarouselItem isActive={activePage === 4}>
          <Carousel4 />
        </CarouselItem>
      </div>
    </div>
  );
};

export default LandingPage;
