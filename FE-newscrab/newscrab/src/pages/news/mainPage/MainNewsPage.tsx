import React from "react";
import styled from "styled-components";
import Header from "@components/common/Header";
import RcmdSection from "./RcmdSection";
import RecentSection from "./RecentSection";
import HotSection from "./HotSection";
import Hot from "@assets/hot.png";
import All from "@assets/all.png";
import { useNavigate } from "react-router-dom";

// 그리드 레이아웃 스타일
const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열을 균등하게 배치 */
  gap: 20px; /* 각 열 사이의 간격 */
  padding: 10px 50px;
`;

// 각 섹션에 맞는 스타일
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabItem = styled.h1`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 15px;
  color: #666;
  margin: 0px;
  margin-bottom: 30px;
  font-family: "Paper";

  &:hover {
    color: #ffbe98; /* 마우스 오버 시 색상 변화 */
  }
`;

const AllIcon = styled.img`
  width: 30px; /* All 아이콘 크기 */
  height: 30px;
  margin-right: 8px; /* 아이콘과 텍스트 사이 간격 */
`;

const HotIcon = styled.img`
  width: 23.34px; /* Hot 아이콘 크기 */
  height: 30px;
  margin-right: 8px; /* 아이콘과 텍스트 사이 간격 */
`;

const MainNewsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <NewsContainer>
        {/* 추천 뉴스 */}
        <SectionWrapper>
          <TabItem onClick={() => navigate("/rcmdNews")}>
            🔍 추천 뉴스 ⏵
          </TabItem>
          <RcmdSection />
        </SectionWrapper>

        {/* 최신 뉴스 */}
        <SectionWrapper>
          <TabItem onClick={() => navigate("/news")}>
            <AllIcon src={All} alt="All" />
            최신 뉴스 ⏵
          </TabItem>
          <RecentSection />
        </SectionWrapper>

        {/* 인기 뉴스 */}
        <SectionWrapper>
          <TabItem onClick={() => navigate("/article")}>
            <HotIcon src={Hot} alt="Hot" />
            인기 스크랩 ⏵
          </TabItem>
          <HotSection />
        </SectionWrapper>
      </NewsContainer>
    </div>
  );
};

export default MainNewsPage;
