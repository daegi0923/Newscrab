import React from "react";
import styled from "styled-components";

// 스타일드 컴포넌트 정의
const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10; /* 캐러셀 위에 표시되도록 설정 */
`;

const PaginationButton = styled.button<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 10px 0;
  padding: 0px;
  background-color: ${(props) => (props.active ? "black" : "white")};
  border: none;
  cursor: pointer;
  z-index: 11; /* 캐러셀 위에 표시되도록 설정 */
`;

interface ButtonPaginationProps {
  activePage: number;
  onPageChange: (pageNumber: number) => void;
  totalPages: number;
}

const ButtonPagination: React.FC<ButtonPaginationProps> = ({
  activePage,
  onPageChange,
  totalPages,
}) => {
  return (
    <PaginationContainer>
      {[...Array(totalPages)].map((_, index) => (
        <PaginationButton
          key={index + 1}
          active={activePage === index + 1}
          onClick={() => onPageChange(index + 1)}
        />
      ))}
    </PaginationContainer>
  );
};

export default ButtonPagination;
