import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyle from "@components/GlobalStyle";
import VocaCommon from "@pages/voca/VocaCommon";
import Tab from "@components/voca/Tab";
import { tabOptions } from "@components/voca/TabOptions";
import styled from "styled-components";
import { words } from "@components/voca/VocaList";
import { VocaResponseDto, Word, VocaWithImages } from "@components/voca/VocaTypes";
import AdImage from "@components/common/Advertise";
import Card from "@components/voca/VocaCard";
import DropDown from "@components/voca/DropDown";
import Pagination from "@components/voca/Pagination";
import SearchBar from "@components/common/SearchBar";
import { AppDispatch, RootState } from '@store/index';
import { fetchVocaListThunk } from '@store/voca/vocaSlice';

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

const mapWordsWithImages = (vocaList: VocaResponseDto[], words: Word[]): VocaWithImages[] => {
  return vocaList.map((vocaItem) => {
    const matchedWord = words.find((word) => word.industryId === vocaItem.industryId);
    return { 
      ...vocaItem, 
      img: matchedWord ? matchedWord.img : null, 
      industryName: matchedWord ? matchedWord.industryName : null 
    };
  });
};

const VocaPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // Redux store에서 voca 리스트 가져오기
  const { vocaList } = useSelector((state: RootState) => state.voca);

  useEffect(() => {
    console.log('불러와짐')
    dispatch(fetchVocaListThunk()); // Voca 리스트 API 요청
  }, [dispatch]);

  // vocaList와 words에 대한 메모이제이션된 값
  const mappedWords: VocaWithImages[] = useMemo(() => mapWordsWithImages(vocaList, words), [vocaList]);

  const [filter, setFilter] = useState<string>('mainVoca');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = 10;

  // 필터링 및 정렬된 단어 목록을 반환
  const sortedAndFilteredWords = useMemo(() => {
    // 필터링
    let filteredWords = mappedWords;
    if (selectedIndustryId) {
      filteredWords = filteredWords.filter(word => word.industryId === selectedIndustryId);
    }

    if (searchText) {
      filteredWords = filteredWords.filter(word => 
        word.vocaName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 정렬
    if (filter === 'mainVoca') {
      return filteredWords.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (filter === 'orderVoca') {
      return filteredWords.sort((a, b) => a.vocaName.localeCompare(b.vocaName, 'ko-KR'));
    } 
    return filteredWords;
  }, [mappedWords, selectedIndustryId, searchText, filter]);

  const totalPages = Math.ceil(sortedAndFilteredWords.length / itemPerPage);

  // 현재 페이지에 맞는 데이터 추출
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return sortedAndFilteredWords.slice(startIndex, endIndex);
  };

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

  const handleCardClick = (word: VocaWithImages) => {
    navigate(`/voca/${word.vocaId}`, { state: { word } });
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
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
        )}
      </SearchContainer>
    </div>
  );
};

export default VocaPage;
