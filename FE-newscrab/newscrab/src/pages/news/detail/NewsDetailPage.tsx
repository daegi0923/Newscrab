import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GlobalStyle from "@components/GlobalStyle"; // 배경색
import Header from "@common/Header"; // 헤더, 탭

import { getMockNews } from "@apis/newsApi"; // getMockNews 함수 import
import { NewsItem } from "../../../types/newsTypes"; // newsTypes.ts에서 타입 import

import NewsDetailArticle from "./NewsDetailArticle";
import NewsDetailScrap from "./NewsDetailScrap";
import NewsDetailRcmd from "./NewsDetailRcmd";
import SaveButtonComponent from "./SaveButtonComponent";

// Styled Components 정의
const NewsDetailContainer = styled.div`
  margin: 0px 100px;
  position: relative; /* 절대 위치를 위한 부모 요소 설정 */
`;

const NewsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 50px; /* 두 컴포넌트 사이에 50px 간격을 줌 */
`;

const SaveButtonWrapper = styled.div`
  position: absolute;
  right: 20px; /* 오른쪽에서 20px 떨어진 위치 */
  bottom: 20px; /* 아래쪽에서 20px 떨어진 위치 */
`;

const NewsDetailPage: React.FC = () => {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null); // 뉴스 데이터를 저장하는 상태
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태

  // 뉴스 데이터를 API에서 가져오는 비동기 함수
  const fetchNewsDetail = async (newsId: number) => {
    try {
      setIsLoading(true); // 데이터를 가져오기 전에 로딩 상태로 전환
      const mockData = await getMockNews(1); // 목데이터를 가져옴
      const selectedNews = mockData.news.find((news) => news.newsId === newsId); // 특정 뉴스 ID로 검색
      if (selectedNews) {
        setNewsItem(selectedNews); // 해당 뉴스를 상태에 저장
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false); // 데이터 가져온 후 로딩 상태 해제
    }
  };

  // 특정 뉴스 기사를 보여줄 때 사용
  useEffect(() => {
    const newsId = 1; // 예시로 뉴스 ID를 1로 설정 (필요에 따라 변경)
    fetchNewsDetail(newsId);
  }, []);

  return (
    <div>
      <GlobalStyle />

      {/* Header와 NewsWrapper를 하나의 Container로 묶음 */}
      <NewsDetailContainer>
        <Header />

        <NewsWrapper>
          {isLoading ? (
            <p>Loading news...</p>
          ) : (
            newsItem && (
              <>
                <NewsDetailArticle newsItem={newsItem} />
                <NewsDetailScrap />
              </>
            )
          )}
        </NewsWrapper>

        {/* 저장 버튼을 오른쪽 아래로 옮김 */}
        <SaveButtonWrapper>
          <SaveButtonComponent />
        </SaveButtonWrapper>

        <NewsDetailRcmd />
      </NewsDetailContainer>
    </div>
  );
};

export default NewsDetailPage;
