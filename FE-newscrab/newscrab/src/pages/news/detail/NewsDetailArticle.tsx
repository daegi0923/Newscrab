import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { RootState } from "@store/index";
import {
  addHighlight,
  removeHighlight,
  updateHighlight,
  clearHighlights,
} from "@store/highlight/highlightSlice";
import viewIcon from "@assets/hot.png";
import scrapCntIcon from "@assets/scrap.png";
import { NewsDetailItem } from "../../../types/newsTypes";
import LikeButton from "../common/LikeButton"; // LikeButton 컴포넌트 임포트
import { industry } from "@common/Industry"; // 산업 데이터를 가져오기
import HighlightComponent from "../../scrap/highlight/HighlightComponent";
import { getScrapHighlights } from "@apis/highlight/highlightApi";
import { HighlightItem } from "../../../types/highlightTypes";
import { NewsContent, NewsTitle, IndustryId, MetaInfoContainer, InfoGroup, 
  Info, Stats, IconContainer, ViewIcon, ScrapCntIcon, NewsText, Divider } from "./NewsDetailArticleStyles";

const colorToLetterMap = {
  "#fde2e4": "R", // Red
  "#ffffb5": "Y", // Yellow
  "#d1e6d3": "G", // Green
  "#cddafd": "B", // Blue
} as const;

const letterToColorMap = {
  R: "#fde2e4", // Red
  Y: "#ffffb5", // Yellow
  G: "#d1e6d3", // Green
  B: "#cddafd", // Blue
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

const applyHighlightsFromApi = (contentElement: HTMLElement, highlights: HighlightItem[]) => {
  highlights.forEach(({ startPos, endPos, color }) => {
    const walker = document.createTreeWalker(
      contentElement,
      NodeFilter.SHOW_TEXT,
      null,
    );

    let currentPos = 0;
    let startNode: Node | null = null;
    let endNode: Node | null = null;
    let startOffset = 0;
    let endOffset = 0;

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const nodeLength = node.textContent?.length || 0;

      if (currentPos <= startPos && currentPos + nodeLength >= startPos) {
        startNode = node;
        startOffset = startPos - currentPos;
      }
      if (currentPos <= endPos && currentPos + nodeLength >= endPos) {
        endNode = node;
        endOffset = endPos - currentPos;
        break;
      }

      currentPos += nodeLength;
    }

    if (startNode && endNode) {
      const range = document.createRange();
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);

      const span = document.createElement("span");
      span.style.backgroundColor = letterToColorMap[color];
      span.appendChild(range.extractContents());
      range.insertNode(span);
    }
  });
};




const NewsDetailArticle: React.FC<ScrapDetailArticleProps> = ({ newsDetailItem }) => {
  const dispatch = useDispatch();
  const highlights = useSelector((state: RootState) => state.highlight.highlights);
  const [isHighlightPopupVisible, setIsHighlightPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [highlightedElement, setHighlightedElement] =
    useState<HTMLElement | null>(null);


  // scrapId에 따라 하이라이트 처리 방식 결정
  useEffect(() => {
    if (newsDetailItem.scrapId !== null && newsDetailItem.scrapId !== undefined) {
      // scrapId가 있는 경우 서버에서 하이라이트 정보 가져오기
      const fetchHighlights = async () => {
        try {
          const highlightsFromApi = await getScrapHighlights(newsDetailItem.scrapId as number);
          console.log("형광펜 불러오기 :",highlightsFromApi);
          const contentElement = document.getElementById("newsContent");
          if (contentElement) {
            applyHighlightsFromApi(contentElement, highlightsFromApi);
          }
        } catch (error) {
          console.error("Failed to fetch highlights from API:", error);
        }
      };
      fetchHighlights();
    } else {
      console.log("No scrapId, using Redux highlights.");
    }
  }, [newsDetailItem.scrapId, dispatch]);
  
  
  // Redux 상태 출력 (디버깅 용도)
  useEffect(() => {
    if (!newsDetailItem.scrapId) {
      console.log("Current highlights in Redux:", highlights);
    }
  }, [highlights, newsDetailItem.scrapId]);
  
  const handleTitleClick = () => {
    window.open(newsDetailItem.newsUrl, "_blank"); // 새 창에서 링크 열기
  };

  

  // 드래그한 부분에 스타일을 적용하는 함수
  const applyHighlight = (color: string) => {
    if (newsDetailItem.scrapId) {
      // scrapId가 있으면 하이라이트 추가를 막음
      return;
    }

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
        const parentStartPos =
          range.startContainer.parentElement.dataset.startPos;
        const parentEndPos = range.startContainer.parentElement.dataset.endPos;

        console.log(
          `Parent element startPos: ${parentStartPos}, endPos: ${parentEndPos}`
        );

        if (parentStartPos && parentEndPos) {
          // 기존 하이라이트가 있을 경우 색상만 업데이트
          dispatch(
            updateHighlight({
              startPos: Number(parentStartPos),
              endPos: Number(parentEndPos),
              color: colorToLetterMap[color as ColorKeys],
            })
          );
          console.log(
            `Updated highlight: startPos: ${parentStartPos}, endPos: ${parentEndPos}`
          );
        }
      } else {
        // 새로운 하이라이트 생성
        span.style.backgroundColor = color;
        span.appendChild(range.extractContents()); // 기존 내용 추출
        range.insertNode(span); // span으로 감싸기

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

        dispatch(
          removeHighlight({
            startPos: Number(startPos),
            endPos: Number(endPos),
          })
        );
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
          const adjustedTop =
            rect.top + newsContentElement.scrollTop - newsContentRect.top - 50; // 드래그 상단에 위치
          const adjustedLeft =
            rect.left +
            newsContentElement.scrollLeft -
            popupWidth / 2 +
            rect.width / 2; // 가로 중앙 정렬

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
          const adjustedTop =
            rect.top +
            newsContentElement.scrollTop -
            newsContentRect.top -
            popupHeight; // 클릭한 위치 위에 팝업 위치
          const adjustedLeft =
            rect.left +
            newsContentElement.scrollLeft -
            popupWidth / 2 +
            rect.width / 2; // 가로 중앙 정렬

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
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            position: "absolute",
          }}
        />
      )}
    </NewsContent>
  );
};

export default NewsDetailArticle;
