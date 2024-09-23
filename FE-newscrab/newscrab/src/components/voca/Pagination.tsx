import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background-color: transparent;
  color: ${(props) => (props.active ? "#333" : "#888")}; /* 해당 페이지는 진한 회색(#333), 나머지는 연한 회색(#888) */
  border: none;
  margin: 0 5px;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #333; /* 호버 시 텍스트 색상이 더 진한 회색 */
  }

  &:disabled {
    cursor: not-allowed;
    color: #ccc;
  }
`;

const ArrowButton = styled.button`
  background-color: #888;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, onPrevPage, onNextPage }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageButton
          key={i}
          onClick={() => onPageChange(i)}
          active={i === currentPage}
        >
          {i}
        </PageButton>
      );
    }
    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <ArrowButton onClick={onPrevPage} disabled={currentPage === 1}>
        &#9664;
      </ArrowButton>
      {renderPageNumbers()}
      <ArrowButton onClick={onNextPage} disabled={currentPage === totalPages}>
        &#9654;
      </ArrowButton>
    </PaginationContainer>
  );
};

export default Pagination;
