import React from "react";
import styled from "styled-components";
import { RcmdNewsItem } from "../../../types/newsTypes";
import viewIcon from "@assets/hot.png";
import scrapCntIcon from "@assets/scrap.png";
import { industry } from "@common/Industry";

const formatDate = (dateString: string) => {
  return dateString.replace("T", " ");
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px 100px;
`;

const NewsItemContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  cursor: pointer;
  background-color: white;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px); /* 위로 살짝 올라가는 효과 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 강화 */
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 80px;
  border-radius: 8px;
  margin-right: 16px;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const IndustryRcmdContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
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
`;

const RcmdTextContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover .rcmd-text {
    opacity: 0; /* 마우스 호버 시 투명하게 만듦 */
  }

  &:hover .tooltip {
    opacity: 1; /* 마우스 호버 시 툴팁이 나타남 */
  }
`;

const RcmdText = styled.div<{ rcmdType: string }>`
  font-size: 12px;
  color: ${(props) =>
    props.rcmdType === "userBase"
      ? "#4CAF50"
      : props.rcmdType === "itemBase"
      ? "#FF9800"
      : props.rcmdType === "latest"
      ? "#2196F3"
      : "#555"};
  padding: 2px 8px;
  border: 1px solid
    ${(props) =>
      props.rcmdType === "userBase"
        ? "#4CAF50"
        : props.rcmdType === "itemBase"
        ? "#FF9800"
        : props.rcmdType === "latest"
        ? "#2196F3"
        : "#555"};
  border-radius: 20px;
  text-align: center;
  font-weight: bold;
  opacity: 1; /* 기본 상태에서는 완전히 보임 */
  transition: opacity 0.3s ease-in-out; /* 부드러운 전환 효과 */
`;

const Tooltip = styled.div<{ rcmdType: string }>`
  opacity: 0; /* 기본적으로 툴팁을 숨김 */
  position: absolute;
  bottom: 0px;
  right: 0px;
  color: ${(props) =>
    props.rcmdType === "userBase"
      ? "#4CAF50"
      : props.rcmdType === "itemBase"
      ? "#FF9800"
      : props.rcmdType === "latest"
      ? "#2196F3"
      : "#555"};
  padding: 2px 8px;
  border: 1px solid
    ${(props) =>
      props.rcmdType === "userBase"
        ? "#4CAF50"
        : props.rcmdType === "itemBase"
        ? "#FF9800"
        : props.rcmdType === "latest"
        ? "#2196F3"
        : "#555"};
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  z-index: 9999;
  max-width: 300px;
  text-align: right;
  transition: opacity 0.3s ease-in-out; /* 부드러운 전환 효과 */
`;

const NewsTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 15px;
`;

const InfoRow = styled.div`
  display: flex;
  font-size: 14px;
  color: #777;
  gap: 10px;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  font-size: 12px;
  color: #999;
`;

const ViewIcon = styled.img`
  width: 12.45px;
  height: 16px;
  margin-right: 5px;
`;

const ScrapCntIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const truncateTitle = (title: string) => {
  const maxLength = 30;
  return title.length > maxLength
    ? title.substring(0, maxLength) + "..."
    : title;
};

const getRcmdText = (rcmd: string) => {
  if (rcmd === "userBase") return "맞춤 추천";
  if (rcmd === "itemBase") return "연관 추천";
  if (rcmd === "latest") return "최신 추천";
  return "추천";
};

const getTooltipText = (rcmd: string) => {
  if (rcmd === "userBase")
    return "사용자의 스크랩 및 좋아요 데이터를 기반으로 맞춤 추천합니다.";
  if (rcmd === "itemBase")
    return "맞춤 추천된 뉴스와 관련된 뉴스를 추가로 추천합니다.";
  if (rcmd === "latest")
    return "사용자가 선호하는 산업의 최신 뉴스를 추천합니다.";
  return "";
};

const RcmdNewsList: React.FC<{
  newsList: RcmdNewsItem[];
  onNewsClick: (newsId: number) => void;
}> = ({ newsList, onNewsClick }) => {
  const getIndustryName = (industryId: number): string => {
    const matchedCategory = industry.find(
      (ind) => ind.industryId === industryId
    );
    return matchedCategory ? matchedCategory.industryName : "미분류 산업";
  };

  return (
    <GridContainer>
      {newsList.map((news) => (
        <NewsItemContainer
          key={news.newsId}
          onClick={() => onNewsClick(news.newsId)}
        >
          <FlexContainer>
            {news.photoUrlList && (
              <Image src={news.photoUrlList[0]} alt="이미지가 없습니다." />
            )}
            <TextContainer>
              <IndustryRcmdContainer>
                <IndustryId>{getIndustryName(news.industryId)}</IndustryId>
                <RcmdTextContainer>
                  <RcmdText className="rcmd-text" rcmdType={news.rcmd}>
                    {getRcmdText(news.rcmd)}
                  </RcmdText>
                  <Tooltip className="tooltip" rcmdType={news.rcmd}>
                    {getTooltipText(news.rcmd)}
                  </Tooltip>
                </RcmdTextContainer>
              </IndustryRcmdContainer>

              <NewsTitle>{truncateTitle(news.newsTitle)}</NewsTitle>
              <InfoRow>
                <span>{news.newsCompany}</span>
                <span>{formatDate(news.newsPublishedAt)}</span>
              </InfoRow>
              <StatsRow>
                <span>
                  <ViewIcon src={viewIcon} alt="조회수 아이콘" />
                  {news.view}
                </span>
                <span>
                  <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
                  {news.scrapCnt}
                </span>
              </StatsRow>
            </TextContainer>
          </FlexContainer>
        </NewsItemContainer>
      ))}
    </GridContainer>
  );
};

export default RcmdNewsList;
