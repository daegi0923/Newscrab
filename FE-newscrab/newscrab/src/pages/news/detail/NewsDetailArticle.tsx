import React, { useState, useEffect } from "react";
import styled from "styled-components";
import viewIcon from "@assets/view.png";
import scrapCntIcon from "@assets/scrapCnt.png";
import { NewsDetailItem } from "../../../types/newsTypes";
import LikeButton from "../common/LikeButton"; // LikeButton 컴포넌트 임포트
import { industry } from "@common/Industry"; // 산업 데이터를 가져오기
import HighlightComponent from "../../scrap/highlight/HighlightComponent";

// 스타일 정의
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
  user-select: text;
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


// getIndustryName 함수를 정의하여 industryId를 이용해 산업 이름을 가져오는 함수
const getIndustryName = (industryId: number): string => {
  const matchedCategory = industry.find((ind) => ind.industryId === industryId);
  return matchedCategory ? matchedCategory.industryName : "알 수 없음";
};



const NewsDetailArticle: React.FC<ScrapDetailArticleProps> = ({ newsDetailItem }) => {
  const [isHighlightPopupVisible, setIsHighlightPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleTitleClick = () => {
    window.open(newsDetailItem.newsUrl, "_blank"); // 새 창에서 링크 열기
  };

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
        
        // 뉴스 기사 컨텐츠 내부의 스크롤을 반영하기 위해 offsetTop과 scrollTop 값을 더해줍니다.
        const newsContentElement = document.getElementById("newsContent");
        if (newsContentElement) {
          const newsContentRect = newsContentElement.getBoundingClientRect();
          
          // 전체 화면의 scrollY를 빼고, 뉴스 컨텐츠의 내부 스크롤 값을 더해서 계산
          const popupWidth = 120; // 팝업 너비 (HighlightComponent의 가로 크기)
          const adjustedTop = rect.top + newsContentElement.scrollTop - newsContentRect.top - 50; // 드래그 상단에 위치
          const adjustedLeft = rect.left + newsContentElement.scrollLeft - (popupWidth / 2) + (rect.width / 2); // 가로 중앙 정렬
  
          setPopupPosition({
            top: adjustedTop,
            left: adjustedLeft,
          });
          setIsHighlightPopupVisible(true);
        }
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
      <LikeButton newsId={newsDetailItem.newsId} /> {/* LikeButton 사용 */}
      {/* 뉴스 제목 클릭 시 새 창으로 이동 */}
      <NewsTitle onClick={handleTitleClick}>
        {newsDetailItem.newsTitle}
      </NewsTitle>
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
