import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// 재사용 components
import GlobalStyle from "@components/GlobalStyle";
import Header from "@common/Header";
import NewsDetailArticle from "./NewsDetailArticle";
import NewsDetailScrap from "./NewsDetailScrap";
import NewsDetailRcmd from "./NewsDetailRcmd";
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

const BackButton = styled.button`
  z-index: 2;
  position: absolute;
  top: 12%;
  left: 0.1%;
  padding: 10px 15px;
  background-color: #ffbe98;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  // font-weight: bold;
  color: white;
  &:hover {
    background-color: #ff8f4d;
  }
`;

const NewsDetailPage: React.FC = () => {
  const { newsId } = useParams<{ newsId: string }>(); // URL에서 newsId를 가져옴
  const [newsDetailItem, setNewsDetailItem] = useState<NewsDetailItem | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (newsId) {
      fetchNewsDetail(parseInt(newsId, 10)); // newsId를 숫자로 변환하여 사용
    }
  }, [newsId]);

  const fetchNewsDetail = async (newsId: number) => {
    try {
      setIsLoading(true);
      const newsData = await getNewsDetail(newsId);
      setNewsDetailItem(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate("/news");
  };

  return (
    <div>
      <GlobalStyle />
      <NewsDetailContainer>
        <Header />
        <BackButton onClick={handleBackClick}>뉴스 목록</BackButton>
        <NewsWrapper>
          {isLoading ? (
            <p>Loading news...</p>
          ) : !newsId ? ( // newsId가 undefined인 경우
            <p>삭제된 뉴스입니다</p>
          ) : (
            newsDetailItem && (
              <>
                <NewsDetailArticle newsDetailItem={newsDetailItem} />
                <NewsDetailScrap newsId={parseInt(newsId, 10)} />{" "}
                {/* 숫자로 변환하여 전달 */}
              </>
            )
          )}
        </NewsWrapper>
        {newsId && <NewsDetailRcmd newsId={parseInt(newsId, 10)} />}
      </NewsDetailContainer>
    </div>
  );
};

export default NewsDetailPage;
