import React, { useEffect, useState, useRef } from "react";
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
  // border-right: 1px solid #ddd;
  ${scrollbar}/* 커스텀 스크롤바 스타일 적용 */
`;

// 뉴스 항목 컨테이너 스타일
const RcmdItemContainer = styled.div`
  overflow: hidden;
  padding: 16px;
  margin-bottom: 10px;
  // border: 1px solid #ddd;
  // border-radius: 10px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  // background-color: white; /* 배경색 설정 */
`;

// 뉴스 항목 내부 레이아웃
const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

// 이미지 스타일
const Image = styled.img`
  width: 400px;
  height: 225px;
  border-radius: 8px;
  // margin-right: 16px;
`;

// 텍스트 컨테이너
const TextContainer = styled.div`
  flex: 1;
`;

// 산업 ID 스타일
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

// 뉴스 제목 스타일
const NewsTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 15px;
`;

// 뉴스 하단 정보 및 아이콘 정렬
const WrapperRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

// 뉴스 정보 스타일
const InfoRow = styled.div`
  display: flex;
  font-size: 14px;
  color: #777;
  gap: 10px;
`;

// 아이콘 그룹 스타일
const IconGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  color: #999;
`;

// 조회수 아이콘 스타일
const ViewIcon = styled.img`
  width: 12.45px;
  height: 16px;
  margin-right: 5px;
`;

// 스크랩 수 아이콘 스타일
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

const RcmdSection: React.FC = () => {
  const [rcmdNews, setRcmdNews] = useState<RcmdNewsItem[]>([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(5);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRcmdNews = async () => {
      try {
        const newsData = await getRcmdNews();
        setRcmdNews(newsData);
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

  // 무한 스크롤 기능
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setVisibleNewsCount((prevCount) => prevCount + 5); // 10개씩 추가
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, []);

  return (
    <ScrollableContainer>
      {/* 현재까지 보이는 뉴스만 표시 */}
      {rcmdNews.slice(0, visibleNewsCount).map((news) => (
        <RcmdItemContainer key={news.newsId}>
          {news.photoUrlList && (
            <Image src={news.photoUrlList[0]} alt="이미지 없음" />
          )}
          <FlexContainer>
            <TextContainer>
              <NewsTitle>
                <IndustryId>
                  {industry.find((ind) => ind.industryId === news.industryId)
                    ?.industryName || "알 수 없음"}
                </IndustryId>
                {news.newsTitle}
              </NewsTitle>
              <WrapperRow>
                <InfoRow>
                  <NewsButton onClick={() => handleNewsClick(news.newsId)}>
                    뉴스보기
                  </NewsButton>
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

      {/* 스크롤 끝에 감지될 div */}
      <div ref={observerRef} style={{ height: "20px" }} />
    </ScrollableContainer>
  );
};

export default RcmdSection;
