import React, { useEffect, useState } from "react";
import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";
import Pagination from "@components/common/Pagination";
import NewsList from "./common/NewsList";

import { getMockNews } from "@apis/newsApi"; // getMockNews 함수 import
import { NewsItem, MockData } from "../../types/newsTypes"; // newsTypes.ts에서 타입 import

const ScrapCountNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNewsData = async (page: number) => {
    const mockData: MockData = await getMockNews(page);

    // 스크랩 횟수(scrapCount) 순으로 정렬
    const sortedNews = mockData.news.sort(
      (a, b) => b.newsContent - a.newsContent
    );

    setNewsList(sortedNews);
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
      <NewsCommon />
      <NewsList newsList={newsList} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ScrapCountNewsPage;
