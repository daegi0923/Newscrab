import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GlobalStyle from "@components/GlobalStyle"; // 배경색
import Header from "@common/Header"; // 헤더, 탭

import { getNewsDetail } from "@apis/news/newsDetailApi"; // getNewsDetail 함수 import
import { NewsDetailItem } from "../../../types/newsTypes"; // 새로 정의한 NewsDetailItem import

import NewsDetailArticle from "./NewsDetailArticle";
import NewsDetailScrap from "./NewsDetailScrap";
import NewsDetailRcmd from "./NewsDetailRcmd";
import SaveButtonComponent from "./SaveButtonComponent";

// Styled Components 정의
const NewsDetailContainer = styled.div`
  margin: 0px 100px;
  position: relative;
`;

const NewsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 50px;
`;

const SaveButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const NewsDetailPage: React.FC = () => {
  const [newsDetailItem, setNewsDetailItem] = useState<NewsDetailItem | null>(
    null
  ); // 뉴스 상세 데이터를 저장하는 상태
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 뉴스 상세 데이터를 API에서 가져오는 비동기 함수
  const fetchNewsDetail = async (newsId: number) => {
    try {
      setIsLoading(true);
      const newsData = await getNewsDetail(newsId); // 뉴스 상세 데이터 가져오기
      setNewsDetailItem(newsData); // 상태에 저장
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const newsId = 1; // 예시로 뉴스 ID를 1로 설정
    fetchNewsDetail(newsId);
  }, []);

  return (
    <div>
      <GlobalStyle />

      <NewsDetailContainer>
        <Header />

        <NewsWrapper>
          {isLoading ? (
            <p>Loading news...</p>
          ) : (
            newsDetailItem && (
              <>
                <NewsDetailArticle newsDetailItem={newsDetailItem} />
                <NewsDetailScrap />
              </>
            )
          )}
        </NewsWrapper>

        <SaveButtonWrapper>
          <SaveButtonComponent />
        </SaveButtonWrapper>

        <NewsDetailRcmd />
      </NewsDetailContainer>
    </div>
  );
};

export default NewsDetailPage;
