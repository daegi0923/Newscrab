import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/common/Header";
import Tab from "./Tab";
import Pagination from "@components/common/Pagination"; // 페이지네이션
import NewsList from "./NewsList"; // 뉴스 리스트

import { getNewsData } from "@apis/news/newsApi";
import { NewsItem, NewsData } from "../../../types/newsTypes"; // newsTypes.ts에서 타입 import

const AllNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]); // 뉴스 데이터를 저장하는 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(
    -1
  ); // 선택된 industryId 상태
  const [option, setOption] = useState<string>("total"); // 선택된 option 상태 ('total', 'hot', 'scrap')

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 뉴스 데이터를 API에서 가져오는 비동기 함수
  const fetchNewsData = async (
    page: number,
    industryId: number | null,
    option: string
  ) => {
    const resData: NewsData = await getNewsData(
      industryId ?? -1,
      page,
      20,
      undefined,
      undefined,
      option
    ); // API 요청
    setNewsList(resData.news); // 받아온 뉴스 데이터를 상태에 저장
    setTotalPages(resData.totalPages); // API에서 받은 totalPages 값을 상태에 저장
    console.log(resData.news);
  };

  // currentPage, selectedIndustryId 또는 option이 변경될 때마다 데이터 새로 가져오기
  useEffect(() => {
    fetchNewsData(currentPage, selectedIndustryId, option);
  }, [currentPage, selectedIndustryId, option]);

  // 페이지네이션을 위한 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경 시 currentPage 업데이트
  };

  // 상단 탭에서 선택한 option 값 처리
  const handleOptionSelect = (selectedOption: string) => {
    setOption(selectedOption); // 선택된 option 업데이트
    setCurrentPage(1); // 탭 변경 시 페이지를 1로 초기화
  };

  // 하단 필터에서 선택한 industryId 처리
  const handleIndustrySelect = (industryId: number | null) => {
    setSelectedIndustryId(industryId); // 선택된 industryId 업데이트
    setCurrentPage(1); // industryId 변경 시 페이지를 1로 초기화
  };

  // 뉴스 클릭 시 실행되는 핸들러 (상세 페이지로 이동)
  const handleNewsClick = (newsId: number) => {
    navigate(`/news/${newsId}`); // 클릭한 뉴스의 상세 페이지로 이동
  };

  return (
    <div>
      <Header />
      {/* 상단 탭에서 선택한 option 값을 전달 */}
      <Tab
        onIndustrySelect={handleIndustrySelect}
        onOptionSelect={handleOptionSelect}
      />
      {/* 뉴스 리스트 컴포넌트 */}
      <NewsList newsList={newsList} onNewsClick={handleNewsClick} />
      <Pagination
        currentPage={currentPage} // 현재 페이지 번호 전달
        totalPages={totalPages} // 총 페이지 수 전달
        onPageChange={handlePageChange} // 페이지 변경 핸들러 전달
      />
    </div>
  );
};

export default AllNewsPage;
