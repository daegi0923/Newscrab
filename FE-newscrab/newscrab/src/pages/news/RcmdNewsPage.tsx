import React, { useEffect, useState } from "react";
import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";
import Pagination from "@components/common/Pagination";
import { NewsItem } from "../../types/newsTypes";
import { getMockNews } from "@apis/newsApi";
import NewsList from "./common/NewsList";

const RcmdNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNewsData = async (page: number) => {
    const mockData = await getMockNews(page);
    setNewsList(mockData.news);
    setTotalPages(mockData.totalPages);
  };

  useEffect(() => {
    fetchNewsData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <GlobalStyle />
      <NewsCommon
        showFilter={false}
        selectedIndustry="전체"
        isDropdownOpen={false}
        onFilterTabClick={() => {}}
        onIndustrySelect={() => {}}
      />
      <NewsList newsList={newsList} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RcmdNewsPage;
