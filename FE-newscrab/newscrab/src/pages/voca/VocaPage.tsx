import React, { useState, useEffect } from 'react';
import GlobalStyle from "@components/GlobalStyle";
import VocaCommon from "@pages/voca/VocaCommon";
import Tab from "@components/voca/Tab";
import { tabOptions } from "@components/voca/TabOptions";
import styled from "styled-components";
import { words } from "@components/voca/VocaList";
import AdImage from "@components/common/Advertise";
import Card from "@components/voca/VocaCard";

interface MockWord {
  vocaId: number;
  industryId: number;
  vocaName: string;
  vocaDesc: string;
  sentence: string;
  originNewsId: number;
  createdAt: string;
  updatedAt: string;
  related_news_id1: number;
  related_news_id2: number;
  related_news_id3: number;
}

interface Word {
  industryId: number;
  industryName: string;
  img: string;
}

interface MockWordWithImages extends MockWord {
  img: string | null;
  industryName: string | null;
}

const mockWords = [
  { vocaId: 2, industryId: 4, vocaName: "치코리타", vocaDesc: "치코리타입니다.", originNewsId: 102, sentence: "바이오헬스 산업이 급성장 중입니다.", createdAt: "2024-06-07T12:00:00", updatedAt: "2024-06-07T12:00:00", related_news_id1: 204, related_news_id2: 205, related_news_id3: 206 }, 
  { vocaId: 1, industryId: 2, vocaName: "LNG선", vocaDesc: "LNG선입니다.", originNewsId: 101, sentence: "조선업이 호황을 맞고 있습니다.", createdAt: "2024-05-07T12:00:00", updatedAt: "2024-05-07T12:00:00", related_news_id1: 201, related_news_id2: 202, related_news_id3: 203 }, 
  { vocaId: 3, industryId: 9, vocaName: "오트밀", vocaDesc: "오트밀입니다.", originNewsId: 103, sentence: "금융 시장의 변동성이 큽니다.", createdAt: "2024-07-07T12:00:00", updatedAt: "2024-07-07T12:00:00", related_news_id1: 207, related_news_id2: 208, related_news_id3: 209 },
  { vocaId: 5, industryId: 4, vocaName: "꼬숨이", vocaDesc: "꼬숨이입니다.", originNewsId: 105, sentence: "철강 산업의 생산량이 증가하고 있습니다.", createdAt: "2024-09-07T12:00:00", updatedAt: "2024-09-07T12:00:00", related_news_id1: 213, related_news_id2: 214, related_news_id3: 215 }, 
  { vocaId: 7, industryId: 8, vocaName: "전기차", vocaDesc: "전기차입니다.", originNewsId: 107, sentence: "전기차 시장이 빠르게 성장하고 있습니다.", createdAt: "2024-11-07T12:00:00", updatedAt: "2024-11-07T12:00:00", related_news_id1: 219, related_news_id2: 220, related_news_id3: 221 }, 
  { vocaId: 6, industryId: 11, vocaName: "컴퓨터 칩", vocaDesc: "컴퓨터 칩입니다.", originNewsId: 106, sentence: "반도체 산업의 수요가 급증하고 있습니다.", createdAt: "2024-10-07T12:00:00", updatedAt: "2024-10-07T12:00:00", related_news_id1: 216, related_news_id2: 217, related_news_id3: 218 },
  { vocaId: 4, industryId: 13, vocaName: "하리보", vocaDesc: "하리보입니다.", originNewsId: 104, sentence: "정유 업계의 수익이 증가하고 있습니다.", createdAt: "2024-08-07T12:00:00", updatedAt: "2024-08-07T12:00:00", related_news_id1: 210, related_news_id2: 211, related_news_id3: 212 },
  { vocaId: 8, industryId: 2, vocaName: "인공지능", vocaDesc: "인공지능입니다.", originNewsId: 108, sentence: "AI 기술이 다양한 산업에 도입되고 있습니다.", createdAt: "2024-12-07T12:00:00", updatedAt: "2024-12-07T12:00:00", related_news_id1: 222, related_news_id2: 223, related_news_id3: 224 } 
]; 

const SearchContainer = styled.div``;
const VocaContainer = styled.div`
  width: 70%;
  margin-right: 5%;
  margin-top: 2%;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 1%;
`;

const AdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const DropdownMenu = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  left: 19%;
  z-index: 100;
  width: 125px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  /* 숨겨진 기본 스크롤바 */
  scrollbar-width: thin; /* Firefox용 */
  scrollbar-color: #a0a0a0 transparent;

  /* 웹킷 브라우저용 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* 스크롤 트랙 숨기기 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d1d1d1; /* 스크롤바 색상 */
    border-radius: 10px; /* 둥근 모서리 */
    border: 2px solid transparent; /* 스크롤바와 트랙 사이 공간 */
    background-clip: padding-box; /* 스크롤바의 내부 패딩 설정 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #b0b0b0; /* 호버 시 스크롤바 색상 */
  }
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  color: #333; /* 더 부드러운 글자색 */
  transition: background-color 0.2s ease-in-out; /* 부드러운 hover 전환 */

  &:hover {
    background-color: #f1f1f1;
    border-radius: 4px; /* hover 시 모서리 둥글게 */
  }
`;

// 데이터 매핑 함수: mockWords의 industryId와 words 배열의 industryId를 매칭
const mapWordsWithImages = (mockWords: MockWord[], words: Word[]): MockWordWithImages[] => {
  return mockWords.map((mockWord) => {
    const matchedWord = words.find((word) => word.industryId === mockWord.industryId);
    return { 
      ...mockWord, 
      img: matchedWord ? matchedWord.img : null, 
      industryName: matchedWord ? matchedWord.industryName : null }; // 있으면 추가, 없으면 null
  });
};

const VocaPage: React.FC = () => {
  const mappedWords: MockWordWithImages[] = mapWordsWithImages(mockWords, words);
  const [filter, setFilter] = useState<string>('mainVoca');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(null);
  const [sortedWords, setSortedWords] = useState<MockWordWithImages[]>(mappedWords);

  const sortWords = (filterType: string, wordsToSort: MockWordWithImages[]): MockWordWithImages[] => {
    let sorted;
    if (filterType === 'mainVoca') {
      sorted = [...wordsToSort].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (filterType === 'orderVoca') {
      sorted = [...wordsToSort].sort((a, b) => a.vocaName.localeCompare(b.vocaName, 'ko-KR'));
    } else {
      sorted = wordsToSort;
    }
    return sorted;
  };

  const filterIndustry = (industryId: number | null) => {
    return industryId ? mappedWords.filter(word => word.industryId === industryId) : mappedWords;
  };

  useEffect(() => {
    const filterWords = filterIndustry(selectedIndustryId);
    setSortedWords(sortWords(filter, filterWords));
  }, [filter, selectedIndustryId, mappedWords]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (newFilter === 'filterVoca') {
      setDropdownOpen(!isDropdownOpen);
    } else {
      setDropdownOpen(false);
    }
  };

  const handleIndustrySelect = (industryId: number | null) => {
    setSelectedIndustryId(industryId);
    setDropdownOpen(false);
  };

  return (
    <div>
      <GlobalStyle />
      <VocaCommon />
      <SearchContainer>
        <AdContainer>
          <VocaContainer>
            <Tab options={tabOptions} onFilterChange={handleFilterChange} activeFilter={filter} />
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownItem onClick={() => handleIndustrySelect(null)}>전체</DropdownItem>
                {words.map((option) => (
                  <DropdownItem key={option.industryId} onClick={() => handleIndustrySelect(option.industryId)}>
                    {option.industryName}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
            <CardContainer>
              {sortedWords.map((word) => (
                <Card
                  key={word.vocaId}
                  img={word.img}
                  industryName={word.industryName}
                  vocaName={word.vocaName}
                  updatedAt={word.updatedAt}
                />
              ))}
            </CardContainer>
          </VocaContainer>
          <AdImage />
        </AdContainer>
      </SearchContainer>
    </div>
  );
};

export default VocaPage;
