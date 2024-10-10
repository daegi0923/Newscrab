import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getArticleData } from "@apis/article/articleApi";
import { ArticleItem } from "../../../types/articleTypes";
// import viewIcon from "@assets/hot.png";
// import scrapCntIcon from "@assets/scrap.png";
import { industry } from "@common/Industry";
import scrollbar from "@common/ScrollBar"; // 스크롤바 스타일 적용

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Container = styled.div`
  padding-right: 5px;
  border-right: 1px solid #ddd;
`;

const ScrollableContainer = styled.div`
  padding: 0px 10px;
  max-height: 650px;
  overflow-y: auto;
  border-left: 1px solid #ddd;
  ${scrollbar}/* 커스텀 스크롤바 스타일 적용 */
`;

const RecentItemContainer = styled.div`
  padding: 0px 20px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100px;
  height: 71px;
  border-radius: 8px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 40px;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const TitleAndImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const IndustryId = styled.div`
  font-size: 12px;
  color: #555;
  padding: 2px 8px;
  border: 1px solid #666;
  background-color: #666;
  border-radius: 20px;
  display: inline-block;
  color: white;
  text-align: center;
  font-weight: bold;
  margin-right: 10px;
`;

const NewsTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0px;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const InfoRow = styled.div`
  display: flex;
  font-size: 14px;
  color: #777;
  gap: 10px;
`;

const ButtonAndStatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 10px;
  font-size: 14px;
  color: #999;
`;

// const ViewIcon = styled.img`
//   width: 12.45px;
//   height: 16px;
//   margin-right: 5px;
// `;

// const ScrapCntIcon = styled.img`
//   width: 16px;
//   height: 16px;
//   margin-right: 5px;
// `;

const NewsButton = styled.div`
  font-size: 14px;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const truncateTitle = (title: string) => {
  const maxLength = 35;
  return title.length > maxLength
    ? title.substring(0, maxLength) + "..."
    : title;
};

const HotSection: React.FC = () => {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articleData = await getArticleData();
        // likeCnt가 높은 순으로 정렬
        const sortedArticles = articleData.data.articleList.sort(
          (a, b) => b.likeCnt - a.likeCnt
        );
        setArticles(sortedArticles);
      } catch (error) {
        setError("기사를 가져오는 중 오류가 발생했습니다.");
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const getIndustryName = (industryId: number): string => {
    const matchedCategory = industry.find(
      (ind) => ind.industryId === industryId
    );
    return matchedCategory ? matchedCategory.industryName : "미분류 산업";
  };

  return (
    <Container>
      <ScrollableContainer>
        {articles.map((article) => (
          <RecentItemContainer key={article.articleId}>
            <FlexContainer>
              <TextContainer>
                <HorizontalWrapper>
                  <IndustryId>
                    {getIndustryName(article.scrapResponseDto.industryId)}
                  </IndustryId>
                  <InfoRow>
                    <span>{article.scrapResponseDto.newsCompany}</span>
                    <span>
                      {formatDate(article.scrapResponseDto.createdAt)}
                    </span>
                  </InfoRow>
                </HorizontalWrapper>

                <TitleAndImageWrapper>
                  <NewsTitle
                    onClick={() => handleArticleClick(article.articleId)}
                  >
                    {truncateTitle(article.scrapResponseDto.newsTitle)}
                  </NewsTitle>
                  {article.scrapResponseDto.photolist.length > 0 && (
                    <Image
                      src={article.scrapResponseDto.photolist[0]}
                      alt="이미지가 없습니다."
                    />
                  )}
                </TitleAndImageWrapper>

                <ButtonAndStatsWrapper>
                  <NewsButton
                    onClick={() => handleArticleClick(article.articleId)}
                  >
                    NewsCrab
                  </NewsButton>
                  <StatsRow>
                    <span>👨‍🦲 {article.name}</span>
                    <span>👍 {article.likeCnt}</span>
                    {/* <span>
                      <ViewIcon src={viewIcon} alt="조회수 아이콘" />
                      {article.scrapResponseDto.view}
                    </span>
                    <span>
                      <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
                      {article.scrapResponseDto.scrapCnt}
                    </span> */}
                  </StatsRow>
                </ButtonAndStatsWrapper>
              </TextContainer>
            </FlexContainer>
          </RecentItemContainer>
        ))}
      </ScrollableContainer>
    </Container>
  );
};

export default HotSection;
