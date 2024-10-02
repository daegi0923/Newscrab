import React from "react";
import styled from "styled-components";
import Header from "@components/common/Header";
import Tab from "./Tab";

// 그리드 레이아웃 스타일
const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열을 균등하게 배치 */
  gap: 20px; /* 각 열 사이의 간격 */
  padding: 20px;
`;

const Section = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const NewsItem = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const MainNewsPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Tab />
      <NewsContainer>
        {/* 추천 뉴스 섹션 */}
        <Section>
          <SectionTitle>추천 뉴스</SectionTitle>
          <NewsItem>추천 뉴스 1</NewsItem>
          <NewsItem>추천 뉴스 2</NewsItem>
          <NewsItem>추천 뉴스 3</NewsItem>
        </Section>

        {/* 최신 뉴스 섹션 */}
        <Section>
          <SectionTitle>최신 뉴스</SectionTitle>
          <NewsItem>최신 뉴스 1</NewsItem>
          <NewsItem>최신 뉴스 2</NewsItem>
          <NewsItem>최신 뉴스 3</NewsItem>
        </Section>

        {/* 인기 뉴스 섹션 */}
        <Section>
          <SectionTitle>인기 뉴스</SectionTitle>
          <NewsItem>인기 뉴스 1</NewsItem>
          <NewsItem>인기 뉴스 2</NewsItem>
          <NewsItem>인기 뉴스 3</NewsItem>
        </Section>
      </NewsContainer>
    </div>
  );
};

export default MainNewsPage;
