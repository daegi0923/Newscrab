import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "@components/GlobalStyle"; // 배경색
import Header from "@components/common/Header";
import Tab from "./Tab";
// import Pagination from "@components/common/Pagination"; // 페이지네이션
import ScrapList from "./ScrapList "; // ScrapList 컴포넌트 import

import { getScrapData } from "@apis/scrap/scrapApi";
import { ScrapData } from "../../types/scrapTypes"; // scrapApi에서 타입 import

const ScrapListPage: React.FC = () => {
  const [scrapList, setScrapList] = useState<ScrapData[]>([]); // 스크랩 데이터를 저장하는 상태
  const [filteredScrapList, setFilteredScrapList] = useState<ScrapData[]>([]); // 필터링된 스크랩 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  // const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(
    null
  ); // 선택된 industryId 상태 (초기값 null로 수정)

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 스크랩 데이터를 API에서 가져오는 비동기 함수
  const fetchScrapData = async (page: number) => {
    const resData = await getScrapData(page, 10); // API 요청
    setScrapList(resData.data.data); // 받아온 스크랩 데이터를 상태에 저장
    // setTotalPages(Math.ceil(resData.data.totalItems / 10)); // 총 페이지 수 계산 후 상태에 저장
  };

  // selectedIndustryId에 따른 필터링 적용
  useEffect(() => {
    if (selectedIndustryId === null) {
      setFilteredScrapList(scrapList); // industryId가 없을 때는 전체 데이터
    } else {
      const filteredData = scrapList.filter(
        (scrap) => scrap.industryId === selectedIndustryId
      ); // 선택한 industryId에 맞는 데이터 필터링
      setFilteredScrapList(filteredData);
    }
  }, [scrapList, selectedIndustryId]);

  // currentPage가 변경될 때마다 데이터 새로 가져오기
  useEffect(() => {
    fetchScrapData(currentPage);
  }, [currentPage]);

  // 페이지네이션을 위한 페이지 변경 핸들러
  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page); // 페이지 변경 시 currentPage 업데이트
  // };

  // 필터에서 선택한 industryId 처리
  const handleIndustrySelect = (industryId: number | null) => {
    setSelectedIndustryId(industryId); // 선택된 industryId 업데이트
    setCurrentPage(1); // industryId 변경 시 페이지를 1로 초기화
  };

  // 스크랩 클릭 시 실행되는 핸들러 (상세 페이지로 이동)
  const handleScrapClick = (scrapId: number) => {
    navigate(`/scrap/${scrapId}`); // 클릭한 스크랩의 상세 페이지로 이동
  };

  return (
    <div>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <Header />
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
    </div>
  );
};

export default ScrapListPage;
