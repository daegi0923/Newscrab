import React, { useEffect, useState, useCallback } from "react";
import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";
import Pagination from "@components/common/Pagination";
import { NewsItem } from "../../types/newsTypes";
import { getMockNews } from "@apis/newsApi";
import { industry } from "@common/Industry";
import NewsList from "./common/NewsList";

const FilterNewsPage: React.FC = () => {
  // 상태 관리
  const [newsList, setNewsList] = useState<NewsItem[]>([]); // 전체 뉴스 목록
  const [filteredNewsList, setFilteredNewsList] = useState<NewsItem[]>([]); // 필터링된 뉴스 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [selectedIndustry, setSelectedIndustry] = useState<string>("전체"); // 선택된 산업
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림 여부

  // 뉴스 데이터를 API에서 가져오는 비동기 함수
  const fetchNewsData = async (page: number) => {
    const mockData = await getMockNews(page);
    setNewsList(mockData.news);
    setTotalPages(mockData.totalPages);
  };

  // 필터링된 뉴스 리스트 업데이트 함수
  const updateFilteredNews = useCallback(() => {
    if (selectedIndustry === "전체") {
      setFilteredNewsList(newsList); // 전체 선택 시 모든 뉴스 표시
    } else {
      // 선택된 산업에 해당하는 뉴스만 필터링
      const filtered = newsList.filter(
        (news) =>
          news.industryId ===
          industry.find((ind) => ind.industryName === selectedIndustry)
            ?.industryId
      );
      setFilteredNewsList(filtered);
    }
  }, [selectedIndustry, newsList]);

  // 페이지 변경 시 뉴스 데이터 가져오기
  useEffect(() => {
    fetchNewsData(currentPage);
  }, [currentPage]);

  // 선택된 산업 또는 뉴스 목록 변경 시 필터링 수행
  useEffect(() => {
    updateFilteredNews();
  }, [selectedIndustry, newsList, updateFilteredNews]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 필터 탭 클릭 핸들러
  const handleFilterTabClick = useCallback(() => {
    setIsDropdownOpen((prev) => !prev); // 드롭다운 토글
  }, []);

  // 산업 선택 핸들러
  const handleIndustrySelect = useCallback((industryId: number) => {
    const selected =
      industry.find((ind) => ind.industryId === industryId)?.industryName ||
      "전체";
    setSelectedIndustry(selected);
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
  }, []);

  return (
    <div>
      <GlobalStyle /> {/* 전역 스타일 적용 */}
      <NewsCommon
        showFilter={true}
        selectedIndustry={selectedIndustry}
        isDropdownOpen={isDropdownOpen}
        onFilterTabClick={handleFilterTabClick}
        onIndustrySelect={handleIndustrySelect}
      />
      <NewsList newsList={filteredNewsList} /> {/* 필터링된 뉴스 목록 표시 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FilterNewsPage;
