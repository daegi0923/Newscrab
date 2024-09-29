import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// 재사용 components
import GlobalStyle from "@components/GlobalStyle";
import Header from "@common/Header";
import ScrapDetailArticle from "./ScrapDetailArticle";
import ScrapDetailScrap from "./ScrapDetailScrap";
// api
import { getNewsDetail } from "@apis/news/newsDetailApi";
import { NewsDetailItem } from "../../types/newsTypes";

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

const ScrapDetailPage: React.FC = () => {
  const { scrapId } = useParams<{ scrapId: string }>(); // URL에서 newsId를 가져옴
  const [newsDetailItem, setNewsDetailItem] = useState<NewsDetailItem | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrapId) {
      fetchNewsDetail(parseInt(scrapId, 10)); // newsId를 숫자로 변환하여 사용
    }
  }, [scrapId]);

  const fetchNewsDetail = async (scrapId: number) => {
    try {
      setIsLoading(true);
      const newsData = await getNewsDetail(scrapId);
      setNewsDetailItem(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate("/scrap");
  };

  return (
    <div>
      <GlobalStyle />
      <NewsDetailContainer>
        <Header />
        <BackButton onClick={handleBackClick}>돌아가기</BackButton>
        <NewsWrapper>
          {isLoading ? (
            <p>Loading news...</p>
          ) : !scrapId ? ( // newsId가 undefined인 경우
            <p>삭제된 뉴스입니다</p>
          ) : (
            newsDetailItem && (
              <>
                <ScrapDetailArticle newsDetailItem={newsDetailItem} />
                <ScrapDetailScrap scrapId={parseInt(scrapId, 10)} />{" "}
                {/* 숫자로 변환하여 전달 */}
              </>
            )
          )}
        </NewsWrapper>
      </NewsDetailContainer>
    </div>
  );
};

export default ScrapDetailPage;
