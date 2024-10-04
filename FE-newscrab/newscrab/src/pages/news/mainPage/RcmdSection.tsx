import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getRcmdNews } from "@apis/news/newsRcmdApi";
import { RcmdNewsItem } from "../../../types/newsTypes";
import viewIcon from "@assets/hot.png";
import scrapCntIcon from "@assets/scrap.png";
import { industry } from "@common/Industry";
import scrollbar from "@common/ScrollBar"; // 스크롤바 스타일 적용

// 날짜 형식 변환 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 스크롤 가능한 컨테이너
const ScrollableContainer = styled.div`
  padding: 0px 10px;
  max-height: 650px;
  overflow-y: auto;
  border-left: 1px solid #ddd;
  ${scrollbar}/* 커스텀 스크롤바 스타일 적용 */
`;

// 뉴스 항목 컨테이너 스타일
const RcmdItemContainer = styled.div`
  overflow: hidden;
  padding: 16px;
  margin-bottom: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Image = styled.img`
  width: 400px;
  height: 225px;
  border-radius: 8px;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const IndustryRcmdWrapper = styled.div`
  display: inline-flex; /* 인라인 요소로 만들기 */
  align-items: center; /* 수직 정렬을 가운데로 */
  gap: 5px; /* IndustryId와 RcmdText 사이 간격 */
  margin-right: 5px;
  margin-bottom: 10px;
`;

const IndustryId = styled.div`
  font-size: 12px;
  color: #555;
  padding: 2px 8px;
  border: 1px solid #666;
  background-color: #666;
  border-radius: 20px;
  display: inline-block;
  color: white;
  text-align: center;
  font-weight: bold;
`;

const RcmdText = styled.div<{ rcmdType: string }>`
  font-size: 12px;
  color: ${(props) =>
    props.rcmdType === "userBase"
      ? "#4CAF50" // 맞춤 추천일 때 초록색
      : props.rcmdType === "itemBase"
      ? "#FF9800" // 분류별 추천일 때 주황색
      : props.rcmdType === "latest"
      ? "#2196F3" // 최신 추천일 때 파란색
      : "#555"}; // 기본 색상
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
`;

const NewsTitle = styled.h2`
  font-size: 18px;
  // font-weight: bold;
  margin-top: 8px;
  margin-bottom: 15px;
`;

const WrapperRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const InfoRow = styled.div`
  display: flex;
  font-size: 14px;
  color: #777;
  gap: 10px;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 14px;
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

const NewsButton = styled.div`
  font-size: 14px;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const RcmdSection: React.FC = () => {
  const [rcmdNews, setRcmdNews] = useState<RcmdNewsItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRcmdNews = async () => {
      try {
        const newsData = await getRcmdNews();
        // 받아온 데이터에서 처음 15개만 사용
        setRcmdNews(newsData.slice(0, 15));
        console.log("Fetched news data:", newsData);
      } catch (error) {
        console.error("Error fetching recommended news:", error);
      }
    };

    fetchRcmdNews();
  }, []);

  const handleNewsClick = (newsId: number) => {
    navigate(`/news/${newsId}`);
  };

  // rcmd 값을 한글로 변환하는 함수
  const getRcmdText = (rcmd: string) => {
    if (rcmd === "userBase") return "맞춤 추천";
    if (rcmd === "itemBase") return "분류별 추천";
    if (rcmd === "latest") return "최근 추천";
    return "추천";
  };

  return (
    <ScrollableContainer>
      {rcmdNews.map((news) => (
        <RcmdItemContainer key={news.newsId}>
          {news.photoUrlList && (
            <Image src={news.photoUrlList[0]} alt="이미지 없음" />
          )}
          <FlexContainer>
            <TextContainer>
              <NewsTitle>
                <IndustryRcmdWrapper>
                  <IndustryId>
                    {industry.find((ind) => ind.industryId === news.industryId)
                      ?.industryName || "미분류 산업"}
                  </IndustryId>
                  <RcmdText rcmdType={news.rcmd}>
                    {getRcmdText(news.rcmd)}
                  </RcmdText>
                </IndustryRcmdWrapper>
                <span>{news.newsTitle}</span>
              </NewsTitle>
              <WrapperRow>
                <InfoRow>
                  <NewsButton onClick={() => handleNewsClick(news.newsId)}>
                    뉴스보기
                  </NewsButton>
                  <span>{news.newsCompany}</span>
                  <span>{formatDate(news.newsPublishedAt)}</span>
                </InfoRow>
                <IconGroup>
                  <span>
                    <ViewIcon src={viewIcon} alt="조회수 아이콘" />
                    {news.view}
                  </span>
                  <span>
                    <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
                    {news.scrapCnt}
                  </span>
                </IconGroup>
              </WrapperRow>
            </TextContainer>
          </FlexContainer>
        </RcmdItemContainer>
      ))}
    </ScrollableContainer>
  );
};

export default RcmdSection;
