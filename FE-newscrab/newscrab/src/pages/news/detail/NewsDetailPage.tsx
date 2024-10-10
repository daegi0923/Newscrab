import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// 재사용 components
import Header from "@common/Header";
import NewsDetailArticle from "./NewsDetailArticle";
import NewsDetailScrap from "./NewsDetailScrap";
// api
import { getNewsDetail } from "@apis/news/newsDetailApi";
import { NewsDetailItem } from "../../../types/newsTypes";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // 화살표 아이콘 가져오기

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
  top: 10%;
  left: 0%;
  padding: 5px 10px;
  background-color: #fdfaf8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    background-color: #ffd180;
  }
`;

const ArrowButton = styled.button<{ hidden: boolean }>`
  ${({ hidden }) => (hidden ? "display: none;" : "")};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #ffbe98;
  font-size: 40px;
  padding: 0;
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

  const handlePrevClick = () => {
    if (newsId && parseInt(newsId, 10) > 1) {
      const prevNewsId = parseInt(newsId, 10) + 1;
      navigate(`/news/${prevNewsId}`);
    }
  };

  const handleNextClick = () => {
    if (newsId) {
      const nextNewsId = parseInt(newsId, 10) - 1;
      navigate(`/news/${nextNewsId}`);
    }
  };

  return (
    <div>
      <NewsDetailContainer>
        <Header />
        <BackButton onClick={handleBackClick}>뉴스 목록</BackButton>

        <ArrowButton
          hidden={isLoading || !newsId || parseInt(newsId, 10) === 1}
          onClick={handlePrevClick}
          style={{ left: "-60px" }}
        >
          <FaChevronLeft /> {/* 왼쪽 화살표 아이콘 */}
        </ArrowButton>

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
        <ArrowButton
          hidden={isLoading || !newsId}
          onClick={handleNextClick}
          style={{ right: "-60px" }}
        >
          <FaChevronRight /> {/* 오른쪽 화살표 아이콘 */}
        </ArrowButton>
      </NewsDetailContainer>
    </div>
  );
};

export default NewsDetailPage;
