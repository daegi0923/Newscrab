import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import viewIcon from "@assets/view.png";
import scrapCntIcon from "@assets/scrapCnt.png";
import crab from "@assets/crab.png";
import { ScrapDetailResponse } from "../../types/scrapTypes"; // scrap 타입 불러옴
import LikeButton from "@pages/news/common/LikeButton"; // LikeButton 컴포트 임포트
import { industry } from "@common/Industry"; // 산업 데이터를 가져오기
import { getScrapDetail } from "@apis/scrap/scrapDetailApi"; // 스크랩 데이터를 가져오기 위한 API 호출

// 스타일 정의
const NewsContentWrapper = styled.div`
  width: 60%;
  padding-right: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px 100px;
  background-color: #fff;
  max-height: 680px;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 12px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #666;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const NewsTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const NewsTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  left: -40px;
  top: 195%;
  transform: translateY(-50%);
`;

const IndustryId = styled.div`
  font-size: 12px;
  color: #555;
  padding: 2px 8px;
  border: 1px solid #555;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
`;

const MetaInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Info = styled.div`
  color: #888;
  font-size: 14px;
`;

const Stats = styled.div`
  display: flex;
  gap: 10px;
  color: #888;
  font-size: 14px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ViewIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const ScrapCntIcon = styled.img`
  width: 13px;
  height: 16px;
`;

const NewsText = styled.div`
  line-height: 1.6;
  font-size: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin-bottom: 20px;
`;

const CrabIcon = styled.img`
  width: 25px;
  height: 22px;
`;

type ScrapDetailArticleProps = {
  scrapId: number; // scrapId를 prop으로 전달
};

// getIndustryName 함수를 정의하여 industryId를 이용해 산업 이름을 가져오는 함수
const getIndustryName = (industryId: number): string => {
  const matchedCategory = industry.find((ind) => ind.industryId === industryId);
  return matchedCategory ? matchedCategory.industryName : "알 수 없음";
};

const ScrapDetailArticle: React.FC<ScrapDetailArticleProps> = ({ scrapId }) => {
  const [scrapDetail, setScrapDetail] = useState<ScrapDetailResponse | null>(
    null
  ); // 스크랩 데이터를 저장
  const [showContent, setShowContent] = useState(false); // 디폴트로 안 보이도록 설정
  const [, setIsLoading] = useState<boolean>(true); // 로딩 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 스크랩 데이터를 가져오는 함수
  const fetchScrapDetail = async (scrapId: number) => {
    try {
      const scrapDataResponse = await getScrapDetail(scrapId); // scrapId를 인자로 전달
      setScrapDetail(scrapDataResponse); // 데이터를 상태에 저장
    } catch (error) {
      console.error("스크랩 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchScrapDetail(scrapId); // 컴포넌트 마운트 시 데이터 요청
  }, [scrapId]);

  const handleToggleClick = () => {
    setShowContent(!showContent);
  };

  const handleTitleClick = () => {
    navigate(`/news/${scrapDetail?.newsId}`); // 상세 페이지로 이동
  };

  return (
    <NewsContentWrapper>
      {scrapDetail ? (
        <>
          <LikeButton newsId={scrapDetail.newsId} /> {/* LikeButton 사용 */}
          <NewsTitleWrapper>
            <ToggleButton onClick={handleToggleClick}>
              {showContent ? "▼" : "▶"}
            </ToggleButton>
            <NewsTitle onClick={handleTitleClick}>
              {scrapDetail.newsTitle}
            </NewsTitle>
          </NewsTitleWrapper>
          <MetaInfoContainer>
            <InfoGroup>
              <Info>
                <IndustryId>
                  {getIndustryName(scrapDetail.industryId)}
                </IndustryId>
              </Info>
              <Info>{scrapDetail.newsCompany}</Info>
              <Info>{scrapDetail.createdAt.replace("T", " ")}</Info>{" "}
            </InfoGroup>
            <Stats>
              <IconContainer>
                <ViewIcon src={viewIcon} alt="조회수 아이콘" />
                {scrapDetail.view}
              </IconContainer>
              <IconContainer>
                <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
                {scrapDetail.scrapCnt}
              </IconContainer>
            </Stats>
          </MetaInfoContainer>
          <Divider />
          <CrabIcon src={crab} alt="게 아이콘" /> 본문
          {showContent && (
            <NewsText
              dangerouslySetInnerHTML={{
                __html: scrapDetail?.newsContent ?? "",
              }} // HTML로 렌더링
            />
          )}
          <Divider />
          <CrabIcon src={crab} alt="게 아이콘" /> 요약
          <NewsText>
            {scrapDetail.scrapSummary
              ? scrapDetail.scrapSummary
              : "요약이 없습니다."}
          </NewsText>
          <Divider />
          <CrabIcon src={crab} alt="게 아이콘" /> 의견
          <NewsText>
            {scrapDetail.comment ? scrapDetail.comment : "의견이 없습니다."}
          </NewsText>
          <Divider />
        </>
      ) : (
        <div>데이터를 불러오는 중입니다...</div>
      )}
    </NewsContentWrapper>
  );
};

export default ScrapDetailArticle;
