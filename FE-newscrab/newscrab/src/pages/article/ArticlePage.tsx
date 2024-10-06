import React, { useState, useEffect } from "react";
import Header from "@common/Header";
import SearchBar from "./SearchBar"; // SearchBar 컴포넌트 불러오기
import ArticleList from "./ArticleList"; // 수정된 ArticleList 컴포넌트
import { dummyData, Article } from "./dummyData";
import styled from "styled-components";

// 중앙 정렬을 위한 Styled Component
const CenteredSearchBar = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  margin: 20px 0; /* 위아래 간격 */
`;

const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(dummyData); // 처음에 더미 데이터를 불러옴
    setFilteredArticles(dummyData); // 필터링된 데이터를 전체 데이터로 설정
  }, []);

  const handleSearch = (searchType: string, searchTerm: string) => {
    if (searchTerm === "") {
      setFilteredArticles(articles); // 검색어가 없으면 전체 데이터 표시
    } else {
      const filtered = articles.filter((article) => {
        if (searchType === "전체") {
          return (
            article.newsTitle.includes(searchTerm) ||
            article.newsId.includes(searchTerm) ||
            article.name.includes(searchTerm)
          );
        } else if (searchType === "뉴스제목") {
          return article.newsTitle.includes(searchTerm);
        } else if (searchType === "뉴스번호") {
          return article.newsId.includes(searchTerm);
        } else if (searchType === "작성자") {
          return article.name.includes(searchTerm);
        }
        return false;
      });
      setFilteredArticles(filtered);
    }
  };

  return (
    <>
      <Header />
      <CenteredSearchBar>
        <SearchBar onSearch={handleSearch} /> {/* 검색바가 가운데로 정렬 */}
      </CenteredSearchBar>
      <ArticleList articles={filteredArticles} /> {/* 필터링된 데이터 전달 */}
    </>
  );
};

export default ArticlePage;
