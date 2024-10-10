import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  NewsDetailRcmdWrapper,
  NewsContent,
  NewsTitle,
  IndustryId,
  OriginalNews,
  MetaInfoContainer,
  InfoGroup,
  Info,
  Stats,
  IconContainer,
  ViewIcon,
  ScrapCntIcon,
  NewsText,
  Divider,
} from "./NewsDetailArticleStyles";
import NewsDetailRcmd from "./NewsDetailRcmd";

const formatDate = (dateString: string) => {
  const date = new Date(dateString); // 문자열을 Date 객체로 변환
  const year = date.getFullYear(); // 년도 추출
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 추출 (1월이 0이므로 +1), 두 자리로 맞추기
  const day = String(date.getDate()).padStart(2, "0"); // 일 추출, 두 자리로 맞추기

  const hours = String(date.getHours()).padStart(2, "0"); // 시 추출, 두 자리로 맞추기
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분 추출, 두 자리로 맞추기

  return `${year}-${month}-${day} ${hours}:${minutes}`; // "년-월-일 시:분" 형식으로 반환
};

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
  return matchedCategory ? matchedCategory.industryName : "미분류 산업";
};

// 전체 문서에서의 글로벌 오프셋을 계산하는 함수
const getGlobalOffset = (node: Node, offsetInNode: number): number => {
  let globalOffset = 0;
  const walker = document.createTreeWalker(
    document.getElementById("newsText") as Node, // 전체 뉴스 콘텐츠 영역
    NodeFilter.SHOW_TEXT, // 텍스트 노드만 순회
    null
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

const applyHighlightsFromApi = (
  contentElement: HTMLElement,
  highlights: HighlightItem[],
  dispatch: any,
  setHighlightedElement: (element: HTMLElement | null) => void
) => {
  highlights.forEach(({ startPos, endPos, color }) => {
    const walker = document.createTreeWalker(
      contentElement,
      NodeFilter.SHOW_TEXT,
      null
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
      span.dataset.startPos = String(startPos);
      span.dataset.endPos = String(endPos);

      span.appendChild(range.extractContents());
      range.insertNode(span);

      setHighlightedElement(span);

      dispatch(
        addHighlight({
          startPos,
          endPos,
          color, // 서버에서 받은 하이라이트의 color (이미 R, Y, G, B로 저장되어 있음)
        })
      );
    }
  });
};

const NewsDetailArticle: React.FC<ScrapDetailArticleProps> = ({
  newsDetailItem,
}) => {
  const dispatch = useDispatch();
  const highlights = useSelector(
    (state: RootState) => state.highlight.highlights
  );
  const [isHighlightPopupVisible, setIsHighlightPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [highlightedElement, setHighlightedElement] =
    useState<HTMLElement | null>(null);

  const newsTextRef = useRef<HTMLDivElement | null>(null);

  // scrapId에 따라 하이라이트 처리 방식 결정
  useEffect(() => {
    if (
      newsDetailItem.scrapId !== null &&
      newsDetailItem.scrapId !== undefined
    ) {
      // scrapId가 있는 경우 서버에서 하이라이트 정보 가져오기
      const fetchHighlights = async () => {
        try {
          // 기존 Redux에 있는 하이라이트 초기화
          dispatch(clearHighlights());

          const highlightsFromApi = await getScrapHighlights(
            newsDetailItem.scrapId as number
          );
          console.log("형광펜 불러오기 :", highlightsFromApi);
          const contentElement = document.getElementById("newsText");
          if (contentElement) {
            applyHighlightsFromApi(
              contentElement,
              highlightsFromApi,
              dispatch,
              setHighlightedElement
            );
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
    console.log("Current highlights in Redux:", highlights);
  }, [highlights, newsDetailItem.scrapId]);

  const handleTitleClick = () => {
    window.open(newsDetailItem.newsUrl, "_blank"); // 새 창에서 링크 열기
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
        const parentStartPos =
          range.startContainer.parentElement.dataset.startPos;
        const parentEndPos = range.startContainer.parentElement.dataset.endPos;

        if (parentStartPos && parentEndPos) {
          // 기존 하이라이트가 있을 경우 색상만 업데이트
          dispatch(
            updateHighlight({
              startPos: Number(parentStartPos),
              endPos: Number(parentEndPos),
              color: colorToLetterMap[color as ColorKeys],
            })
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
    const handleMouseUp = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        const selectedTextLength = selection.toString().length;

        // 선택된 텍스트가 한 글자보다 작거나 형광펜 적용된 부분이 아니면 팝업을 숨김
        if (selectedTextLength < 1 && target.tagName !== "BUTTON") {
          setIsHighlightPopupVisible(false);
          return;
        }

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

    const newsContentElement = newsTextRef.current;
    if (newsContentElement) {
      newsContentElement.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (newsContentElement) {
        newsContentElement.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, []);

  useEffect(() => {
    const handleHighlightClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.style.backgroundColor) {
        target.style.cursor = "pointer";

        // 클릭된 하이라이트된 요소를 저장
        setHighlightedElement(target);

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
    <>
      <NewsContent id="newsContent">
        <LikeButton newsId={newsDetailItem.newsId} /> {/* LikeButton 사용 */}
        {/* 뉴스 제목 클릭 시 새 창으로 이동 */}
        <NewsTitle>{newsDetailItem.newsTitle}</NewsTitle>
        <MetaInfoContainer>
          <InfoGroup>
            <Info>
              <IndustryId>
                {getIndustryName(newsDetailItem.industryId)}
              </IndustryId>
            </Info>
            <Info>{newsDetailItem.newsCompany}</Info>
            <Info>{formatDate(newsDetailItem.newsPublishedAt)}</Info>
            <Info>
              <OriginalNews onClick={handleTitleClick}>뉴스원문</OriginalNews>
            </Info>
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
        <NewsText
          id="newsText"
          ref={newsTextRef}
          dangerouslySetInnerHTML={{ __html: newsDetailItem.newsContent }}
        />
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
      {/* NewsDetailRcmdWrapper로 감싸서 위치 조정 */}
      <NewsDetailRcmdWrapper>
        <NewsDetailRcmd
          newsId={newsDetailItem.newsId}
          newsDetailItem={newsDetailItem}
        />
      </NewsDetailRcmdWrapper>
    </>
  );
};

export default NewsDetailArticle;
