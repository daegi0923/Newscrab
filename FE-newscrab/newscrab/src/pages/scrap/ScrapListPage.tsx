import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "@components/GlobalStyle"; // 배경색
import Header from "@components/common/Header";
import SearchBar from "@common/SearchBar";
import Tab from "./Tab";
import ScrapList from "./ScrapList "; // ScrapList 컴포넌트 import
import { ScrapData } from "../../types/scrapTypes"; // scrapApi에서 타입 import
import ScrapPdfGenerator from "@components/scrap/pdf/ScrapPdfGenerator";

// redux 사용해서 scrapList 관리
import { fetchScrapListThunk } from "@store/scrap/scrapSlice";
import { AppDispatch, RootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// "데이터 없음" 메시지 스타일
const NoDataMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px; /* 원하는 높이로 설정 */
  font-size: 24px;
  color: gray;
`;

const ScrapListPage: React.FC = () => {
  const [filteredScrapList, setFilteredScrapList] = useState<ScrapData[]>([]); // 필터링된 스크랩 데이터
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(
    null
  ); // 선택된 industryId 상태
  const [searchText, setSearchText] = useState(""); // 검색 텍스트 상태 추가
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // 필터 로딩 완료 상태 추가

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 검색 텍스트가 변경될 때마다 상태 업데이트
  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  // redux 전역상태관리로 scrapList 관리
  const dispatch: AppDispatch = useDispatch();
  const { scrapList } = useSelector((state: RootState) => state.scrap);

  // localStorage에서 선택된 industryId를 불러오기
  useEffect(() => {
    const savedIndustryId = localStorage.getItem("selectedScrapIndustryId");
    if (savedIndustryId) {
      setSelectedIndustryId(parseInt(savedIndustryId, 10));
    }
    setIsLoaded(true); // 필터 상태 로딩 완료
  }, []);

  useEffect(() => {
    dispatch(fetchScrapListThunk()); // Scrap 리스트 API 요청
  }, [dispatch]);

  // 필터링 및 검색 로직
  useEffect(() => {
    if (!isLoaded) return; // 필터 로딩이 완료된 후에만 동작

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

    setFilteredScrapList(filteredData);
  }, [scrapList, selectedIndustryId, searchText, isLoaded]);

  // 필터에서 선택한 industryId 처리
  const handleIndustrySelect = (industryId: number | null) => {
    setSelectedIndustryId(industryId); // 선택된 industryId 업데이트
    localStorage.setItem(
      "selectedScrapIndustryId",
      industryId ? industryId.toString() : ""
    ); // 선택된 필터 상태를 localStorage에 저장
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
      {/* 필터링된 스크랩 리스트가 없을 경우 "스크랩한 뉴스가 없습니다..." 메시지를 표시 */}
      {filteredScrapList.length === 0 ? (
        <NoDataMessage>스크랩한 뉴스가 없습니다...</NoDataMessage>
      ) : (
        <ScrapList
          scrapList={filteredScrapList}
          onScrapClick={handleScrapClick}
        />
      )}
      <ScrapPdfGenerator></ScrapPdfGenerator>
    </div>
  );
};

export default ScrapListPage;
