import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

// isActive를 transient prop으로 처리
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

// Pagination 컴포넌트에서 필요한 props 정의
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

  // api 연결하면 아래 주석 풀면될듯?

  // // 뉴스 갯수를 받아와 totalPages 값을 설정하는 함수
  // const fetchNews = async () => {
  //   try {
  //     const response = await fetch("/api/news"); // 실제 API 요청
  //     const data = await response.json();
  //     const newsCount = data.totalCount; // API 응답에서 뉴스 갯수 추출
  //     setTotalPages(Math.ceil(newsCount / 10)); // 페이지 수 계산 후 설정
  //   } catch (error) {
  //     console.error("Error fetching news:", error);
  //   }
  // };

  // // 컴포넌트가 처음 렌더링될 때 fetchNews 함수 실행
  // useEffect(() => {
  //   fetchNews();
  // }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨

  const handlePageClick = (page: number) => {
    onPageChange(page); // 클릭한 페이지를 부모 컴포넌트로 전달
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
    const startPage = pageGroup * pagesPerGroup + 1; // 현재 그룹의 첫 번째 페이지 번호
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages); // 현재 그룹의 마지막 페이지 번호
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageButton
          key={i}
          $isActive={i === currentPage} // $isActive로 변경하여 DOM에 전달되지 않도록 처리
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

// 모든 복잡한 페이지 계산 로직은 Pagination 내부에서 처리하고,
// 부모 컴포넌트는 단순히 현재 페이지와 총 페이지 수, 페이지 변경 함수만 제공하면 됩니다

// 사용법
/* <Pagination
  currentPage={currentPage} // 현재 페이지 전달
  totalPages={totalPages} // 총 페이지 수 전달
  onPageChange={handlePageChange} // 페이지 변경 핸들러: handleVocabPageChange 으로 바꿔서 단어장에서 사용하면될듯
/> */
