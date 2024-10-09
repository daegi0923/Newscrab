import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getArticleData } from "@apis/article/articleApi"; // API 요청 함수 불러오기
import { ArticleItem } from "../../types/articleTypes"; // 실제 API 데이터 타입 불러오기

// Styled Components
const TableWrapper = styled.div`
  padding: 20px 50px;
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
`;

const StyledTd = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const StyledTr = styled.tr<{ isEven: boolean }>`
  background-color: ${(props) => (props.isEven ? "#f9f9f9" : "#fff")};
  text-align: left;
`;

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticleData();
        setArticles(data.data.articleList); // API 응답 데이터를 설정
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>뉴스 제목</StyledTh>
            <StyledTh>산업군</StyledTh>
            <StyledTh>뉴스 번호</StyledTh>
            <StyledTh>글쓴이</StyledTh>
            <StyledTh>👍</StyledTh>
            <StyledTh>작성일</StyledTh>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <StyledTr key={article.articleId} isEven={index % 2 === 0}>
              <StyledTd style={{ color: "blue", cursor: "pointer" }}>
                {article.scrapResponseDto.newsTitle}
              </StyledTd>
              <StyledTd>{article.scrapResponseDto.industryId}</StyledTd>
              <StyledTd style={{ color: "blue", cursor: "pointer" }}>
                {article.scrapResponseDto.newsId}
              </StyledTd>
              <StyledTd>{article.name}</StyledTd>
              <StyledTd>{article.likeCnt}</StyledTd>
              <StyledTd>{article.scrapResponseDto.createdAt}</StyledTd>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default ArticleList;
