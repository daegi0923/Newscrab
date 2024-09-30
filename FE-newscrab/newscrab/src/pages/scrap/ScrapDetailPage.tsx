import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// 재사용 components
import GlobalStyle from "@components/GlobalStyle";
import Header from "@common/Header";
import ScrapDetailArticle from "./ScrapDetailArticle";
// import ScrapDetailScrap from "./ScrapDetailScrap";
// api
import { getScrapDetail } from "@apis/scrap/scrapDetailApi"; // scrap API 불러옴
import { ScrapDetailResponse } from "../../types/scrapTypes"; // scrap 타입 불러옴

const ScrapDetailContainer = styled.div`
  margin: 0px 100px;
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
  top: 12%;
  left: 0.1%;
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

const ScrapDetailPage: React.FC = () => {
  const { scrapId } = useParams<{ scrapId: string }>(); // URL에서 scrapId를 가져옴
  const [, setScrapDetailItem] = useState<ScrapDetailResponse | null>(null); // scrap 데이터 상태
  const [, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrapId) {
      const parsedScrapId = parseInt(scrapId, 10); // 디버깅
      console.log("Scrap ID in ScrapDetailPage:", parsedScrapId); // 콘솔에 scrapId 출력
      fetchScrapDetail(parseInt(scrapId, 10)); // scrapId를 숫자로 변환하여 사용
    }
  }, [scrapId]);

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

  return (
    <div>
      <GlobalStyle />
      <ScrapDetailContainer>
        <Header />
        <BackButton onClick={handleBackClick}>돌아가기</BackButton>
        <ScrapWrapper>
          {/* scrapId만 ScrapDetailArticle에 넘겨줍니다 */}
          {scrapId && <ScrapDetailArticle scrapId={parseInt(scrapId, 10)} />}
        </ScrapWrapper>
      </ScrapDetailContainer>
    </div>
  );
};

export default ScrapDetailPage;
