import React, { useState, useEffect } from "react";
import Header from "@common/Header";
import SearchBar from "./SearchBar";
import ArticleList from "./ArticleList"; // ArticleList 컴포넌트는 articles 배열을 props로 받음
import { dummyData, Article } from "./dummyData";
import styled from "styled-components";

const CenteredSearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(dummyData); // 초기 데이터 설정
    setFilteredArticles(dummyData); // 필터링된 데이터를 초기에는 전체 데이터로 설정
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
            article.name.includes(searchTerm) ||
            article.industryId.includes(searchTerm)
          );
        } else if (searchType === "뉴스제목") {
          return article.newsTitle.includes(searchTerm);
        } else if (searchType === "뉴스번호") {
          return article.newsId.includes(searchTerm);
        } else if (searchType === "작성자") {
          return article.name.includes(searchTerm);
        } else if (searchType === "산업군") {
          return article.industryId.includes(searchTerm);
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
        <SearchBar onSearch={handleSearch} />
      </CenteredSearchBar>
      <ArticleList articles={filteredArticles} />{" "}
      {/* 필터링된 기사 목록 전달 */}
    </>
  );
};

export default ArticlePage;
