import styled from "styled-components";
import { ScrapData } from "../../types/scrapTypes"; // ScrapData 타입 import
import viewIcon from "@assets/hot.png";
import scrapCntIcon from "@assets/scrap.png";
import { industry } from "@common/Industry";

const formatDate = (dateString: string) => {
  const date = new Date(dateString); // 문자열을 Date 객체로 변환
  const year = date.getFullYear(); // 년도 추출
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 추출 (1월이 0이므로 +1), 두 자리로 맞추기
  const day = String(date.getDate()).padStart(2, "0"); // 일 추출, 두 자리로 맞추기
  return `${year}-${month}-${day}`; // "년-월-일" 형식으로 반환
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열로 설정 */
  gap: 15px; /* gap을 줄여 요소 간의 간격을 줄임 */
  padding: 20px 100px; /* 패딩을 줄여 높이를 줄임 */
`;

const ScrapItemContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  min-height: 150px; /* 최소 높이 줄임 */
  background-color: white;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start; /* 텍스트 컨테이너를 이미지 하단으로 이동 */
`;

const Image = styled.img`
  width: 160px; /* 너비 확대 */
  height: 150px; /* 높이 확대 */
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
  margin-right: 8px;
  margin-bottom: 4px;
`;

const NewsTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 15px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-start;
  font-size: 14px;
  color: #777;
  gap: 10px;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between; /* ReadMoreButton과 아이콘 그룹 사이를 수평 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px; /* 아이템 간 간격 설정 */
  margin-top: 15px;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 10px; /* ViewIcon과 ScrapCntIcon 사이의 간격 */
  align-items: center; /* 아이콘과 텍스트의 세로 중앙 정렬 */
  font-size: 14px;
  color: #999;
`;

const ViewIcon = styled.img`
  width: 12.45px;
  height: 16px;
  margin-right: 5px;
`;

const ScrapCntIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const ReadMoreButton = styled.button`
  background-color: #e0c7ff;
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d1b3ff; /* 호버 시 색상 변화 */
  }
`;

// 제목 자르기 함수 - 30자 이상이면 '...'으로 자름
const truncateTitle = (title: string) => {
  const maxLength = 22; // 최대 글자 수를 30으로 고정
  return title.length > maxLength
    ? title.substring(0, maxLength) + "..."
    : title;
};

const ScrapList: React.FC<{
  scrapList: ScrapData[];
  onScrapClick: (scrapId: number) => void; // 여기에서 scrapId를 전달하는 것으로 수정
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
        <ScrapItemContainer
          key={scrap.scrapId} // key를 scrapId로 설정
        >
          <FlexContainer>
            {scrap.photolist && (
              <Image src={scrap.photolist[0]} alt="이미지가 없습니다." />
            )}
            <TextContainer>
              <NewsTitle>
                <IndustryId>{getIndustryName(scrap.industryId)}</IndustryId>
                {truncateTitle(scrap.newsTitle)}
              </NewsTitle>
              <InfoRow>
                <span>{scrap.newsCompany}</span>
                <span>{formatDate(scrap.createdAt)}</span>
              </InfoRow>
              <StatsRow>
                <ReadMoreButton onClick={() => onScrapClick(scrap.scrapId)}>
                  Read More
                </ReadMoreButton>
                <IconGroup>
                  <span>
                    <ViewIcon src={viewIcon} alt="조회수 아이콘" />
                    {scrap.view}
                  </span>
                  <span>
                    <ScrapCntIcon src={scrapCntIcon} alt="스크랩수 아이콘" />
                    {scrap.scrapCnt}
                  </span>
                </IconGroup>
              </StatsRow>
            </TextContainer>
          </FlexContainer>
        </ScrapItemContainer>
      ))}
    </GridContainer>
  );
};

export default ScrapList;
