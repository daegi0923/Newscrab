import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // 아이콘 가져오기
import ScrapDetailVoca from "./ScrapDetailVoca";
// 재사용 components
import Header from "@common/Header";
import ScrapDetailArticle from "./ScrapDetailArticle";
// api
import { getScrapData } from "@apis/scrap/scrapApi"; // scrap API 불러옴
import { getScrapDetail } from "@apis/scrap/scrapDetailApi"; // scrap API 불러옴
import { ScrapData, ScrapDetailResponse } from "../../../types/scrapTypes"; // scrap 타입 불러옴

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
  ${({ hidden }) => (hidden ? "display: none;" : "")}; /* hidden 상태 처리 */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background-color: transparent; /* 배경 제거 */
  border: none;
  color: #ffbe98; /* 아이콘 색상 */
  font-size: 40px; /* 아이콘 크기 */
  padding: 0; /* 불필요한 패딩 제거 */
`;

const NoDataMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px; /* 원하는 높이로 설정 */
  font-size: 24px;
  color: gray;
`;

const ScrapDetailPage: React.FC = () => {
  const { scrapId } = useParams<{ scrapId: string }>(); // URL에서 scrapId만 가져옴
  const [scrapDataList, setScrapDataList] = useState<ScrapData[]>([]); // 전체 스크랩 데이터
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 현재 스크랩 인덱스
  const [, setScrapDetailItem] = useState<ScrapDetailResponse | null>(null); // scrap 데이터 상태
  const [, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScrapList = async () => {
      try {
        const response = await getScrapData(1, 10); // 데이터를 가져옴
        setScrapDataList(response.data.data); // 전체 데이터를 상태로 설정
        const initialIndex = response.data.data.findIndex(
          (item) => item.scrapId === parseInt(scrapId ?? "0", 10)
        );
        setCurrentIndex(initialIndex >= 0 ? initialIndex : 0); // 초기 인덱스 설정
      } catch (error) {
        console.error("Error fetching scrap data:", error);
      }
    };

    fetchScrapList();
  }, [scrapId]);

  useEffect(() => {
    if (scrapDataList.length > 0 && scrapId) {
      const parsedScrapId = parseInt(scrapId, 10); // scrapId를 숫자로 변환
      fetchScrapDetail(parsedScrapId); // scrapId에 맞는 상세 정보 가져오기
    }
  }, [scrapId, scrapDataList]);

  const fetchScrapDetail = async (scrapId: number) => {
    try {
      setIsLoading(true);
      const scrapData = await getScrapDetail(scrapId); // scrapId에 맞는 스크랩 데이터 가져오기
      setScrapDetailItem(scrapData); // API 응답 데이터를 상태로 설정
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

        {/* 데이터가 없을 때 "데이터가 없습니다" 메시지를 중앙에 표시 */}
        {scrapDataList.length === 0 ? (
          <NoDataMessage>스크랩을 해주세요...</NoDataMessage>
        ) : (
          <>
            <ArrowButton
              hidden={currentIndex === 0}
              onClick={handlePrevClick}
              style={{ left: "-60px" }}
            >
              <FaChevronLeft /> {/* 왼쪽 화살표 아이콘 */}
            </ArrowButton>

            <ScrapWrapper>
              {/* 현재 scrap 데이터를 ScrapDetailArticle에 넘겨줍니다 */}
              {currentScrapData && (
                <ScrapDetailArticle scrapId={currentScrapData.scrapId} />
              )}

              {/* scrapId를 ScrapDetailVoca로도 전달합니다 */}
              {currentScrapData && (
                <ScrapDetailVoca scrapId={currentScrapData.scrapId} />
              )}
            </ScrapWrapper>

            <ArrowButton
              hidden={currentIndex === scrapDataList.length - 1}
              onClick={handleNextClick}
              style={{ right: "-60px" }}
            >
              <FaChevronRight /> {/* 오른쪽 화살표 아이콘 */}
            </ArrowButton>
          </>
        )}
      </ScrapDetailContainer>
    </div>
  );
};

export default ScrapDetailPage;
