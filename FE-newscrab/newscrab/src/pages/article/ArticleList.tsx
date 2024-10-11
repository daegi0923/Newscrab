import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가
import { ArticleItem } from "../../types/articleTypes";
import { industry } from "@common/Industry";

const TableWrapper = styled.div`
  padding: 20px 50px;
  padding-top: 0px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  text-align: left;
  cursor: pointer; /* 정렬 가능하게 클릭할 수 있도록 변경 */
`;

const StyledTd = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const StyledTr = styled.tr<{ $isEven: boolean }>`
  background-color: ${(props) => (props.$isEven ? "#f9f9f9" : "#fff")};
  text-align: left;
`;

const getIndustryNameById = (id: number): string => {
  const matchedIndustry = industry.find((item) => item.industryId === id);
  return matchedIndustry ? matchedIndustry.industryName : "Unknown Industry";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

interface ArticleListProps {
  articles: ArticleItem[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const navigate = useNavigate(); // useNavigate 훅 추가
  const [likeSort, setLikeSort] = useState<boolean>(false); // 좋아요 정렬 상태 관리
  const [searchQuery] = useState<string>(""); // 검색어 상태 추가
  const [filteredArticles, setFilteredArticles] =
    useState<ArticleItem[]>(articles);

  useEffect(() => {
    // 검색어를 기준으로 게시글 필터링
    const filtered = articles.filter((article) =>
      article.scrapResponseDto.newsTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [searchQuery, articles]);

  // 좋아요 순서로 정렬하거나 원래 순서로 돌리는 함수
  const toggleLikeSort = () => {
    if (likeSort) {
      // 원래 순서로 돌리기 (초기 articles 배열)
      setFilteredArticles(articles);
    } else {
      // likeCnt 높은 순으로 정렬
      const sorted = [...filteredArticles].sort(
        (a, b) => b.likeCnt - a.likeCnt
      );
      setFilteredArticles(sorted);
    }
    setLikeSort(!likeSort); // 토글 상태 변경
  };

  const handleArticleClick = (articleId: number) => {
    navigate(`/article/${articleId}`); // 클릭 시 해당 articleId로 이동
  };

  const handleNewsClick = (newsId: number) => {
    navigate(`/news/${newsId}`); // 뉴스 번호 클릭 시 해당 newsId로 이동
  };

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>뉴스 제목</StyledTh>
            <StyledTh>산업군</StyledTh>
            <StyledTh>뉴스 번호</StyledTh>
            <StyledTh>글쓴이</StyledTh>
            <StyledTh onClick={toggleLikeSort} style={{ paddingRight: "0px" }}>
              👍 {likeSort ? "⏷" : "⏵"}
            </StyledTh>
            <StyledTh>작성일</StyledTh>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((article, index) => (
            <StyledTr key={article.articleId} $isEven={index % 2 === 0}>
              <StyledTd
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => handleArticleClick(article.articleId)} // 기사 제목 클릭
              >
                {article.scrapResponseDto.newsTitle}
              </StyledTd>
              <StyledTd>
                {getIndustryNameById(article.scrapResponseDto.industryId)}
              </StyledTd>
              <StyledTd
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => handleNewsClick(article.scrapResponseDto.newsId)} // 뉴스 번호 클릭
              >
                {article.scrapResponseDto.newsId}
              </StyledTd>
              <StyledTd>{article.name}</StyledTd>
              <StyledTd>{article.likeCnt}</StyledTd>
              <StyledTd>
                {formatDate(article.scrapResponseDto.createdAt)}
              </StyledTd>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default ArticleList;
