import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/common/Header";
import SearchBar from "@common/SearchBar"; // SearchBar 컴포넌트 추가
import Tab from "./Tab";
import Pagination from "@components/common/Pagination"; // 페이지네이션
import NewsList from "./NewsList"; // 뉴스 리스트
import { topTabOptions } from "./TabOptions";
import { getNewsData } from "@apis/news/newsApi";
import { NewsItem, NewsData } from "../../../types/newsTypes"; // newsTypes.ts에서 타입 import

const AllNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]); // 뉴스 데이터를 저장하는 상태
  const [filteredNewsList, setFilteredNewsList] = useState<NewsItem[]>([]); // 필터링된 뉴스 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(
    -1
  ); // 선택된 industryId 상태
  const [option, setOption] = useState<string>("total"); // 선택된 option 상태 ('total', 'hot', 'scrap')
  const [searchText, setSearchText] = useState(""); // 검색 텍스트 상태 추가
  const [selectedTopTab, setSelectedTopTab] = useState<number>(1); // 상단 탭 상태 저장
  const [selectedBottomTab, setSelectedBottomTab] = useState<number | null>(
    null
  ); // 하단 필터 상태 저장
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // 초기 로딩 상태

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 검색 텍스트가 변경될 때마다 상태 업데이트
  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  // 컴포넌트가 로드될 때, localStorage에서 상단/하단 탭 상태를 불러오기
  useEffect(() => {
    const savedTopTab = localStorage.getItem("selectedTopTab");
    const savedBottomTab = localStorage.getItem("selectedBottomTab");

    if (savedTopTab) {
      const topTabId = parseInt(savedTopTab, 10);
      setSelectedTopTab(topTabId); // 상단 탭 상태 복구
      setOption(
        topTabOptions.find((tab) => tab.id === topTabId)?.label || "total"
      ); // 옵션 복구
    }

    if (savedBottomTab) {
      const bottomTabId = parseInt(savedBottomTab, 10);
      setSelectedBottomTab(bottomTabId); // 하단 필터 상태 복구
      setSelectedIndustryId(bottomTabId); // industryId 복구
    }

    setIsLoaded(true); // localStorage에서 값을 불러오면 로딩 완료
  }, []);

  // 뉴스 데이터를 API에서 가져오는 비동기 함수
  const fetchNewsData = async (
    page: number,
    industryId: number | null,
    option: string
  ) => {
    const resData: NewsData = await getNewsData(
      industryId ?? -1,
      page,
      16,
      undefined,
      undefined,
      option
    );
    setNewsList(resData.news); // 받아온 뉴스 데이터를 상태에 저장
    setTotalPages(resData.totalPages); // API에서 받은 totalPages 값을 상태에 저장
  };

  // currentPage, selectedIndustryId 또는 option이 변경될 때마다 데이터 새로 가져오기
  useEffect(() => {
    if (isLoaded) {
      fetchNewsData(currentPage, selectedIndustryId, option); // 로딩이 완료된 후에만 데이터를 가져옴
    }
  }, [currentPage, selectedIndustryId, option, isLoaded]);

  // 검색어와 선택된 필터에 따라 뉴스 리스트를 필터링하는 로직 추가
  useEffect(() => {
    let filteredData = newsList.slice(); // 뉴스 리스트 배열을 복사

    if (searchText) {
      filteredData = filteredData.filter(
        (news) =>
          news.newsTitle.toLowerCase().includes(searchText.toLowerCase()) ||
          news.newsContent.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredNewsList(filteredData); // 필터링된 뉴스 리스트 업데이트
  }, [newsList, searchText]);

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
      <Tab
        onIndustrySelect={handleIndustrySelect}
        onOptionSelect={handleOptionSelect}
        selectedTopTab={selectedTopTab} // 상단 탭 상태 전달
        selectedBottomTab={selectedBottomTab} // 하단 필터 상태 전달
      />
      <NewsList newsList={filteredNewsList} onNewsClick={handleNewsClick} />
      <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
      <Pagination
        currentPage={currentPage} // 현재 페이지 번호 전달
        totalPages={totalPages} // 총 페이지 수 전달
        onPageChange={handlePageChange} // 페이지 변경 핸들러 전달
      />
    </div>
  );
};

export default AllNewsPage;
