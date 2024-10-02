import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector  } from "react-redux";
import { RootState } from "@store/index";
import { addHighlight, removeHighlight, clearHighlights} from "@store/highlight/highlightSlice";
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
  min-height: 680px;
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

const colorToLetterMap = {
  "#fde2e4": "R", // Red
  "#ffffb5": "Y", // Yellow
  "#d1e6d3": "G", // Green
  "#cddafd": "B", // Blue
} as const;

type ColorKeys = keyof typeof colorToLetterMap;

type ScrapDetailArticleProps = {
  newsDetailItem: NewsDetailItem;
};


// getIndustryName 함수를 정의하여 industryId를 이용해 산업 이름을 가져오는 함수
const getIndustryName = (industryId: number): string => {
  const matchedCategory = industry.find((ind) => ind.industryId === industryId);
  return matchedCategory ? matchedCategory.industryName : "알 수 없음";
};




const NewsDetailArticle: React.FC<ScrapDetailArticleProps> = ({ newsDetailItem }) => {
  const dispatch = useDispatch();
  const highlights = useSelector((state: RootState) => state.highlight.highlights);

  // Redux 상태 출력 (디버깅 용도)
  useEffect(() => {
    console.log("Current highlights in Redux:", highlights);
  }, [highlights]); // highlights가 업데이트될 때마다 로그 출력

  const [isHighlightPopupVisible, setIsHighlightPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  
  const handleTitleClick = () => {
    window.open(newsDetailItem.newsUrl, "_blank"); // 새 창에서 링크 열기
  };

  // 전체 문서에서의 글로벌 오프셋을 계산하는 함수
  const getGlobalOffset = (node: Node, offsetInNode: number): number => {
    let globalOffset = 0;
    const walker = document.createTreeWalker(
      document.getElementById("newsContent") as Node, // 전체 뉴스 콘텐츠 영역
      NodeFilter.SHOW_TEXT, // 텍스트 노드만 순회
      null,
    );

    let currentNode;
    while ((currentNode = walker.nextNode())) {
      if (currentNode === node) {
        return globalOffset + offsetInNode;
      }
      globalOffset += currentNode.textContent?.length || 0;
    }
    return globalOffset;
  };

  // 드래그한 부분에 스타일을 적용하는 함수
  const applyHighlight = (color: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      // 전체 문서에서의 시작과 끝 오프셋을 계산
      const startPos = getGlobalOffset(range.startContainer, range.startOffset);
      const endPos = getGlobalOffset(range.endContainer, range.endOffset);

      const span = document.createElement("span");

      // 하이라이트에 startPos와 endPos를 dataset에 저장
      span.dataset.startPos = String(startPos);
      span.dataset.endPos = String(endPos);

      if (range.startContainer.parentElement?.style.backgroundColor) {
        // 기존 하이라이트의 색상 변경
        range.startContainer.parentElement.style.backgroundColor = color;
      } else {
        // 새로운 하이라이트 생성
        span.style.backgroundColor = color;
        span.appendChild(range.extractContents()); // 기존 내용 추출
        range.insertNode(span); // span으로 감싸기
      }

      // Redux에 하이라이트 추가 (R, Y, G, B로 저장)
      const mappedColor = colorToLetterMap[color as ColorKeys];
      if (mappedColor) {
        dispatch(
          addHighlight({
            startPos,
            endPos,
            color: mappedColor,
          })
        );
      }

      selection.removeAllRanges(); // 선택 해제
      setIsHighlightPopupVisible(false);
    }
  };

  // 페이지를 벗어날 때 store를 비우기
  useEffect(() => {
    return () => {
      dispatch(clearHighlights());
    };
  }, [dispatch]);

  // 하이라이트를 삭제하는 함수
  const removeHighlightHandler = () => {
    if (highlightedElement) {
      const startPos = highlightedElement.dataset.startPos;
      const endPos = highlightedElement.dataset.endPos;

      if (startPos !== undefined && endPos !== undefined) {
        highlightedElement.replaceWith(...highlightedElement.childNodes);

        dispatch(removeHighlight({ startPos: Number(startPos), endPos: Number(endPos) }));
      }

      setIsHighlightPopupVisible(false);
      setHighlightedElement(null);
    } else {
      setIsHighlightPopupVisible(false);
    }
  };

  


  const closePopup = () => {
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


  useEffect(() => {
    const handleHighlightClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.style.backgroundColor) {
        target.style.cursor = "pointer";

        // 클릭된 하이라이트된 요소를 저장
        setHighlightedElement(target);

        // 하이라이트된 부분 클릭 시 시작 위치와 끝 위치를 콘솔에 출력
        const startPos = target.dataset.startPos;
        const endPos = target.dataset.endPos;

        if (startPos && endPos) {
          console.log(`Highlight clicked! Start: ${startPos}, End: ${endPos}`);
        }

        // 하이라이트된 부분 클릭 시 팝업을 해당 위치에 표시
        const rect = target.getBoundingClientRect();
        
        // 뉴스 기사 컨텐츠 내부의 스크롤을 반영하기 위해 offsetTop과 scrollTop 값을 더해줍니다.
        const newsContentElement = document.getElementById("newsContent");
        if (newsContentElement) {
          const newsContentRect = newsContentElement.getBoundingClientRect();

          // 전체 화면의 scrollY를 빼고, 뉴스 컨텐츠의 내부 스크롤 값을 더해서 계산
          const popupWidth = 120; // 팝업 너비 (HighlightComponent의 가로 크기)
          const popupHeight = 40; // 팝업 높이

          // 클릭한 위치 바로 위에 팝업을 표시
          const adjustedTop = rect.top + newsContentElement.scrollTop - newsContentRect.top - popupHeight; // 클릭한 위치 위에 팝업 위치
          const adjustedLeft = rect.left + newsContentElement.scrollLeft - (popupWidth / 2) + (rect.width / 2); // 가로 중앙 정렬

          setPopupPosition({ top: adjustedTop, left: adjustedLeft });
          setIsHighlightPopupVisible(true);
        }
      }
    };

    document.addEventListener("mouseover", (event) => {
      const target = event.target as HTMLElement;
      if (target && target.style.backgroundColor) {
        target.style.cursor = "pointer"; // 하이라이트된 부분에 마우스 오버 시 커서 포인터로 변경
      }
    });
  
    document.addEventListener("click", handleHighlightClick);
    return () => {
      document.removeEventListener("click", handleHighlightClick);
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
          closePopup={closePopup}
          removeHighlight={removeHighlightHandler}
          style={{ top: popupPosition.top, left: popupPosition.left, position: "absolute" }}
        />
      )}
    </NewsContent>
  );
};

export default NewsDetailArticle;
