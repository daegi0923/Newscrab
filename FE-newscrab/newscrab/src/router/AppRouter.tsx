import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "@pages/LandingPage";
// auth
import LoginPage from "@pages/auth/LoginPage";
import SignUpPage1 from "@pages/auth/SignUpPage1";
import SignUpPage2 from "@pages/auth/SignUpPage2";
//뉴스
import MainNewsPage from "@pages/news/MainNewsPage";
import RcmdNewsPage from "@pages/news/RcmdNewsPage";
import AllNewsPage from "@pages/news/AllNewsPage";
import FilterNewsPage from "@pages/news/FilterNewsPage";
import ViewCountNewsPage from "@pages/news/ViewCountNewsPage";
import ScrapCountNewsPage from "@pages/news/ScrapCountNewsPage";
import NewsDetailPage from "@pages/news/detail/NewsDetailPage";
// 스크랩
import UpdatedAtScrapPage from "@pages/scrap/UpdatedAtScrapPage";
import FilterScrapPage from "@pages/scrap/FilterScrapPage";
// 단어장
import MainVoca from "@pages/voca/VocaPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 랜딩페이지 */}
        <Route path="/" element={<LandingPage />} />

        {/* auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup1" element={<SignUpPage1 />} />
        <Route path="/signup2" element={<SignUpPage2 />} />

        {/* 뉴스 */}
        <Route path="/mainNews" element={<MainNewsPage />} />
        <Route path="/rcmdNews" element={<RcmdNewsPage />} />
        <Route path="/allNews" element={<AllNewsPage />} />
        <Route path="/filterNews" element={<FilterNewsPage />} />
        <Route path="/viewCountNews" element={<ViewCountNewsPage />} />
        <Route path="/scrapCountNews" element={<ScrapCountNewsPage />} />
        <Route path="/newsDetail/1" element={<NewsDetailPage />} />

        {/* 스크랩 */}
        <Route path="/updatedAtScrap" element={<UpdatedAtScrapPage />} />
        <Route path="/filterScrap" element={<FilterScrapPage />} />

        {/* 단어장 */}
        <Route path="/mainVoca" element={<MainVoca />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
