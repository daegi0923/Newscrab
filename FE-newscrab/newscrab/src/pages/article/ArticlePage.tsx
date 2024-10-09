import React, { useState, useEffect } from "react";
import Header from "@common/Header";
import SearchBar from "./SearchBar";
import ArticleList from "./ArticleList"; // ArticleList는 articles를 props로 받음
import { getArticleData } from "@apis/article/articleApi"; // API 요청 함수
import { ArticleItem, ArticleData } from "../../types/articleTypes"; // 실제 API 데이터 타입
import styled from "styled-components";
import { industry } from "@common/Industry"; // 산업군 데이터를 import

const CenteredSearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const TotalArticles = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-left: 55px;
  margi-bottom: 0px;

  span {
    color: blue; /* 숫자에 파란색 적용 */
  }
`;

const getIndustryNameById = (id: number): string => {
  const matchedIndustry = industry.find((item) => item.industryId === id);
  return matchedIndustry ? matchedIndustry.industryName : "Unknown Industry";
};

const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); // totalItems 상태 추가
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data: ArticleData = await getArticleData();
        setArticles(data.data.articleList); // API에서 받은 데이터를 상태로 설정
        setFilteredArticles(data.data.articleList); // 필터링된 데이터 설정
        setTotalItems(data.data.totalItems); // totalItems 값 설정
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = (searchType: string, searchTerm: string) => {
    if (searchTerm === "") {
      setFilteredArticles(articles); // 검색어가 없을 때 전체 데이터 표시
    } else {
      const filtered = articles.filter((article) => {
        if (searchType === "전체") {
          return (
            article.scrapResponseDto.newsTitle.includes(searchTerm) ||
            article.scrapResponseDto.newsId.toString().includes(searchTerm) ||
            article.name.includes(searchTerm) ||
            getIndustryNameById(article.scrapResponseDto.industryId).includes(
              searchTerm
            ) // industryName으로 검색
          );
        } else if (searchType === "뉴스제목") {
          return article.scrapResponseDto.newsTitle.includes(searchTerm);
        } else if (searchType === "뉴스번호") {
          return article.scrapResponseDto.newsId
            .toString()
            .includes(searchTerm);
        } else if (searchType === "작성자") {
          return article.name.includes(searchTerm);
        } else if (searchType === "산업군") {
          return getIndustryNameById(
            article.scrapResponseDto.industryId
          ).includes(searchTerm); // industryName으로 필터링
        }
        return false;
      });
      setFilteredArticles(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <CenteredSearchBar>
        <SearchBar onSearch={handleSearch} />
      </CenteredSearchBar>
      <TotalArticles>
        총 <span>{totalItems}</span>건의 글이 있습니다.
      </TotalArticles>
      <ArticleList articles={filteredArticles} /> {/* 데이터를 props로 전달 */}
    </>
  );
};

export default ArticlePage;
