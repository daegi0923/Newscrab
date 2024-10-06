import React from "react";
import styled from "styled-components";
import { Article } from "./dummyData";

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

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
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
              <StyledTd>{article.newsTitle}</StyledTd>
              <StyledTd>{article.industryId}</StyledTd>
              <StyledTd>{article.newsId}</StyledTd>
              <StyledTd style={{ color: "blue", cursor: "pointer" }}>
                {article.name}
              </StyledTd>
              <StyledTd>{article.likeCnt}</StyledTd>
              <StyledTd>{article.createdAt}</StyledTd>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default ArticleList;
