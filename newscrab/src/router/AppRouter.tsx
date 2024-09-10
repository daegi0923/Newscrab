import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import MainNewsPage from "../pages/news/MainNewsPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mainNews" element={<MainNewsPage />} />
        {/* 추가적인 라우트는 필요에 따라 여기에 추가할 수 있습니다 */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
