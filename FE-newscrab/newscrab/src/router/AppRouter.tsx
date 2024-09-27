import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "@components/common/Layout";
import LandingPage from "@pages/LandingPage";
// auth
import LoginPage from "@pages/auth/LoginPage";
import SignUpPage1 from "@pages/auth/SignUpPage1";
import SignUpPage2 from "@pages/auth/SignUpPage2";
//뉴스
import MainNewsPage from "@pages/news/MainNewsPage";
import RcmdNewsPage from "@pages/news/rcmdNews/RcmdNewsPage";
import AllNewsPage from "@pages/news/allNews/AllNewsPage";
// import FilterNewsPage from "@pages/news/FilterNewsPage";
// import ViewCountNewsPage from "@pages/news/ViewCountNewsPage";
// import ScrapCountNewsPage from "@pages/news/ScrapCountNewsPage";
import NewsDetailPage from "@pages/news/detail/NewsDetailPage";
// 스크랩
import ScrapListPage from "@pages/scrap/ScrapListPage";
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
        <Route path="/mypage" element={<Layout><MyPage /></Layout>} />
        <Route path="/password" element={<PasswordChange />} />
        <Route path="/edit1" element={<ProfileEdit1 />} />
        <Route path="/edit2" element={<ProfileEdit2 />} />

        {/* 뉴스 */}
        <Route path="/mainNews" element={<Layout><MainNewsPage /></Layout>} />
        <Route path="/rcmdNews" element={<Layout><RcmdNewsPage /></Layout>} />
        <Route path="/news" element={<Layout><AllNewsPage /></Layout>} />
        {/* <Route path="/filterNews" element={<FilterNewsPage />} />
        <Route path="/viewCountNews" element={<ViewCountNewsPage />} />
        <Route path="/scrapCountNews" element={<ScrapCountNewsPage />} /> */}
        <Route path="/news/:newsId" element={<Layout><NewsDetailPage /></Layout>} />
        {/* 스크랩 */}
        <Route path="/scrapList" element={<Layout><ScrapListPage /></Layout>} />

        {/* 단어장 */}
        <Route path="/voca" element={<Layout><MainVoca /></Layout>} />
        <Route path="/voca/:vocaId" element={<Layout><VocaDetail /></Layout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
