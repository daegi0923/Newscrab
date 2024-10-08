// ArticleScrapDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ScrapDetailVoca from "./ArticleScrapDetailVoca";
import Header from "@common/Header";
import ArticleScrapDetailPage from "./ArticleScrapDetailArticle";
import { getScrapData } from "@apis/scrap/scrapApi";
import { getScrapDetail } from "@apis/scrap/scrapDetailApi";
import { ScrapData, ScrapDetailResponse } from "../../../types/scrapTypes";

const ScrapDetailContainer = styled.div`
  margin: 0px 100px;
  margin-bottom: 30px;
  position: relative;
`;

const ScrapWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 50px;
`;

const BackButton = styled.button`
  z-index: 2;
  position: absolute;
  top: 105px;
  left: 0%;
  padding: 4px 8px;
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

const ScrapDetailPage: React.FC = () => {
  const { scrapId } = useParams<{ scrapId: string }>();
  const [scrapDataList, setScrapDataList] = useState<ScrapData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [, setScrapDetailItem] = useState<ScrapDetailResponse | null>(null);
  const [, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScrapList = async () => {
      try {
        const response = await getScrapData(1, 10);
        setScrapDataList(response.data.data);
        const initialIndex = response.data.data.findIndex(
          (item) => item.scrapId === parseInt(scrapId ?? "0", 10)
        );
        setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
      } catch (error) {
        console.error("Error fetching scrap data:", error);
      }
    };

    fetchScrapList();
  }, [scrapId]);

  useEffect(() => {
    if (scrapDataList.length > 0 && scrapId) {
      const parsedScrapId = parseInt(scrapId, 10);
      fetchScrapDetail(parsedScrapId);
    }
  }, [scrapId, scrapDataList]);

  const fetchScrapDetail = async (scrapId: number) => {
    try {
      setIsLoading(true);
      const scrapData = await getScrapDetail(scrapId);
      setScrapDetailItem(scrapData);
    } catch (error) {
      console.error("Error fetching scrap detail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate("/scrap");
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      navigate(`/scrap/${scrapDataList[currentIndex - 1].scrapId}`);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < scrapDataList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      navigate(`/scrap/${scrapDataList[currentIndex + 1].scrapId}`);
    }
  };

  const currentScrapData = scrapDataList[currentIndex];

  return (
    <div>
      <ScrapDetailContainer>
        <Header />
        <BackButton onClick={handleBackClick}>스크랩 목록</BackButton>

        <ArrowButton
          hidden={currentIndex === 0}
          onClick={handlePrevClick}
          style={{ left: "-60px" }}
        >
          <FaChevronLeft />
        </ArrowButton>

        <ScrapWrapper>
          {currentScrapData && (
            <ArticleScrapDetailPage scrapId={currentScrapData.scrapId} />
          )}

          {currentScrapData && (
            <ScrapDetailVoca scrapId={currentScrapData.scrapId} />
          )}
        </ScrapWrapper>

        <ArrowButton
          hidden={currentIndex === scrapDataList.length - 1}
          onClick={handleNextClick}
          style={{ right: "-60px" }}
        >
          <FaChevronRight />
        </ArrowButton>
      </ScrapDetailContainer>
    </div>
  );
};

export default ScrapDetailPage;
