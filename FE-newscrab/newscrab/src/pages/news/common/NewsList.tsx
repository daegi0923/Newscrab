import styled from "styled-components";
import { NewsItem } from "../../../types/newsTypes"; // 타입을 가져옴
import viewIcon from "@assets/view.png";
import scrapCntIcon from "@assets/scrapCnt.png";

// "T"를 공백으로 치환하는 간단한 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  return dateString.replace("T", " ");
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;

const NewsItemContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 80px;
  border-radius: 8px;
  margin-right: 16px;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const IndustryId = styled.div`
  font-size: 12px;
  color: #555;
  padding: 2px 8px;
  border: 1px solid #555;
  border-radius: 20px;
  display: inline-block; /* 텍스트 길이에 맞게 크기를 설정 */
  text-align: center;
  font-weight: bold;
`;

const NewsTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 15px;
`;

const InfoRow = styled.div`
  display: flex;
  font-size: 14px;
  color: #777;
  gap: 10px;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  font-size: 12px;
  color: #999;
`;

const ViewIcon = styled.img`
  width: 16px; /* 아이콘 크기 */
  height: 16px;
  margin-right: 5px; /* 아이콘과 텍스트 사이의 간격 */
`;

const ScrapCntIcon = styled.img`
  width: 13px; /* 아이콘 크기 */
  height: 16px;
  margin-right: 5px; /* 아이콘과 텍스트 사이의 간격 */
`;

// 뉴스 리스트를 렌더링하는 컴포넌트
const NewsList: React.FC<{ newsList: NewsItem[] }> = ({ newsList }) => {
  return (
    <GridContainer>
      {newsList.map((news) => (
        <NewsItemContainer key={news.newsId}>
          <FlexContainer>
            {news.photoUrlList && (
              <Image src={news.photoUrlList[0]} alt="이미지가 없습니다." />
            )}
            <TextContainer>
              <IndustryId>산업 {news.industryId}</IndustryId>
              <NewsTitle>{news.newsTitle}</NewsTitle>
              <InfoRow>
                <span>{news.newsCompany}</span>
                <span>{formatDate(news.createdAt)}</span>
              </InfoRow>
              <StatsRow>
                <span>
                  <ViewIcon src={viewIcon} alt="조회수 아이콘" />
                  {news.view}
                </span>
                <span>
                  <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
                  {news.scrapCnt}
                </span>
              </StatsRow>
            </TextContainer>
          </FlexContainer>
        </NewsItemContainer>
      ))}
    </GridContainer>
  );
};

export default NewsList;
