import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "@components/GlobalStyle"; // 배경색
import Header from "@components/common/Header";
import SearchBar from "@common/SearchBar";
import Tab from "./Tab";
import ScrapList from "./ScrapList "; // ScrapList 컴포넌트 import

// import { getScrapData } from "@apis/scrap/scrapApi";
import { ScrapData } from "../../types/scrapTypes"; // scrapApi에서 타입 import

import ScrapPdfGenerator from "@components/scrap/pdf/ScrapPdfGenerator";

//redux 사용해서 scrapList 관리
import { fetchScrapListThunk } from "@store/scrap/scrapSlice";
import { AppDispatch, RootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";

const ScrapListPage: React.FC = () => {
  // const [scrapList, setScrapList] = useState<ScrapData[]>([]); // 스크랩 데이터를 저장하는 상태
  const [filteredScrapList, setFilteredScrapList] = useState<ScrapData[]>([]); // 필터링된 스크랩 데이터
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(
    null
  ); // 선택된 industryId 상태 (초기값 null로 수정)
  const [searchText, setSearchText] = useState(""); // 검색 텍스트 상태 추가

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 검색 텍스트가 변경될 때마다 상태 업데이트
  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  // redux 전역상태관리로 scrapList 관리
  const dispatch: AppDispatch = useDispatch();

  const { scrapList } = useSelector((state: RootState) => state.scrap);

  useEffect(() => {
    dispatch(fetchScrapListThunk()); // Scrap 리스트 API 요청
  }, [dispatch]);

  useEffect(() => {
    let filteredData = scrapList.slice(); // scrapList 배열을 복사

    // industryId가 선택된 경우 해당 industryId로 필터링
    if (selectedIndustryId !== null) {
      filteredData = filteredData.filter(
        (scrap) => scrap.industryId === selectedIndustryId
      );
    }

    // 검색어가 입력된 경우 검색어로 필터링
    if (searchText) {
      filteredData = filteredData.filter(
        (scrap) =>
          scrap.newsTitle.toLowerCase().includes(searchText.toLowerCase()) ||
          scrap.newsContent.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // updatedAt 필드 기준으로 내림차순 정렬
    filteredData = filteredData.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA; // 최신 순서대로 정렬
    });

    setFilteredScrapList(filteredData);
  }, [scrapList, selectedIndustryId, searchText]);

  // 필터에서 선택한 industryId 처리
  const handleIndustrySelect = (industryId: number | null) => {
    setSelectedIndustryId(industryId); // 선택된 industryId 업데이트
  };

  // 스크랩 클릭 시 실행되는 핸들러 (상세 페이지로 이동)
  const handleScrapClick = (scrapId: number) => {
    console.log("Scrap ID clicked:", scrapId); // 스크랩 ID 출력
    navigate(`/scrap/${scrapId}`); // 클릭한 스크랩의 상세 페이지로 이동
  };

  return (
    <div>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <Header />
      <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
      {/* SearchBar에 필요한 props 전달 */}
      <Tab onIndustrySelect={handleIndustrySelect} />
      {/* 필터링된 스크랩 리스트 컴포넌트 */}
      <ScrapList
        scrapList={filteredScrapList}
        onScrapClick={handleScrapClick}
      />
      <ScrapPdfGenerator></ScrapPdfGenerator>
    </div>
  );
};

export default ScrapListPage;
