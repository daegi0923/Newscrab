import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import scrollbar from "@components/common/ScrollBar";
import viewIcon from "@assets/hot.png";
import scrapCntIcon from "@assets/scrap.png";
import crab from "@assets/crab.png";
import { ScrapDetailResponse } from "../../../types/scrapTypes"; // scrap 타입 불러옴
import LikeButton from "@pages/news/common/LikeButton"; // LikeButton 컴포트 임포트
import { industry } from "@common/Industry"; // 산업 데이터를 가져오기
import { getScrapDetail } from "@apis/scrap/scrapDetailApi"; // 스크랩 데이터를 가져오기 위한 API 호출
import { deleteScrap } from "@apis/scrap/scrapApi";

// 스타일 정의
const ScrapContent = styled.div`
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

const removeImagesFromContent = (htmlContent: string): string => {
  return htmlContent.replace(/<img[^>]*>/g, ""); // <img> 태그 제거
};

type ScrapDetailArticleProps = {
  scrapId: number; // scrapId를 prop으로 전달
};

// getIndustryName 함수를 정의하여 industryId를 이용해 산업 이름을 가져오는 함수
const getIndustryName = (industryId: number): string => {
  const matchedCategory = industry.find((ind) => ind.industryId === industryId);
  return matchedCategory ? matchedCategory.industryName : "알 수 없음";
};

const ScrapDetailArticle: React.FC<ScrapDetailArticleProps> = ({ scrapId }) => {
  const [scrapDetail, setScrapDetail] = useState<ScrapDetailResponse | null>(
    null
  ); // 스크랩 데이터를 저장
  const [showContent, setShowContent] = useState(false); // 디폴트로 안 보이도록 설정
  const [, setIsLoading] = useState<boolean>(true); // 로딩 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 스크랩 데이터를 가져오는 함수
  const fetchScrapDetail = async (scrapId: number) => {
    try {
      const scrapDataResponse = await getScrapDetail(scrapId); // scrapId를 인자로 전달
      setScrapDetail(scrapDataResponse); // 데이터를 상태에 저장
    } catch (error) {
      console.error("스크랩 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleEditClick = () => {
    // 수정 페이지로 이동하거나 수정 모드를 활성화
    navigate(`/news/${scrapDetail?.newsId}`); // 수정 페이지로 이동
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("정말로 이 스크랩을 삭제하시겠습니까?");
    if (confirmed) {
      try {
        // 삭제 API 호출
        await deleteScrap(scrapId); // 삭제 API 함수 호출
        alert("스크랩이 삭제되었습니다.");
        navigate("/scrap"); // 삭제 후 목록 페이지로 이동
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    fetchScrapDetail(scrapId); // 컴포넌트 마운트 시 데이터 요청
  }, [scrapId]);

  const handleToggleClick = () => {
    setShowContent(!showContent);
  };

  const handleTitleClick = () => {
    navigate(`/news/${scrapDetail?.newsId}`); // 원문기사로 이동
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
            <NewsTitle onClick={handleTitleClick}>
              {scrapDetail.newsTitle}
            </NewsTitle>
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
              <Info>{scrapDetail.updatedAt.replace("T", " ")}</Info>{" "}
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
              dangerouslySetInnerHTML={{
                __html: scrapDetail?.newsContent ?? "",
              }}
            />
          ) : (
            <NewsTextPreview>
              <div
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
          <NewsText>
            {scrapDetail.scrapSummary
              ? scrapDetail.scrapSummary
              : "요약이 없습니다."}
          </NewsText>
          <Divider />

          {/* 의견 섹션 */}
          <CrabTextWrapper>
            <CrabIcon src={crab} alt="게 아이콘" />
            <span style={{ fontWeight: "bold" }}>의견</span>
          </CrabTextWrapper>
          <NewsText>
            {scrapDetail.comment ? scrapDetail.comment : "의견이 없습니다."}
          </NewsText>
          <Divider />
        </>
      ) : (
        <div>데이터를 불러오는 중입니다...</div>
      )}
    </ScrapContent>
  );
};

export default ScrapDetailArticle;
