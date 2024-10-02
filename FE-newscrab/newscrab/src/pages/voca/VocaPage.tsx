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
// import AdImage from "@components/common/Advertise";
import Card from "@components/voca/VocaCard";
import DropDown from "@components/voca/DropDown";
import Pagination from "@components/voca/Pagination";
import SearchBar from "@components/common/SearchBar";
import { AppDispatch, RootState } from '@store/index';
import { fetchVocaListThunk } from '@store/voca/vocaSlice';

// 스타일 정의
const SearchContainer = styled.div`
  margin-top: -1%
`;

const VocaContainer = styled.div`
  width: 80%;
  // margin-right: %;
  margin-top: 1%;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 2%;
  row-gap: 5%;
`;

const AdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

// 단어와 이미지를 매핑하는 함수
const mapWordsWithImages = (vocaList: VocaResponseDto[], wordsMap: Record<number, Word>): VocaWithImages[] => {
  return vocaList.map((vocaItem) => {
    // industryId가 없으면 기본 값을 설정하거나 null로 반환
    if (!vocaItem || !vocaItem.industryId) {
      console.warn('Invalid vocaItem detected:', vocaItem);
      return {
        ...vocaItem,
        img: null, 
        industryName: null, 
      };
    }

    const matchedWord = wordsMap[vocaItem.industryId];
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

  // words 데이터를 industryId 기준으로 매핑
  const wordsMap = useMemo(() => {
    return words.reduce((acc, word) => {
      acc[word.industryId] = word;
      return acc;
    }, {} as Record<number, Word>);
  }, [words]);

  // Redux store에서 voca 리스트와 로딩 상태 가져오기
  const { vocaList, loading } = useSelector((state: RootState) => state.voca);

  useEffect(() => {
    dispatch(fetchVocaListThunk()); // Voca 리스트 API 요청
  }, [dispatch]);

  useEffect(() => {
    console.log('Redux vocaList:', vocaList); // vocaList 상태 확인
  }, [vocaList]);

  // vocaList와 wordsMap을 이용해 voca 데이터를 매핑
  const mappedWords: VocaWithImages[] = useMemo(() => {
    if (loading || !vocaList || vocaList.length === 0) {
      return []; // 로딩 중이거나 데이터가 없으면 빈 배열 반환
    }
    return mapWordsWithImages(vocaList, wordsMap); // wordsMap과 vocaList 매핑
  }, [vocaList, wordsMap, loading]);

  const [filter, setFilter] = useState<string>('mainVoca');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = 12;

  // 필터링 및 정렬된 단어 목록을 반환
  const sortedAndFilteredWords = useMemo(() => {
    let filteredWords = mappedWords;

    // 산업 필터링
    if (selectedIndustryId) {
      filteredWords = filteredWords.filter(word => word.industryId === selectedIndustryId);
    }

    // 검색어 필터링
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

  // 로딩 중인 경우 로딩 메시지 표시
  if (loading) {
    return <div>Loading...😵</div>;
  }

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
                  originNewsTitle={word.originNewsTitle}
                  onClick={() => handleCardClick(word)}
                />
              ))}
            </CardContainer>
          </VocaContainer>
          {/* <AdImage /> */}
        </AdContainer>
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
        )}
      </SearchContainer>
    </div>
  );
};

export default VocaPage;
