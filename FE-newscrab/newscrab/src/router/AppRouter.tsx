import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "@pages/LandingPage";
// auth
import LoginPage from "@pages/auth/LoginPage";
import SignUpPage1 from "@pages/auth/SignUpPage1";
import SignUpPage2 from "@pages/auth/SignUpPage2";
//뉴스
import MainNewsPage from "@pages/news/MainNewsPage";
import RcmdNewsPage from "@pages/news/rcmdNews/RcmdNewsPage";
import AllNewsPage from "@pages/news/allNews/AllNewsPage";
import NewsDetailPage from "@pages/news/detail/NewsDetailPage";
// 스크랩
import ScrapListPage from "@pages/scrap/ScrapListPage";
import ScrapDetailPage from "@pages/scrap/ScrapDetailPage";
// 단어장
import MainVoca from "@pages/voca/VocaPage";
import VocaDetail from "@pages/voca/VocaDetailPage";
// 마이페이지
import MyPage from "@pages/myPage/MyPage";
import PasswordChange from "@pages/myPage/PasswordChangePage";
import ProfileEdit1 from "@pages/myPage/ProfileEditPage1";
import ProfileEdit2 from "@pages/myPage/ProfileEditPage2";

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

        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/password" element={<PasswordChange />} />
        <Route path="/edit1" element={<ProfileEdit1 />} />
        <Route path="/edit2" element={<ProfileEdit2 />} />

        {/* 뉴스 */}
        <Route path="/mainNews" element={<MainNewsPage />} />
        <Route path="/rcmdNews" element={<RcmdNewsPage />} />
        <Route path="/news" element={<AllNewsPage />} />
        <Route path="/news/:newsId" element={<NewsDetailPage />} />

        {/* 스크랩 */}
        <Route path="/scrap" element={<ScrapListPage />} />
        <Route path="/scrap/:scrapId" element={<ScrapDetailPage />} />

        {/* 단어장 */}
        <Route path="/voca" element={<MainVoca />} />
        <Route path="/voca/:vocaId" element={<VocaDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
