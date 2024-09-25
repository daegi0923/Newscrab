import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// 재사용 components
import GlobalStyle from "@components/GlobalStyle";
import Header from "@common/Header";
import NewsDetailArticle from "./NewsDetailArticle";
import NewsDetailScrap from "./NewsDetailScrap";
import NewsDetailRcmd from "./NewsDetailRcmd";
import SaveButtonComponent from "./SaveButtonComponent";
// api
import { getNewsDetail } from "@apis/news/newsDetailApi";
import { NewsDetailItem } from "../../../types/newsTypes";

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
  const { newsId } = useParams<{ newsId: string }>(); // URL에서 newsId를 가져옴
  const [newsDetailItem, setNewsDetailItem] = useState<NewsDetailItem | null>(
    null
  );
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
    if (newsId) {
      fetchNewsDetail(parseInt(newsId, 10)); // URL에서 가져온 newsId로 뉴스 상세 정보 요청
    }
  }, [newsId]);

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
