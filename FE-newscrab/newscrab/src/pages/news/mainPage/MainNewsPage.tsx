import React from "react";
import styled from "styled-components";
import Header from "@components/common/Header";
import Tab from "./Tab";
import RcmdSection from "./RcmdSection"; // RcmdSection 컴포넌트 import

// 그리드 레이아웃 스타일
const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열을 균등하게 배치 */
  gap: 20px; /* 각 열 사이의 간격 */
  padding: 20px 50px;
`;

const RecentSection = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
`;

const HotSection = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
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
        <RcmdSection />

        {/* 최신 뉴스 섹션 */}
        <RecentSection>
          <NewsItem>최신 뉴스 1</NewsItem>
          <NewsItem>최신 뉴스 2</NewsItem>
          <NewsItem>최신 뉴스 3</NewsItem>
        </RecentSection>

        {/* 인기 뉴스 섹션 */}
        <HotSection>
          <NewsItem>인기 뉴스 1</NewsItem>
          <NewsItem>인기 뉴스 2</NewsItem>
          <NewsItem>인기 뉴스 3</NewsItem>
        </HotSection>
      </NewsContainer>
    </div>
  );
};

export default MainNewsPage;
