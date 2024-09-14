import React, { useState, useEffect } from 'react';
import GlobalStyle from "@components/GlobalStyle";
import VocaCommon from "@pages/voca/VocaCommon";
import Tab from "@components/voca/Tab";
import { tabOptions } from "@components/voca/TabOptions";
import styled from "styled-components";
import { words } from "@components/voca/VocaList";
import AdImage from "@components/common/Advertise";
import Card from "@components/voca/VocaCard";
import DropDown from "@components/common/DropDown"
import Pagination from "@components/voca/Pagination"
import SearchBar from "@components/common/SearchBar";

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
  { vocaId: 8, industryId: 2, vocaName: "인공지능", vocaDesc: "인공지능입니다.", originNewsId: 108, sentence: "AI 기술이 다양한 산업에 도입되고 있습니다.", createdAt: "2024-12-07T12:00:00", updatedAt: "2024-12-07T12:00:00", related_news_id1: 222, related_news_id2: 223, related_news_id3: 224 },
  { vocaId: 9, industryId: 4, vocaName: "치코리타", vocaDesc: "치코리타입니다.", originNewsId: 102, sentence: "바이오헬스 산업이 급성장 중입니다.", createdAt: "2024-06-07T12:00:00", updatedAt: "2024-06-07T12:00:00", related_news_id1: 204, related_news_id2: 205, related_news_id3: 206 }, 
  { vocaId: 10, industryId: 2, vocaName: "LNG선", vocaDesc: "LNG선입니다.", originNewsId: 101, sentence: "조선업이 호황을 맞고 있습니다.", createdAt: "2024-05-07T12:00:00", updatedAt: "2024-05-07T12:00:00", related_news_id1: 201, related_news_id2: 202, related_news_id3: 203 }, 
  { vocaId: 11, industryId: 9, vocaName: "오트밀", vocaDesc: "오트밀입니다.", originNewsId: 103, sentence: "금융 시장의 변동성이 큽니다.", createdAt: "2024-07-07T12:00:00", updatedAt: "2024-07-07T12:00:00", related_news_id1: 207, related_news_id2: 208, related_news_id3: 209 },
  { vocaId: 12, industryId: 4, vocaName: "꼬숨이", vocaDesc: "꼬숨이입니다.", originNewsId: 105, sentence: "철강 산업의 생산량이 증가하고 있습니다.", createdAt: "2024-09-07T12:00:00", updatedAt: "2024-09-07T12:00:00", related_news_id1: 213, related_news_id2: 214, related_news_id3: 215 }, 
  { vocaId: 13, industryId: 8, vocaName: "전기차", vocaDesc: "전기차입니다.", originNewsId: 107, sentence: "전기차 시장이 빠르게 성장하고 있습니다.", createdAt: "2024-11-07T12:00:00", updatedAt: "2024-11-07T12:00:00", related_news_id1: 219, related_news_id2: 220, related_news_id3: 221 }, 
  { vocaId: 14, industryId: 11, vocaName: "컴퓨터 칩", vocaDesc: "컴퓨터 칩입니다.", originNewsId: 106, sentence: "반도체 산업의 수요가 급증하고 있습니다.", createdAt: "2024-10-07T12:00:00", updatedAt: "2024-10-07T12:00:00", related_news_id1: 216, related_news_id2: 217, related_news_id3: 218 },
  { vocaId: 15, industryId: 13, vocaName: "하리보", vocaDesc: "하리보입니다.", originNewsId: 104, sentence: "정유 업계의 수익이 증가하고 있습니다.", createdAt: "2024-08-07T12:00:00", updatedAt: "2024-08-07T12:00:00", related_news_id1: 210, related_news_id2: 211, related_news_id3: 212 },
  { vocaId: 16, industryId: 2, vocaName: "인공지능", vocaDesc: "인공지능입니다.", originNewsId: 108, sentence: "AI 기술이 다양한 산업에 도입되고 있습니다.", createdAt: "2024-12-07T12:00:00", updatedAt: "2024-12-07T12:00:00", related_news_id1: 222, related_news_id2: 223, related_news_id3: 224 },

]; 

const SearchContainer = styled.div`
  margin-top: -1%
`;
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
  const [searchText, setSearchText] = useState<string>('');
  
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = 10;
  const totalPages = Math.ceil(sortedWords.length / itemPerPage);

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

  const filterSearchResults = () => {
    if (searchText) {
      // 검색어가 있으면 모든 데이터 대상
      return mappedWords.filter((word) =>
        word.vocaName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    // 검색어가 없으면 기존 적용
    return sortedWords;
  };

  // 현재 페이지에 맞는 데이터 추출
  const getCurrentPageData = () => {
    const searchFilteredWords = filterSearchResults();
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return searchFilteredWords.slice(startIndex, endIndex);
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <GlobalStyle />
      <VocaCommon />
      <SearchContainer>
        <SearchBar searchText={searchText} onSearchChange={setSearchText} />
        <AdContainer>
          <VocaContainer>
            <Tab options={tabOptions} onFilterChange={handleFilterChange} activeFilter={filter} />
            {isDropdownOpen && (
              <DropDown words={words} handleIndustrySelect={handleIndustrySelect} />
            )}
            <CardContainer>
              {getCurrentPageData().map((word) => (
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
        {totalPages > 1 &&(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} onPrevPage={handlePrevPage} onNextPage={handleNextPage}/>)}
      </SearchContainer>
    </div>
  );
};

export default VocaPage;
