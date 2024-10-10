import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import scrollbar from "@components/common/ScrollBar";
import viewIcon from "@assets/hot.png";
import scrapCntIcon from "@assets/scrap.png";
import crab from "@assets/crab.png";
import { ArticleDetailItem } from "../../../types/articleTypes"; // 수정된 타입
// import LikeButton from "@pages/news/common/LikeButton";
import ArticleScrapLike from "./ArticleScrapLike "; // 경로 수정
import { getArticleDetail } from "@apis/article/articleDetailApi"; // 수정된 API
import { deleteArticle } from "@apis/article/articleApi";
import { industry } from "@common/Industry"; // 산업 데이터를 가져오기
import Swal from "sweetalert2";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
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
  max-height: 680px;
  min-height: 680px;
  overflow-y: auto;
  position: relative;
  ${scrollbar}
  user-select: text;
  font-family: "SUIT Variable";
  font-weight: 400;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: #d32f2f;
  }
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

const NewsText = styled.div`
  line-height: 1.6;
  font-size: 16px;
  margin-top: 20px;
  // font-family: "SUIT Variable";

  img {
    max-width: 100%;
    width: auto;
    height: auto;
    max-width: 750px; /* 이미지의 최대 너비를 750px로 설정 */
  }
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
  // fontFamily: "SUIT Variable";
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CrabTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CrabIcon = styled.img`
  width: 25px;
  height: 22px;
`;

type ArticleScrapDetailProps = {
  articleId: number; // articleId를 prop으로 전달
};

const getIndustryName = (industryId: number): string => {
  const matchedCategory = industry.find((ind) => ind.industryId === industryId);
  return matchedCategory ? matchedCategory.industryName : "미분류 산업";
};

const ArticleScrapDetailArticle: React.FC<ArticleScrapDetailProps> = ({
  articleId,
}) => {
  const [articleDetail, setArticleDetail] = useState<ArticleDetailItem | null>(
    null
  ); // 기사 데이터를 저장
  const [showContent, setShowContent] = useState(false); // 기본으로 내용이 숨겨짐
  const [, setIsLoading] = useState<boolean>(true); // 로딩 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 기사 데이터를 가져오는 함수
  const fetchArticleDetail = async (articleId: number) => {
    try {
      const articleDataResponse = await getArticleDetail(articleId); // articleId를 인자로 전달
      setArticleDetail(articleDataResponse); // 데이터를 상태에 저장
    } catch (error) {
      console.error("기사 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchArticleDetail(articleId); // 컴포넌트 마운트 시 데이터 요청
  }, [articleId]);

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
        await deleteArticle(articleId);
        // 삭제 완료 후 알림
        await Swal.fire({
          icon: "success",
          title: "삭제 완료",
          text: "스크랩이 삭제되었습니다.",
        });
        // 삭제 후 목록 페이지로 이동
        navigate("/article");
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        // 삭제 실패 시 알림
        Swal.fire({
          icon: "error",
          title: "삭제 실패",
          text: "본인 작성한 게시글만 삭제할 수 있습니다.",
        });
      }
    }
  };

  const handleToggleClick = () => {
    setShowContent(!showContent);
  };

  const removeImagesFromContent = (htmlContent: string): string => {
    return htmlContent.replace(/<img[^>]*>/g, ""); // <img> 태그 제거
  };

  return (
    <>
      <ScrapContent>
        {articleDetail ? (
          <>
            {/* <LikeButton newsId={articleDetail.data.scrapResponseDto.newsId} /> */}
            <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
            {/* 토글 섹션 */}
            <NewsTitleWrapper>
              <ToggleButton onClick={handleToggleClick}>
                {showContent ? "▼" : "▶"}
              </ToggleButton>
              <NewsTitle>
                {articleDetail.data.scrapResponseDto.newsTitle}
              </NewsTitle>
            </NewsTitleWrapper>
            {/* 기사 상단 섹션 */}
            <MetaInfoContainer>
              <InfoGroup>
                <Info>
                  <IndustryId>
                    {getIndustryName(
                      articleDetail.data.scrapResponseDto.industryId
                    )}
                  </IndustryId>
                </Info>
                <Info>{articleDetail.data.scrapResponseDto.newsCompany}</Info>
                <Info>
                  {formatDate(articleDetail.data.scrapResponseDto.updatedAt)}
                </Info>
              </InfoGroup>
              <Stats>
                <span>👨‍🦲 {articleDetail.data.name}</span>
                <IconContainer>
                  <ViewIcon src={viewIcon} alt="조회수 아이콘" />
                  {articleDetail.data.scrapResponseDto.view}
                </IconContainer>
                <IconContainer>
                  <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
                  {articleDetail.data.scrapResponseDto.scrapCnt}
                </IconContainer>
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
                  __html: articleDetail.data.scrapResponseDto.newsContent ?? "",
                }}
              />
            ) : (
              <NewsTextPreview>
                <div
                  dangerouslySetInnerHTML={{
                    __html: removeImagesFromContent(
                      articleDetail.data.scrapResponseDto.newsContent ?? ""
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
              {articleDetail.data.scrapResponseDto.scrapSummary}
            </NewsText>
            <Divider />
            {/* 의견 섹션 */}
            <CrabTextWrapper>
              <CrabIcon src={crab} alt="게 아이콘" />
              <span style={{ fontWeight: "bold" }}>의견</span>
            </CrabTextWrapper>
            <NewsText>{articleDetail.data.scrapResponseDto.comment}</NewsText>
            <Divider />
            {/* ArticleScrapLike에 articleId와 initialLikeCount 전달 */}
            <ArticleScrapLike
              articleId={articleId}
              initialLikeCount={articleDetail.data.likeCnt}
            />
          </>
        ) : (
          <div>데이터를 불러오는 중입니다...</div>
        )}
      </ScrapContent>
    </>
  );
};

export default ArticleScrapDetailArticle;
