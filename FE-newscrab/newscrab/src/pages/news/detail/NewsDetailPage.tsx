import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// 재사용 components
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
  position: fixed;
  top: 11%;
  left: 10.5%;
  padding: 10px 15px;
  background-color: #ffbe98;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  color: white;
  &:hover {
    background-color: #ff8f4d;
  }
`;

const NewsDetailPage: React.FC = () => {
  const { newsId } = useParams<{ newsId: string }>();
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
      <NewsDetailContainer>
        <Header />
        <BackButton onClick={handleBackClick}>뉴스 목록</BackButton>
        <NewsWrapper>
          {isLoading ? (
            <div>Loading news...</div>
          ) : !newsId ? (
            <div>삭제된 뉴스입니다</div>
          ) : (
            newsDetailItem && (
              <>
                <NewsDetailArticle newsDetailItem={newsDetailItem} />
                <NewsDetailScrap newsId={parseInt(newsId, 10)} />
              </>
            )
          )}
        </NewsWrapper>
        {/* newsDetailItem을 NewsDetailRcmd로 넘겨줌 */}
        {newsId && newsDetailItem && (
          <NewsDetailRcmd
            newsId={parseInt(newsId, 10)}
            newsDetailItem={newsDetailItem}
          />
        )}
      </NewsDetailContainer>
    </div>
  );
};

export default NewsDetailPage;
