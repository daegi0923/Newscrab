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
  { vocaId: 2, vocaName: "치코리타", vocaDesc: "치코리타입니다.", originNewsId: 102, sentence: "바이오헬스 산업이 급성장 중입니다.", createdAt: "2024-06-07T12:00:00", updatedAt: "2024-06-07T12:00:00", related_news_id1: 204, related_news_id2: 205, related_news_id3: 206 },
  { vocaId: 1, vocaName: "LNG선", vocaDesc: "LNG선입니다.", originNewsId: 101, sentence: "조선업이 호황을 맞고 있습니다.", createdAt: "2024-05-07T12:00:00", updatedAt: "2024-05-07T12:00:00", related_news_id1: 201, related_news_id2: 202, related_news_id3: 203 },
  { vocaId: 3, vocaName: "오트밀", vocaDesc: "오트밀입니다.", originNewsId: 103, sentence: "금융 시장의 변동성이 큽니다.", createdAt: "2024-07-07T12:00:00", updatedAt: "2024-07-07T12:00:00", related_news_id1: 207, related_news_id2: 208, related_news_id3: 209 },
  { vocaId: 5, vocaName: "꼬숨이", vocaDesc: "꼬숨이입니다.", originNewsId: 105, sentence: "철강 산업의 생산량이 증가하고 있습니다.", createdAt: "2024-09-07T12:00:00", updatedAt: "2024-09-07T12:00:00", related_news_id1: 213, related_news_id2: 214, related_news_id3: 215 },
  { vocaId: 7, vocaName: "전기차", vocaDesc: "전기차입니다.", originNewsId: 107, sentence: "전기차 시장이 빠르게 성장하고 있습니다.", createdAt: "2024-11-07T12:00:00", updatedAt: "2024-11-07T12:00:00", related_news_id1: 219, related_news_id2: 220, related_news_id3: 221 },
  { vocaId: 6, vocaName: "컴퓨터 칩", vocaDesc: "컴퓨터 칩입니다.", originNewsId: 106, sentence: "반도체 산업의 수요가 급증하고 있습니다.", createdAt: "2024-10-07T12:00:00", updatedAt: "2024-10-07T12:00:00", related_news_id1: 216, related_news_id2: 217, related_news_id3: 218 },
  { vocaId: 4, vocaName: "하리보", vocaDesc: "하리보입니다.", originNewsId: 104, sentence: "정유 업계의 수익이 증가하고 있습니다.", createdAt: "2024-08-07T12:00:00", updatedAt: "2024-08-07T12:00:00", related_news_id1: 210, related_news_id2: 211, related_news_id3: 212 },
  { vocaId: 8, vocaName: "인공지능", vocaDesc: "인공지능입니다.", originNewsId: 108, sentence: "AI 기술이 다양한 산업에 도입되고 있습니다.", createdAt: "2024-12-07T12:00:00", updatedAt: "2024-12-07T12:00:00", related_news_id1: 222, related_news_id2: 223, related_news_id3: 224 }
];

const SearchContainer = styled.div`
  // 전체 가로 중앙정렬
`
const VocaContainer = styled.div`
  width: 70%; /*컨테이너 너비*/
  margin-right: 5%; /* 광고와 간격 */
  margin-top: 2%;
  // border: 1px solid black;
`
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 1%;
  // border: 1px solid black;
`

const AdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 상단에 맞춰 정렬 */
  // border: 1px solid red;
  width: 100%;
`;

// 데이터 매핑 함수: mockWords의 industryId와 words 배열의 industryId를 매칭
const mapWordsWithImages = (mockWords: MockWord[], words: Word[]): MockWordWithImages[] => {
  return mockWords.map((mockWord) => {
    const matchedWord = words.find((word) => word.industryId === mockWord.vocaId);
    return { 
      ...mockWord, 
      img: matchedWord ? matchedWord.img : null, 
      industryName: matchedWord ? matchedWord.industryName : null }; // 있으면 추가, 없으면 null
  });
};

const VocaPage: React.FC = () => {
  // mockWords와 words 매핑
  const mappedWords: MockWordWithImages[] = mapWordsWithImages(mockWords, words);
 
  // mainVoca > 날짜 순(초기 값), orderVoca > 가나다 순
  const [filter, setFilter] = useState<string>('mainVoca'); 
  // 필터에 맞게 정렬된 단어 리스트 관리하는 상태
  const [sortedWords, setSortedWords] = useState<MockWordWithImages[]>(mappedWords);

  const sortWords = (filterType: string, wordsToSort: MockWordWithImages[]): MockWordWithImages[] => {
    let sorted;
    if (filterType === 'mainVoca') {
      // 수정 날짜순
      sorted = [...wordsToSort].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (filterType === 'orderVoca') {
      // 가나다순
      sorted = [...wordsToSort].sort((a, b) => a.vocaName.localeCompare(b.vocaName, 'ko-KR'));
    } else {
      sorted = wordsToSort;
    }
    return sorted;
  }

  // 필터 변경 시 정렬
  useEffect(() => {
    setSortedWords(sortWords(filter, mappedWords));
  }, [filter, mappedWords]);
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };
  
  return (
    <div>
      <GlobalStyle />
      <VocaCommon />
      <SearchContainer>
        {/* <SearchBar /> */}

          <AdContainer>
            <VocaContainer>
              <Tab options={tabOptions} onFilterChange={handleFilterChange}/>
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
