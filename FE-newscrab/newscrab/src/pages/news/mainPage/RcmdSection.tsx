import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getRcmdNews } from "@apis/news/newsRcmdApi";
import { RcmdNewsItem } from "../../../types/newsTypes";
import viewIcon from "@assets/hot.png";
import scrapCntIcon from "@assets/scrap.png";
import { industry } from "@common/Industry";
import scrollbar from "@common/ScrollBar";

// 날짜 형식 변환 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 스크롤바 스타일 적용 및 고정 높이 지정
const ScrollableContainer = styled.div`
  border-left: 1px solid #ddd;
  padding: 0px 10px;
  max-height: 650px;
  overflow-y: auto;
  ${scrollbar}
`;

const RcmdItemContainer = styled.div`
  // border: 1px solid #ddd;
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
  margin-right: 16px;
`;

const TextContainer = styled.div`
  flex: 1;
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
  margin-right: 8px;
  margin-bottom: 4px;
`;

const NewsTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
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

const RcmdSection: React.FC = () => {
  const [rcmdNews, setRcmdNews] = useState<RcmdNewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRcmdNews = async () => {
      try {
        const newsData = await getRcmdNews();
        setRcmdNews(newsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommended news:", error); // 에러 출력
        setError("추천 뉴스를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchRcmdNews();
  }, []);

  const getIndustryName = (industryId: number): string => {
    const matchedCategory = industry.find(
      (ind) => ind.industryId === industryId
    );
    return matchedCategory ? matchedCategory.industryName : "알 수 없음";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ScrollableContainer>
      {/* 뉴스 배열에서 첫 15개의 뉴스만 보여줌 */}
      {rcmdNews.slice(0, 15).map((news) => (
        <RcmdItemContainer key={news.newsId}>
          {news.photoUrlList && (
            <Image src={news.photoUrlList[0]} alt="이미지 없음" />
          )}
          <FlexContainer>
            <TextContainer>
              <NewsTitle>
                <IndustryId>{getIndustryName(news.industryId)}</IndustryId>
                {news.newsTitle}
              </NewsTitle>

              <WrapperRow>
                <InfoRow>
                  <span>{news.newsCompany}</span>
                  <span>{formatDate(news.createdAt)}</span>
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
