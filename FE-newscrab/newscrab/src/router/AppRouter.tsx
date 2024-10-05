import React, { useState } from "react";
import { useAuth } from "@components/common/PrivateRoute";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorModal from "@components/common/Error";
import Layout from "@components/common/Layout";
import LandingPage from "@pages/landing/LandingPage";
// auth
import LoginPage from "@pages/auth/LoginPage";
import LoginPage1 from "@pages/auth/LoginPage1";
import SignUpPage1 from "@pages/auth/SignUpPage1";
import SignUpPage1_1 from "@pages/auth/SignUpPage1_1";
import SignUpPage2 from "@pages/auth/SignUpPage2";
import SignUpPage2_1 from "@pages/auth/SignUpPage2_1";
//뉴스
import MainNewsPage from "@pages/news/mainPage/MainNewsPage";
import RcmdNewsPage from "@pages/news/rcmdNews/RcmdNewsPage";
import AllNewsPage from "@pages/news/allNews/AllNewsPage";
import NewsDetailPage from "@pages/news/detail/NewsDetailPage";
// 스크랩
import ScrapListPage from "@pages/scrap/ScrapListPage";
import ScrapDetailPage from "@pages/scrap/detail/ScrapDetailPage";
// 단어장
import MainVoca from "@pages/voca/VocaPage";
import VocaDetail from "@pages/voca/VocaDetailPage";
// 마이페이지
import MyPage from "@pages/myPage/MyPage";
import PasswordChange from "@pages/myPage/PasswordChangePage";
import ProfileEdit1 from "@pages/myPage/ProfileEditPage1";
import ProfileEdit2 from "@pages/myPage/ProfileEditPage2";

import FortuneCookie from "@pages/myPage/FortunePage";

const AppRouter: React.FC = () => {
  const { isLogedIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const handleAuthError = (message: string) => {
  //   setErrorMessage(message); // 오류 메시지 설정
  // };

  return (
    <Router>
      {/* 오류 메시지가 있을 때만 모달 표시 */}
      {errorMessage && (
        <ErrorModal
          title="오류 발생"
          message={errorMessage}
          onClose={() => {
            console.log("Closing modal");
            setErrorMessage(null); // 모달 닫기 시 오류 메시지 초기화
          }}
        />
      )}

      <Routes>
        <Route path="/fortune" element={<FortuneCookie />} />

        {/* 비로그인 상태일 때 */}
        {!isLogedIn ? (
          <>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login1" element={<LoginPage1 />} />
            <Route path="/signup1" element={<SignUpPage1 />} />
            <Route path="/signup2" element={<SignUpPage2 />} />
            <Route path="/signup11" element={<SignUpPage1_1 />} />
            <Route path="/signup21" element={<SignUpPage2_1 />} />

            {/* 로그인하지 않았을 때 보호된 경로로 접근 시 오류 처리 */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/login"
                  replace
                  state={{ error: "로그인이 필요합니다." }}
                />
              }
            />
          </>
        ) : (
          <>
            {/* 마이페이지 */}
            <Route
              path="/mypage"
              element={
                <Layout>
                  <MyPage />
                </Layout>
              }
            />
            <Route path="/password" element={<PasswordChange />} />
            <Route path="/edit1" element={<ProfileEdit1 />} />
            <Route path="/edit2" element={<ProfileEdit2 />} />

            {/* 뉴스 */}
            <Route
              path="/mainNews"
              element={
                <Layout>
                  <MainNewsPage />
                </Layout>
              }
            />
            <Route
              path="/rcmdNews"
              element={
                <Layout>
                  <RcmdNewsPage />
                </Layout>
              }
            />
            <Route
              path="/news"
              element={
                <Layout>
                  <AllNewsPage />
                </Layout>
              }
            />
            <Route
              path="/news/:newsId"
              element={
                <Layout>
                  <NewsDetailPage />
                </Layout>
              }
            />

            {/* 스크랩 */}
            <Route
              path="/scrap"
              element={
                <Layout>
                  <ScrapListPage />
                </Layout>
              }
            />
            <Route
              path="/scrap/:scrapId"
              element={
                <Layout>
                  <ScrapDetailPage />
                </Layout>
              }
            />

            {/* 단어장 */}
            <Route
              path="/voca"
              element={
                <Layout>
                  <MainVoca />
                </Layout>
              }
            />
            <Route
              path="/voca/:vocaId"
              element={
                <Layout>
                  <VocaDetail />
                </Layout>
              }
            />
            <Route path="*" element={<Navigate to="/mainNews" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
