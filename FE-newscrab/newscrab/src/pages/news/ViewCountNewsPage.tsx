// 목업 api 하나로만 뉴스 관련 페이지에 다 뿌리고 있어서
// 전체 뉴스 페이지를 일단 그대로 가져옴 -> api 요청 보낼때 조회순으로 정렬되서 오니까 그대로 fetch하면됨

import React, { useEffect, useState } from "react";

import GlobalStyle from "@components/GlobalStyle"; // 배경색
import NewsCommon from "@pages/news/common/NewsCommon"; // 헤더, 탭
import Pagination from "@components/common/Pagination"; // 페이지네이션
import NewsList from "./common/NewsList"; // 분리한 뉴스 리스트

import { getMockNews } from "@apis/newsApi"; // getMockNews 함수 import
import { NewsItem, MockData } from "../../types/newsTypes"; // newsTypes.ts에서 타입 import

const ViewCountNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]); // newsList: 뉴스 데이터를 저장하는 상태
  const [currentPage, setCurrentPage] = useState(1); // currentPage: 현재 페이지 번호를 저장하는 상태 (초기값 1)
  const [totalPages, setTotalPages] = useState(1); // totalPages: 총 페이지 수를 저장하는 상태 (초기값 1, API 응답 후 업데이트)

  // 뉴스 데이터를 API에서 가져오는 비동기 함수
  const fetchNewsData = async (page: number) => {
    const mockData: MockData = await getMockNews(page); // API 요청 (mock 데이터를 비동기로 가져옴)
    setNewsList(mockData.news); // 받아온 뉴스 데이터를 상태에 저장
    setTotalPages(mockData.totalPages); // API에서 받은 totalPages 값을 상태에 저장
  };

  // currentPage가 변경될 때마다 fetchNewsData 호출
  useEffect(() => {
    fetchNewsData(currentPage); // 현재 페이지에 해당하는 뉴스 데이터를 가져옴
  }, [currentPage]); // currentPage가 변경될 때마다 이 함수가 실행됨

  // 페이지네이션을 위한 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 사용자가 페이지를 변경할 때 currentPage를 업데이트
  };

  // JSX 반환: GlobalStyle, NewsCommon, 뉴스 리스트, 페이지네이션 등 컴포넌트 구성
  return (
    <div>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <NewsCommon /> {/* 헤더와 탭 컴포넌트 */}
      <NewsList newsList={newsList} />{" "}
      {/* 뉴스 리스트 컴포넌트에 뉴스 데이터 전달 */}
      <Pagination
        currentPage={currentPage} // 현재 페이지 번호 전달
        totalPages={totalPages} // 총 페이지 수 전달 (API 응답에 따른 동적 값)
        onPageChange={handlePageChange} // 페이지 변경 핸들러 전달
      />
    </div>
  );
};

export default ViewCountNewsPage;
