import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/common/Header";
import Tab from "./Tab";
import RcmdNewsList from "./RcmdNewsList"; // 뉴스 리스트

import { getRcmdNews } from "@apis/news/newsRcmdApi";
import { RcmdNewsItem } from "../../../types/newsTypes"; // newsTypes.ts에서 타입 import

const RcmdNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<RcmdNewsItem[]>([]); // 뉴스 데이터를 저장하는 상태

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 뉴스 데이터를 API에서 가져오는 비동기 함수
  const fetchNewsData = async () => {
    const mergedRcmdNews: RcmdNewsItem[] = await getRcmdNews(); // API 요청으로 mergedRcmdNews 가져오기
    setNewsList(mergedRcmdNews); // 받아온 뉴스 데이터를 상태에 저장
  };

  // 컴포넌트가 마운트될 때 뉴스 데이터를 가져옴
  useEffect(() => {
    fetchNewsData(); // 페이지네이션이 없으므로 한번만 호출
  }, []);

  // 뉴스 클릭 시 실행되는 핸들러 (상세 페이지로 이동)
  const handleNewsClick = (newsId: number) => {
    navigate(`/news/${newsId}`); // 클릭한 뉴스의 상세 페이지로 이동
  };

  return (
    <div>
      <Header />
      {/* 상단 탭에서 선택한 option 값을 전달 */}
      <Tab />
      {/* 뉴스 리스트 컴포넌트 */}
      <RcmdNewsList newsList={newsList} onNewsClick={handleNewsClick} />
    </div>
  );
};

export default RcmdNewsPage;
