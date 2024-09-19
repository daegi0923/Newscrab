import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage1 from "../pages/auth/SignUpPage1";
import SignUpPage2 from "../pages/auth/SignUpPage2";
import MainVoca from "../pages/voca/VocaPage";
import MainNewsPage from "../pages/news/MainNewsPage";
import RcmdNewsPage from "../pages/news/RcmdNewsPage";
import AllNewsPage from "../pages/news/AllNewsPage";
import FilterNewsPage from "../pages/news/FilterNewsPage";
import ViewCountNewsPage from "../pages/news/ViewCountNewsPage";
import ScrapCountNewsPage from "../pages/news/ScrapCountNewsPage";
import VocaDetailPage from "@pages/voca/VocaDetailPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup1" element={<SignUpPage1 />} />
        <Route path="/signup2" element={<SignUpPage2 />} />
        <Route path="/voca" element={<MainVoca />} />
        <Route path="/voca/:vocaId" element={<VocaDetailPage />} />
        <Route path="/mainNews" element={<MainNewsPage />} />
        <Route path="/rcmdNews" element={<RcmdNewsPage />} />
        <Route path="/allNews" element={<AllNewsPage />} />
        <Route path="/filterNews" element={<FilterNewsPage />} />
        <Route path="/viewCountNews" element={<ViewCountNewsPage />} />
        <Route path="/scrapCountNews" element={<ScrapCountNewsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
