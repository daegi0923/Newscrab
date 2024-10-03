import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getNewsData } from "@apis/news/newsApi";
import { NewsItem } from "../../../types/newsTypes";
import viewIcon from "@assets/hot.png";
import scrapCntIcon from "@assets/scrap.png";
import { industry } from "@common/Industry";
import scrollbar from "@common/ScrollBar"; // 스크롤바 스타일 적용

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

const RecentItemContainer = styled.div`
  padding: 0px 20px;
  overflow: hidden;
  // margin-bottom: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 40px 0px; /* 위아래 간격을 줌 */
`;

const TextContainer = styled.div`
  flex: 1;
`;

// IndustryId와 InfoRow를 수평 정렬하기 위한 래퍼
const HorizontalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
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
  margin-right: 10px;
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

// NewsButton과 StatsRow를 감싸는 수평 정렬 래퍼
const ButtonAndStatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const StatsRow = styled.div`
  display: flex;
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

// 뉴스보기 버튼 스타일
const NewsButton = styled.div`
  font-size: 14px;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const RecentSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 데이터 가져오기 (30개씩 가져옴)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNewsData(undefined, 1, 30);
        setNews(newsData.news);
      } catch (error) {
        setError("뉴스를 가져오는 중 오류가 발생했습니다.");
        console.error("Error fetching recommended news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleNewsClick = (newsId: number) => {
    navigate(`/news/${newsId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const getIndustryName = (industryId: number): string => {
    const matchedCategory = industry.find(
      (ind) => ind.industryId === industryId
    );
    return matchedCategory ? matchedCategory.industryName : "알 수 없음";
  };

  return (
    <ScrollableContainer>
      {news.map((newsItem) => (
        <RecentItemContainer key={newsItem.newsId}>
          <FlexContainer>
            <TextContainer>
              {/* IndustryId와 InfoRow를 하나의 래퍼로 감쌈 */}
              <HorizontalWrapper>
                <IndustryId>{getIndustryName(newsItem.industryId)}</IndustryId>
                <InfoRow>
                  <span>{newsItem.newsCompany}</span>
                  <span>{formatDate(newsItem.newsPublishedAt)}</span>
                </InfoRow>
              </HorizontalWrapper>

              <NewsTitle>{newsItem.newsTitle}</NewsTitle>

              {/* NewsButton과 StatsRow를 수평 정렬하는 래퍼로 감쌈 */}
              <ButtonAndStatsWrapper>
                <NewsButton onClick={() => handleNewsClick(newsItem.newsId)}>
                  뉴스보기
                </NewsButton>
                <StatsRow>
                  <span>
                    <ViewIcon src={viewIcon} alt="조회수 아이콘" />
                    {newsItem.view}
                  </span>
                  <span>
                    <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
                    {newsItem.scrapCnt}
                  </span>
                </StatsRow>
              </ButtonAndStatsWrapper>
            </TextContainer>
          </FlexContainer>
          <Divider />
        </RecentItemContainer>
      ))}
    </ScrollableContainer>
  );
};

export default RecentSection;
