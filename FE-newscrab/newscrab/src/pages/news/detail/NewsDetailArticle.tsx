import React, { useState } from "react";
import styled from "styled-components";
import viewIcon from "@assets/view.png";
import scrapCntIcon from "@assets/scrapCnt.png";
import likeIcon from "@assets/like.png"; // 찜 완료 시 표시할 이미지
import unlikeIcon from "@assets/unlike.png"; // 찜하기 시 표시할 이미지
import { NewsItem } from "../../../types/newsTypes"; // newsTypes.ts에서 타입 import

const formatDate = (dateString: string) => {
  return dateString.replace("T", " ");
};

const NewsContent = styled.div`
  width: 60%;
  padding-right: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px 100px;
  background-color: #fff;
  max-height: 680px; /* 스크롤바를 위한 최대 높이 설정 */
  overflow-y: auto; /* 스크롤바 표시 */
  position: relative; /* 절대 위치를 위한 부모 컴포넌트 설정 */
  /* 크롬에서 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바 두께 설정 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; /* 스크롤바 핸들의 단일 색상 설정 */
    border-radius: 12px; /* 핸들의 모서리를 둥글게 */
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); /* 핸들에 살짝 그림자 효과 추가 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #666; /* 마우스를 올렸을 때 색상 변경 */
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* 스크롤 트랙 배경을 투명하게 */
  }

  /* 스크롤 영역 포함하여 모서리 둥글게 처리 */
  clip-path: inset(0 round 8px); /* border-radius와 일치 */
`;

const NewsTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const MetaInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const DateInfo = styled.p`
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

const HeartIcon = styled.img`
  width: 25px;
  height: 22px;
  cursor: pointer;
`;

const NewsText = styled.div`
  line-height: 1.6;
  font-size: 16px;
`;

const NewsImage = styled.img`
  width: 100%; /* 이미지 크기 줄임 */
  height: 300px;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin-bottom: 20px;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 15px; /* 뉴스 콘텐츠의 우측 상단에 위치 */
  right: 10px;
`;

type ScrapDetailArticleProps = {
  newsItem: NewsItem;
};

const NewsDetailArticle: React.FC<ScrapDetailArticleProps> = ({ newsItem }) => {
  const [isScrapped, setIsScrapped] = useState(false);

  const toggleScrap = () => {
    setIsScrapped(!isScrapped);
  };

  return (
    <NewsContent>
      <HeartButton onClick={toggleScrap}>
        <HeartIcon
          src={isScrapped ? likeIcon : unlikeIcon} // 상태에 따라 이미지를 변경
          alt="찜 하트 아이콘"
        />
      </HeartButton>

      <NewsTitle>{newsItem.newsTitle}</NewsTitle>

      <MetaInfoContainer>
        <DateInfo>{formatDate(newsItem.newsPublishedAt)}</DateInfo>
        <Stats>
          <IconContainer>
            <ViewIcon src={viewIcon} alt="조회수 아이콘" />
            {newsItem.view}
          </IconContainer>
          <IconContainer>
            <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
            {newsItem.scrapCnt}
          </IconContainer>
        </Stats>
      </MetaInfoContainer>

      <Divider />

      <NewsText>
        <div>뉴스 소제목 자리</div>
        <div>뉴스 소제목 자리</div>
        <div>뉴스 소제목 자리</div>
      </NewsText>

      {newsItem.photoUrlList && newsItem.photoUrlList.length > 0 ? (
        <NewsImage src={newsItem.photoUrlList[0]} alt="News" />
      ) : (
        <div>이미지가 없습니다.</div>
      )}

      <NewsText>
        {newsItem.newsContent}
        <div>뉴스 내용 자리</div>
        <div>뉴스 내용 자리</div>
        <div>뉴스 내용 자리</div>
        <div>뉴스 내용 자리</div>
        <div>뉴스 내용 자리</div>
        <div>뉴스 내용 자리</div>
        <div>뉴스 내용 자리</div>
      </NewsText>
    </NewsContent>
  );
};

export default NewsDetailArticle;
