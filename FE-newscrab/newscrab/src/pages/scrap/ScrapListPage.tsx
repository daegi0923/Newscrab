import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "@components/GlobalStyle"; // 배경색
import Header from "@components/common/Header";
import SearchBar from "@common/SearchBar";
import Tab from "./Tab";
import ScrapList from "./ScrapList "; // ScrapList 컴포넌트 import

import { getScrapData } from "@apis/scrap/scrapApi";
import { ScrapData } from "../../types/scrapTypes"; // scrapApi에서 타입 import

import ScrapPdfGenerator from "@components/scrap/pdf/ScrapPdfGenerator"

const ScrapListPage: React.FC = () => {
  const [scrapList, setScrapList] = useState<ScrapData[]>([]); // 스크랩 데이터를 저장하는 상태
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

  // 스크랩 데이터를 API에서 가져오는 비동기 함수
  const fetchScrapData = async () => {
    const resData = await getScrapData(1, 10); // API 요청 (페이지네이션이 없으므로 페이지는 1로 고정)
    const sortedData = resData.data.data.sort(
      (a: ScrapData, b: ScrapData) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ); // updatedAt 기준으로 내림차순 정렬
    setScrapList(sortedData); // 정렬된 스크랩 데이터를 상태에 저장
    console.log("Scrap List:", sortedData); // 정렬된 스크랩 리스트 데이터 출력
  };

  // selectedIndustryId에 따른 필터링 적용
  useEffect(() => {
    let filteredData = scrapList;

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
  }, [scrapList, selectedIndustryId, searchText]);

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchScrapData(); // 페이지네이션이 없으므로 currentPage에 대한 의존성 제거
  }, []);

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
      {/* <Pagination
        currentPage={currentPage} // 현재 페이지 번호 전달
        totalPages={totalPages} // 총 페이지 수 전달
        onPageChange={handlePageChange} // 페이지 변경 핸들러 전달
      /> */}
      <ScrapPdfGenerator></ScrapPdfGenerator>
    </div>
  );
};

export default ScrapListPage;
