import React from "react";
import styled from "styled-components";
import viewIcon from "@assets/view.png";
import scrapCntIcon from "@assets/scrapCnt.png";
import { NewsDetailItem } from "../../../types/newsTypes";
import LikeButton from "./LikeButton"; // LikeButton 컴포넌트 임포트

const NewsContent = styled.div`
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

const NewsImage = styled.img`
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin-bottom: 20px;
`;

type ScrapDetailArticleProps = {
  newsDetailItem: NewsDetailItem;
};

const NewsDetailArticle: React.FC<ScrapDetailArticleProps> = ({
  newsDetailItem,
}) => {
  return (
    <NewsContent>
      <LikeButton newsId={newsDetailItem.newsId} /> {/* LikeButton 사용 */}
      <NewsTitle>{newsDetailItem.newsTitle}</NewsTitle>
      <MetaInfoContainer>
        <InfoGroup>
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
      {/* <NewsText>
        <div>뉴스 소제목 자리</div>
      </NewsText>
      {newsDetailItem.newsPhoto && newsDetailItem.newsPhoto.length > 0 ? (
        <NewsImage src={newsDetailItem.newsPhoto[0]} alt="News" />
      ) : (
        <div>이미지가 없습니다.</div>
      )} */}
      <NewsText
        dangerouslySetInnerHTML={{ __html: newsDetailItem.newsContent }} // HTML로 렌더링
      />
    </NewsContent>
  );
};

export default NewsDetailArticle;
