import styled from "styled-components";
import { ScrapData } from "../../types/scrapTypes"; // ScrapData 타입 import
import viewIcon from "@assets/view.png";
import scrapCntIcon from "@assets/scrapCnt.png";
import { industry } from "@common/Industry";

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
  cursor: pointer; /* 클릭 가능한 커서 추가 */
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
  display: inline-block;
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
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const ScrapCntIcon = styled.img`
  width: 13px;
  height: 16px;
  margin-right: 5px;
`;

const ScrapList: React.FC<{
  scrapList: ScrapData[];
  onScrapClick: (newsId: number) => void;
}> = ({ scrapList, onScrapClick }) => {
  const getIndustryName = (industryId: number): string => {
    const matchedCategory = industry.find(
      (ind) => ind.industryId === industryId
    );
    return matchedCategory ? matchedCategory.industryName : "알 수 없음";
  };

  return (
    <GridContainer>
      {scrapList.map((scrap) => (
        <NewsItemContainer
          key={scrap.newsId}
          onClick={() => onScrapClick(scrap.newsId)} // 클릭 시 onNewsClick 호출
        >
          <FlexContainer>
            {scrap.photolist && (
              <Image src={scrap.photolist[0]} alt="이미지가 없습니다." />
            )}
            <TextContainer>
              <IndustryId>{getIndustryName(scrap.industryId)}</IndustryId>
              <NewsTitle>{scrap.newsTitle}</NewsTitle>
              <InfoRow>
                {/* <span>{scrap.newsCompany}</span> */}
                <span>{formatDate(scrap.createdAt)}</span>
              </InfoRow>
              <StatsRow>
                <span>
                  <ViewIcon src={viewIcon} alt="조회수 아이콘" />
                  {/* {scrap.view} */}
                </span>
                <span>
                  <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
                  {/* {scrap.scrapCnt} */}
                </span>
              </StatsRow>
            </TextContainer>
          </FlexContainer>
        </NewsItemContainer>
      ))}
    </GridContainer>
  );
};

export default ScrapList;
