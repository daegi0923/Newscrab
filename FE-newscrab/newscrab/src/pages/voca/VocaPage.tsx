import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GlobalStyle from "@components/GlobalStyle";
import VocaCommon from "@pages/voca/VocaCommon";
import Tab from "@components/voca/Tab";
import { tabOptions } from "@components/voca/TabOptions";
import styled from "styled-components";
import { words, mockWords } from "@components/voca/VocaList";
import { MockWord, Word, MockWordWithImages } from "@components/voca/VocaTypes";
import AdImage from "@components/common/Advertise";
import Card from "@components/voca/VocaCard";
import DropDown from "@components/voca/DropDown"
import Pagination from "@components/voca/Pagination"
import SearchBar from "@components/common/SearchBar";
import { fetchVocaList } from '@store/voca/vocaSlice';

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
  const navigate = useNavigate();
  // const mappedWords: MockWordWithImages[] = mapWordsWithImages(mockWords, words);
  const mappedWords: MockWordWithImages[] = useMemo(() => mapWordsWithImages(mockWords, words), []);
  const [filter, setFilter] = useState<string>('mainVoca');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(null);
  const [sortedWords, setSortedWords] = useState<MockWordWithImages[]>(mappedWords);
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  
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
    // dispatch(fetchVocaList());
  }, [dispatch])

  useEffect(() => {
    const filterWords = filterIndustry(selectedIndustryId);
    setSortedWords(sortWords(filter, filterWords));
  // }, [filter, selectedIndustryId, mappedWords]);
}, [filter, selectedIndustryId]);

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

  const handleCardClick = (word: MockWordWithImages) => {
    navigate(`/voca/${word.vocaId}`, { state: { word } }); // 클릭 시 해당 vocaId로 이동
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
                  onClick={() => handleCardClick(word)}
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
