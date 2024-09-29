import React, { useState, useEffect } from "react";
import styled from "styled-components";
import viewIcon from "@assets/view.png";
import scrapCntIcon from "@assets/scrapCnt.png";
import { NewsDetailItem } from "../../../types/newsTypes";
import LikeButton from "./LikeButton";
import HighlightComponent from "../../scrap/highlight/HighlightComponent";

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
  user-select: text;
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
  gap: 10px;
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

type ScrapDetailArticleProps = {
  newsDetailItem: NewsDetailItem;
};

const NewsDetailArticle: React.FC<ScrapDetailArticleProps> = ({ newsDetailItem }) => {
  const [isHighlightPopupVisible, setIsHighlightPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // 드래그한 부분에 스타일을 적용하는 함수
  const applyHighlight = (color: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.backgroundColor = color;
      span.appendChild(range.extractContents()); // 기존 내용 추출
      range.insertNode(span); // span으로 감싸기
      selection.removeAllRanges(); // 선택 해제
      setIsHighlightPopupVisible(false); // 팝업 숨기기
    }
  };

  const removeHighlight = () => {
    // 기존 하이라이트 제거 기능을 추가하려면 여기에 로직을 구현
    setIsHighlightPopupVisible(false); // 팝업 숨기기
  };

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setPopupPosition({ top: rect.top + window.scrollY - 5, left: rect.left + window.scrollX });
        setIsHighlightPopupVisible(true);
      } else {
        setIsHighlightPopupVisible(false); // 선택이 없을 때 팝업 숨기기
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <NewsContent id="newsContent">
      <LikeButton newsId={newsDetailItem.newsId} />
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
      <NewsText dangerouslySetInnerHTML={{ __html: newsDetailItem.newsContent }} />
      {isHighlightPopupVisible && (
        <HighlightComponent
          applyHighlight={applyHighlight}
          removeHighlight={removeHighlight}
          style={{ top: popupPosition.top, left: popupPosition.left, position: "absolute" }}
        />
      )}
    </NewsContent>
  );
};

export default NewsDetailArticle;
