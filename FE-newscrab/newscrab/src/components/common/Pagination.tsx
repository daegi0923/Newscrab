import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PageButton = styled.button<{ $isActive?: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.$isActive ? "#000" : "#888")};
  font-size: 16px;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
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

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesPerGroup = 5; // 한 그룹에 표시할 페이지 수
  const pageGroup = Math.floor((currentPage - 1) / pagesPerGroup); // 현재 페이지 그룹 계산

  const handlePageClick = (page: number) => {
    onPageChange(page); // 클릭한 페이지로 이동
  };

  const handlePrevGroup = () => {
    const prevGroupPage = (pageGroup - 1) * pagesPerGroup + 1;
    onPageChange(prevGroupPage); // 이전 그룹의 첫 번째 페이지로 이동
  };

  const handleNextGroup = () => {
    const nextGroupPage = (pageGroup + 1) * pagesPerGroup + 1;
    onPageChange(nextGroupPage); // 다음 그룹의 첫 번째 페이지로 이동
  };

  const renderPageNumbers = () => {
    const startPage = pageGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageButton
          key={i}
          $isActive={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </PageButton>
      );
    }
    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <ArrowButton
        direction="left"
        disabled={pageGroup === 0}
        onClick={handlePrevGroup}
      >
        <Arrow direction="left" />
      </ArrowButton>
      {renderPageNumbers()}
      <ArrowButton
        direction="right"
        disabled={pageGroup === Math.floor((totalPages - 1) / pagesPerGroup)}
        onClick={handleNextGroup}
      >
        <Arrow direction="right" />
      </ArrowButton>
    </PaginationContainer>
  );
};

export default Pagination;
