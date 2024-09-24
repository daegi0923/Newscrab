import React, { useEffect, useState, useCallback } from "react";
import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";
import Pagination from "@components/common/Pagination";
import { NewsItem } from "../../types/newsTypes";
import { getNewsData } from "@apis/news/newsApi";
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
  const [hasPageLoaded, setHasPageLoaded] = useState(false); // 페이지 로드 여부 확인

  // 뉴스 데이터를 API에서 가져오는 비동기 함수
  const fetchNewsData = async (page: number) => {
    const mockData = await getNewsData(page);
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

  // 페이지가 처음 로드되었을 때 드롭다운을 자동으로 열기 위해 useEffect 사용
  useEffect(() => {
    if (!hasPageLoaded) {
      setIsDropdownOpen(true); // 페이지가 로드될 때 드롭다운 열기
      setHasPageLoaded(true); // 한번만 로드하도록 상태 업데이트
    }
  }, [hasPageLoaded]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 필터 탭 클릭 핸들러
  const handleFilterTabClick = useCallback(() => {
    // 페이지가 로드되지 않았으면 드롭다운을 열고 로드되었다고 표시
    if (!hasPageLoaded) {
      setHasPageLoaded(true);
    } else {
      setIsDropdownOpen((prev) => !prev); // 드롭다운 토글
    }
  }, [hasPageLoaded]);

  // 산업 선택 핸들러
  const handleIndustrySelect = useCallback((industryId: number) => {
    const selected =
      industry.find((ind) => ind.industryId === industryId)?.industryName ||
      "전체";
    setSelectedIndustry(selected);
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
  }, []);

  // 페이지 아무 곳이나 클릭 시 드롭다운 닫기 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown")) {
        // 드롭다운 외부 클릭 시
        setIsDropdownOpen(false); // 드롭다운 닫기
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

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
