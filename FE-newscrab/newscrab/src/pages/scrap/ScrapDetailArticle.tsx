import React, { useState, useEffect } from "react";
import styled from "styled-components";
import viewIcon from "@assets/view.png";
import scrapCntIcon from "@assets/scrapCnt.png";
import crab from "@assets/crab.png";
import { NewsDetailItem } from "../../types/newsTypes";
import LikeButton from "@pages/news/common/LikeButton"; // LikeButton 컴포넌트 임포트
import { industry } from "@common/Industry"; // 산업 데이터를 가져오기
import { getScrapData } from "@apis/scrap/scrapApi";

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
  justify-content: flex-start; /* 제목과 토글 버튼을 왼쪽 정렬 */
  position: relative; /* ToggleButton을 절대 위치시킬 기준으로 설정 */
`;

const NewsTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer; /* 클릭 가능한 요소로 설정 */
  color: #007bff; /* 링크 스타일처럼 색상 변경 */
  text-decoration: underline; /* 밑줄 추가 */

  &:hover {
    color: #0056b3; /* 호버 시 색상 변경 */
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  left: -40px; /* 제목 바로 왼쪽에 위치 */
  top: 195%;
  transform: translateY(-50%); /* 가운데 정렬 */
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
  gap: 10px; // 간격 설정
`;

const Info = styled.p`
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
  newsDetailItem: NewsDetailItem;
};

// getIndustryName 함수를 정의하여 industryId를 이용해 산업 이름을 가져오는 함수
const getIndustryName = (industryId: number): string => {
  const matchedCategory = industry.find((ind) => ind.industryId === industryId);
  return matchedCategory ? matchedCategory.industryName : "알 수 없음";
};

const ScrapDetailArticle: React.FC<ScrapDetailArticleProps> = ({
  newsDetailItem,
}) => {
  const [scrapSummary, setScrapSummary] = useState<string | null>(null); // scrapSummary 상태
  const [comment, setComment] = useState<string | null>(null); // comment 상태
  const [showContent, setShowContent] = useState(false); // 디폴트로 안 보이도록 설정
  const handleTitleClick = () => {
    window.open(newsDetailItem.newsUrl, "_blank"); // 새 창에서 링크 열기
  };

  // 스크랩 데이터를 가져오는 함수
  const fetchScrapData = async () => {
    try {
      const scrapData = await getScrapData(1, 1); // 페이지 1, 아이템 1개로 데이터 요청
      const firstItem = scrapData.data.data[0]; // 첫 번째 아이템만 사용

      setScrapSummary(firstItem.scrapSummary); // scrapSummary 설정
      setComment(firstItem.comment); // comment 설정
    } catch (error) {
      console.error("스크랩 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchScrapData(); // 컴포넌트 마운트 시 데이터 요청
  }, []);

  const handleToggleClick = () => {
    setShowContent(!showContent);
  };

  return (
    <NewsContentWrapper>
      <LikeButton newsId={newsDetailItem.newsId} /> {/* LikeButton 사용 */}
      <NewsTitleWrapper>
        {/* 토글 버튼을 제목 왼쪽에 앱솔루트로 배치 */}
        <ToggleButton onClick={handleToggleClick}>
          {showContent ? "▼" : "▶"}
        </ToggleButton>
        {/* 뉴스 제목 클릭 시 새 창으로 이동 */}
        <NewsTitle onClick={handleTitleClick}>
          {newsDetailItem.newsTitle}
        </NewsTitle>
      </NewsTitleWrapper>
      <MetaInfoContainer>
        <InfoGroup>
          <Info>
            <IndustryId>
              {getIndustryName(newsDetailItem.industryId)}
            </IndustryId>
          </Info>
          <Info>{newsDetailItem.newsCompany}</Info>
          <Info>{newsDetailItem.newsPublishedAt.replace("T", " ")}</Info>
        </InfoGroup>
        <Stats>
          <IconContainer>
            <ViewIcon src={viewIcon} alt="조회수 아이콘" />
            {newsDetailItem.view}
          </IconContainer>
          <IconContainer>
            <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
            {newsDetailItem.scrap}
          </IconContainer>
        </Stats>
      </MetaInfoContainer>
      <Divider />
      <CrabIcon src={crab} alt="게 아이콘" /> 본문
      {/* NewsText만 토글 */}
      {showContent && (
        <NewsText
          dangerouslySetInnerHTML={{ __html: newsDetailItem.newsContent }} // HTML로 렌더링
        />
      )}
      <Divider />
      <CrabIcon src={crab} alt="게 아이콘" /> 요약
      <NewsText>{scrapSummary ? scrapSummary : "요약이 없습니다."}</NewsText>
      <Divider />
      <CrabIcon src={crab} alt="게 아이콘" /> 의견
      <NewsText>{comment ? comment : "의견이 없습니다."}</NewsText>
      <Divider />
    </NewsContentWrapper>
  );
};

export default ScrapDetailArticle;
