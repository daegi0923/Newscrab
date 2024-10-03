import React from "react";
import styled from "styled-components";
import Header from "@components/common/Header";
import Tab from "./Tab";
import RcmdSection from "./RcmdSection";
import RecentSection from "./RecentSection";
import HotSection from "./HotSection";

// 그리드 레이아웃 스타일
const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열을 균등하게 배치 */
  gap: 20px; /* 각 열 사이의 간격 */
  padding: 20px 50px;
`;

const MainNewsPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Tab />
      <NewsContainer>
        <RcmdSection />
        <RecentSection />
        <HotSection />
      </NewsContainer>
    </div>
  );
};

export default MainNewsPage;
