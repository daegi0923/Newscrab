import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.isActive ? "#000" : "#888")};
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ArrowButton = styled.button<{ direction: "left" | "right" }>`
  width: 32px;
  height: 32px;
  background-color: #7a7a7a;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 10px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
`;

const Arrow = styled.div<{ direction: "left" | "right" }>`
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-${(props) =>
    props.direction === "left" ? "right" : "left"}: 9px solid #666;
`;

const Pagination: React.FC = () => {
  const totalPages = 5; // 예시로 5페이지로 설정
  const currentPage = 3; // 예시로 현재 페이지를 3으로 설정

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageButton key={i} isActive={i === currentPage}>
          {i}
        </PageButton>
      );
    }
    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <ArrowButton direction="left" disabled={currentPage === 1}>
        <Arrow direction="left" />
      </ArrowButton>
      {renderPageNumbers()}
      <ArrowButton direction="right" disabled={currentPage === totalPages}>
        <Arrow direction="right" />
      </ArrowButton>
    </PaginationContainer>
  );
};

export default Pagination;
