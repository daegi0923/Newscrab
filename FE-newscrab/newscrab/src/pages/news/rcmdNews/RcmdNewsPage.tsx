import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "@components/common/Header";
import Tab from "./Tab";
import RcmdNewsList from "./RcmdNewsList"; // 뉴스 리스트
import RefreshImage from "@assets/refresh.png"; // Refresh 이미지 import
import AllImage from "@assets/all.png"; // All 이미지 import

import { getRcmdNews } from "@apis/news/newsRcmdApi";
import { RcmdNewsItem } from "../../../types/newsTypes"; // newsTypes.ts에서 타입 import

// 상단 탭과 "모든 뉴스 보러가기"를 묶는 컨테이너 스타일
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 100px;
  margin: 20px 0px;
`;

// Tab과 "다른 추천 받기" 버튼을 묶는 컨테이너 스타일
const TabButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

// "다른 추천 받기" 버튼 스타일
const NextButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  display: flex; /* 이미지를 텍스트 옆에 배치하기 위해 flex 사용 */
  align-items: center;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Refresh 이미지 스타일
const RefreshIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px; /* 텍스트와 이미지 사이의 간격 */
`;

// GoAllNews 컴포넌트 스타일
const GoAllNews = styled.div`
  display: flex;
  align-items: center;
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

// All 이미지 스타일
const AllIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px; /* 텍스트와 이미지 사이의 간격 */
`;

const RcmdNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<RcmdNewsItem[]>([]); // 전체 뉴스 데이터를 저장하는 상태
  const [displayedNews, setDisplayedNews] = useState<RcmdNewsItem[]>([]); // 현재 보여지는 뉴스 데이터를 저장하는 상태
  const [startIndex, setStartIndex] = useState(0); // 현재 시작 인덱스를 저장하는 상태

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 뉴스 데이터를 API에서 가져오는 비동기 함수
  const fetchNewsData = async () => {
    const mergedRcmdNews: RcmdNewsItem[] = await getRcmdNews(); // API 요청으로 mergedRcmdNews 가져오기
    setNewsList(mergedRcmdNews); // 전체 뉴스 데이터를 상태에 저장
    setDisplayedNews(mergedRcmdNews.slice(0, 8)); // 처음에 1~8까지의 뉴스만 표시
  };

  // "다른 추천 받기" 버튼 클릭 시 실행되는 함수
  const handleNextNews = () => {
    const nextIndex = startIndex + 8; // 다음 8개의 항목을 가져올 인덱스
    if (nextIndex >= newsList.length) {
      // 마지막 데이터에 도달했으면 다시 처음부터 보여줌
      setStartIndex(0);
      setDisplayedNews(newsList.slice(0, 8));
    } else {
      setStartIndex(nextIndex); // 새로운 시작 인덱스 설정
      setDisplayedNews(newsList.slice(nextIndex, nextIndex + 8)); // 다음 8개의 뉴스만 표시
    }
  };

  // 컴포넌트가 마운트될 때 뉴스 데이터를 가져옴
  useEffect(() => {
    fetchNewsData(); // 페이지네이션이 없으므로 한번만 호출
  }, []);

  // 뉴스 클릭 시 실행되는 핸들러 (상세 페이지로 이동)
  const handleNewsClick = (newsId: number) => {
    navigate(`/news/${newsId}`); // 클릭한 뉴스의 상세 페이지로 이동
  };

  const handleGoAllNews = () => {
    navigate("/news");
  };

  return (
    <div>
      <Header />
      <TopContainer>
        {/* Tab과 NextButton을 묶는 컨테이너 */}
        <TabButtonContainer>
          <Tab />
          <NextButton onClick={handleNextNews}>
            <RefreshIcon src={RefreshImage} alt="Refresh" />
            다른 추천
          </NextButton>
        </TabButtonContainer>
        <GoAllNews onClick={handleGoAllNews}>
          <AllIcon src={AllImage} alt="All News" />
          모든 뉴스 보기
        </GoAllNews>
      </TopContainer>
      <RcmdNewsList newsList={displayedNews} onNewsClick={handleNewsClick} />
    </div>
  );
};

export default RcmdNewsPage;
