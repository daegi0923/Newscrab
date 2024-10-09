import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import scrollbar from "@components/common/ScrollBar";
import viewIcon from "@assets/hot.png";
import scrapCntIcon from "@assets/scrap.png";
import crab from "@assets/crab.png";
import { ScrapDetailResponse, Highlight } from "../../../types/scrapTypes"; // scrap 타입 불러옴
import LikeButton from "@pages/news/common/LikeButton"; // LikeButton 컴포트 임포트
import { industry } from "@common/Industry"; // 산업 데이터를 가져오기
import { getScrapDetail } from "@apis/scrap/scrapDetailApi"; // 스크랩 데이터를 가져오기 위한 API 호출
import { deleteScrap } from "@apis/scrap/scrapApi";
import Swal from "sweetalert2";

const formatDate = (dateString: string) => {
  const date = new Date(dateString); // 문자열을 Date 객체로 변환
  const year = date.getFullYear(); // 년도 추출
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 추출 (1월이 0이므로 +1), 두 자리로 맞추기
  const day = String(date.getDate()).padStart(2, "0"); // 일 추출, 두 자리로 맞추기

  const hours = String(date.getHours()).padStart(2, "0"); // 시 추출, 두 자리로 맞추기
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분 추출, 두 자리로 맞추기

  return `${year}-${month}-${day} ${hours}:${minutes}`; // "년-월-일 시:분" 형식으로 반환
};

// 스타일 정의
const ScrapContent = styled.div`
  width: 60%;
  padding-right: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px 100px;
  background-color: #fff;
  max-height: 750px;
  min-height: 750px;
  overflow-y: auto;
  position: relative;
  ${scrollbar}
  user-select: text;
`;

const NewsTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const NewsTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #666;
  position: absolute;
  left: -40px;
  top: 195%;
  transform: translateY(-50%);
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

const Info = styled.div`
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
  width: 12.45px;
  height: 16px;
`;

const ScrapCntIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const NewsText = styled.div`
  line-height: 1.6;
  font-size: 16px;
  margin-top: 20px;
`;

const NewsTextPreview = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 3줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.6;
  font-size: 16px;
  margin-top: 20px;
  white-space: normal;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CrabTextWrapper = styled.div`
  display: flex;
  align-items: center; /* 아이콘과 텍스트를 수평으로 정렬 */
  gap: 10px;
`;

const CrabIcon = styled.img`
  width: 25px;
  height: 22px;
`;

const letterToColorMap = {
  R: "#fde2e4", // Red
  Y: "#ffffb5", // Yellow
  G: "#d1e6d3", // Green
  B: "#cddafd", // Blue
} as const;

const applyHighlightsFromApi = (
  contentElement: HTMLElement,
  highlights: Highlight[]
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
    }
  });
};

const removeImagesFromContent = (htmlContent: string): string => {
  return htmlContent.replace(/<img[^>]*>/g, ""); // <img> 태그 제거
};

type ScrapDetailArticleProps = {
  scrapId: number; // scrapId를 prop으로 전달
};

// getIndustryName 함수를 정의하여 industryId를 이용해 산업 이름을 가져오는 함수
const getIndustryName = (industryId: number): string => {
  const matchedCategory = industry.find((ind) => ind.industryId === industryId);
  return matchedCategory ? matchedCategory.industryName : "미분류 산업";
};

const ScrapDetailArticle: React.FC<ScrapDetailArticleProps> = ({ scrapId }) => {
  const [scrapDetail, setScrapDetail] = useState<ScrapDetailResponse | null>(
    null
  ); // 스크랩 데이터를 저장
  const [showContent, setShowContent] = useState(false); // 디폴트로 안 보이도록 설정
  const [, setIsLoading] = useState<boolean>(true); // 로딩 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  const newsContentRef = useRef<HTMLDivElement | null>(null);

  // 스크랩 데이터를 가져오는 함수
  const fetchScrapDetail = async (scrapId: number) => {
    try {
      const scrapDataResponse = await getScrapDetail(scrapId); // scrapId를 인자로 전달
      setScrapDetail(scrapDataResponse); // 데이터를 상태에 저장

      console.log("Scrap detail loaded:", scrapDataResponse);
    } catch (error) {
      console.error("스크랩 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    if (scrapDetail && newsContentRef.current && scrapDetail.highlightList) {
      const contentElement = newsContentRef.current;

      // highlightList를 Highlight 형식으로 변환
      const highlights = scrapDetail.highlightList.map((highlight) => ({
        highlightId: highlight.highlightId,
        startPos: highlight.startPos,
        endPos: highlight.endPos,
        color: highlight.color,
      }));

      if (contentElement) {
        console.log("Applying highlights:", highlights);
        applyHighlightsFromApi(contentElement, highlights); // 변환된 highlights 전달
      }
    }
  }, [scrapDetail, showContent]);

  const handleEditClick = () => {
    // 수정 페이지로 이동하거나 수정 모드를 활성화
    navigate(`/news/${scrapDetail?.newsId}`); // 수정 페이지로 이동
  };

  const handleDeleteClick = async () => {
    // SweetAlert2로 삭제 확인 메시지 표시
    const confirmed = await Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "삭제 후에는 복구할 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    // 확인 버튼을 누르면 삭제 진행
    if (confirmed.isConfirmed) {
      try {
        // 삭제 API 호출
        await deleteScrap(scrapId);
        // 삭제 완료 후 알림
        await Swal.fire({
          icon: "success",
          title: "삭제 완료",
          text: "스크랩이 삭제되었습니다.",
        });
        // 삭제 후 목록 페이지로 이동
        navigate("/scrap");
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        // 삭제 실패 시 알림
        Swal.fire({
          icon: "error",
          title: "삭제 실패",
          text: "삭제 중 오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
    }
  };

  useEffect(() => {
    fetchScrapDetail(scrapId); // 컴포넌트 마운트 시 데이터 요청
  }, [scrapId]);

  const handleToggleClick = () => {
    setShowContent(!showContent);
  };

  const convertNewlinesToBr = (text: string): string => {
    return text.replace(/\n/g, "<br />");
  };

  return (
    <ScrapContent>
      {scrapDetail ? (
        <>
          <LikeButton newsId={scrapDetail.newsId} />

          {/* 토글 섹션 */}
          <NewsTitleWrapper>
            <ToggleButton onClick={handleToggleClick}>
              {showContent ? "▼" : "▶"}
            </ToggleButton>
            <NewsTitle>{scrapDetail.newsTitle}</NewsTitle>
          </NewsTitleWrapper>

          {/* 스크랩 상단 섹션 */}
          <MetaInfoContainer>
            {/* 산업군, 신문사, 발행일 */}
            <InfoGroup>
              <Info>
                <IndustryId>
                  {getIndustryName(scrapDetail.industryId)}
                </IndustryId>
              </Info>
              <Info>{scrapDetail.newsCompany}</Info>
              <Info>{formatDate(scrapDetail.updatedAt)} (수정 時)</Info>{" "}
            </InfoGroup>
            {/* 조회수, 스크랩수 아이콘 */}
            <Stats>
              <IconContainer>
                <ViewIcon src={viewIcon} alt="조회수 아이콘" />
                {scrapDetail.view}
              </IconContainer>
              <IconContainer>
                <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
                {scrapDetail.scrapCnt}
              </IconContainer>
              <EditButton onClick={handleEditClick}>수정</EditButton>
              <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
            </Stats>
          </MetaInfoContainer>
          <Divider />

          {/* 본문 섹션 */}
          <CrabTextWrapper>
            <CrabIcon src={crab} alt="게 아이콘" />
            <span style={{ fontWeight: "bold" }}>본문</span>
          </CrabTextWrapper>
          {showContent ? (
            <NewsText
              ref={newsContentRef}
              dangerouslySetInnerHTML={{
                __html: scrapDetail?.newsContent ?? "",
              }}
            />
          ) : (
            <NewsTextPreview>
              <div
                ref={newsContentRef}
                dangerouslySetInnerHTML={{
                  __html: removeImagesFromContent(
                    scrapDetail?.newsContent ?? ""
                  ),
                }}
              />
            </NewsTextPreview>
          )}
          <Divider />

          {/* 요약 섹션 */}
          <CrabTextWrapper>
            <CrabIcon src={crab} alt="게 아이콘" />
            <span style={{ fontWeight: "bold" }}>요약</span>
          </CrabTextWrapper>
          <NewsText
            dangerouslySetInnerHTML={{
              __html: scrapDetail.scrapSummary
                ? convertNewlinesToBr(scrapDetail.scrapSummary)
                : "요약이 없습니다.",
            }}
          />
          <Divider />

          {/* 의견 섹션 */}
          <CrabTextWrapper>
            <CrabIcon src={crab} alt="게 아이콘" />
            <span style={{ fontWeight: "bold" }}>의견</span>
          </CrabTextWrapper>
          <NewsText
            dangerouslySetInnerHTML={{
              __html: scrapDetail.comment
                ? convertNewlinesToBr(scrapDetail.comment)
                : "의견이 없습니다.",
            }}
          />
          <Divider />
        </>
      ) : (
        <div>데이터를 불러오는 중입니다...</div>
      )}
    </ScrapContent>
  );
};

export default ScrapDetailArticle;
