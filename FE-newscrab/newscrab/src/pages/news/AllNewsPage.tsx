import React, { useEffect, useState, useCallback } from "react";
import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";
import Pagination from "@components/common/Pagination";
import DropDown from "@components/common/DropDown";
import { NewsItem } from "../../types/newsTypes";
import { getNewsData } from "@apis/news/newsApi";
import { industry } from "@common/Industry";
import NewsList from "./common/NewsList";

const AllNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [filteredNewsList, setFilteredNewsList] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 추가

  // 뉴스 데이터를 API에서 가져오는 비동기 함수
  const fetchNewsData = async (page: number) => {
    const mockData = await getNewsData(page);
    setNewsList(mockData.news);
    setTotalPages(mockData.totalPages);
  };

  // 필터링된 뉴스 리스트 업데이트 함수
  const updateFilteredNews = useCallback(() => {
    if (selectedIndustry === "전체") {
      setFilteredNewsList(newsList);
    } else {
      const filtered = newsList.filter(
        (news) =>
          news.industryId ===
          industry.find((ind) => ind.industryName === selectedIndustry)
            ?.industryId
      );
      setFilteredNewsList(filtered);
    }
  }, [selectedIndustry, newsList]);

  useEffect(() => {
    fetchNewsData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    updateFilteredNews();
  }, [selectedIndustry, newsList, updateFilteredNews]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 드롭다운 토글 함수
  const handleFilterTabClick = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
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
      <GlobalStyle />
      <NewsCommon
        showFilter={true}
        selectedIndustry={selectedIndustry}
        isDropdownOpen={isDropdownOpen}
        onFilterTabClick={handleFilterTabClick}
        onIndustrySelect={handleIndustrySelect}
      />
      {isDropdownOpen && (
        <DropDown
          dropdownIndustries={industry}
          handleIndustrySelect={handleIndustrySelect}
        />
      )}
      <NewsList newsList={filteredNewsList} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllNewsPage;
