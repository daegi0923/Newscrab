import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";

// 뉴스
import MainNewsPage from "../pages/news/MainNewsPage";
import RcmdNewsPage from "../pages/news/RcmdNewsPage";
import AllNewsPage from "../pages/news/AllNewsPage";
// 조회순 뉴스는 AllNewsPage에서 참고
// 스크랩순 뉴스는 AllNewsPage에서 참고
import FilterNewsPage from "../pages/news/FilterNewsPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 뉴스 */}
        <Route path="/mainNews" element={<MainNewsPage />} />
        <Route path="/rcmdNews" element={<RcmdNewsPage />} />
        <Route path="/allNews" element={<AllNewsPage />} />
        <Route path="/filterNews" element={<FilterNewsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
