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
// 게시글
import ArticlePage from "@pages/article/ArticlePage";
import ArticleScrapDetailPage from "@pages/article/scrapDetail/ArticleScrapDetailPage";
// 마이페이지
import MyPage from "@pages/myPage/MyPage";
import PasswordChange from "@pages/myPage/PasswordChangePage";
import ProfileEdit1 from "@pages/myPage/ProfileEditPage1";
import ProfileEdit2 from "@pages/myPage/ProfileEditPage2";

// 기타
import FortuneCookie from "@pages/myPage/FortunePage";
import Ping1 from "@pages/ping/ping1"
import Ping2 from "@pages/ping/ping2"
import Ping3 from "@pages/ping/ping3"
import Ping4 from "@pages/ping/ping4"
import Ping5 from "@pages/ping/ping5"
import Ping6 from "@pages/ping/ping6"
import Ping7 from "@pages/ping/ping7"
import Ping8 from "@pages/ping/ping8"
import Ping9 from "@pages/ping/ping9"
import Ping10 from "@pages/ping/ping10"
import Ping11 from "@pages/ping/ping11"
import Ping12 from "@pages/ping/ping12"
import Ping13 from "@pages/ping/ping13"
import Ping14 from "@pages/ping/ping14"
import Ping15 from "@pages/ping/ping15"

// 핑테스트
import TestPage from "@pages/ping/TestPage"
import Test1 from "@pages/ping/test1"
import Test2 from "@pages/ping/test2"
import Test3 from "@pages/ping/test3"
import Test4 from "@pages/ping/test4"
import Test5 from "@pages/ping/test5"
import Test6 from "@pages/ping/test6"

const AppRouter: React.FC = () => {
  const { isLogedIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [answers, setAnswers] = useState<number[]>(Array(6).fill(-1));

  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answerIndex;
    setAnswers(updatedAnswers);
  };

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
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/test1" element={<Test1 onSelect={(answerIndex) => handleSelectAnswer(0, answerIndex)} />} />
        <Route path="/test2" element={<Test2 onSelect={(answerIndex) => handleSelectAnswer(1, answerIndex)} />} />
        <Route path="/test3" element={<Test3 onSelect={(answerIndex) => handleSelectAnswer(2, answerIndex)} />} />
        <Route path="/test4" element={<Test4 onSelect={(answerIndex) => handleSelectAnswer(3, answerIndex)} />} />
        <Route path="/test5" element={<Test5 onSelect={(answerIndex) => handleSelectAnswer(4, answerIndex)} />} />
        <Route path="/test6" element={<Test6 onSelect={(answerIndex) => handleSelectAnswer(5, answerIndex)} answers={answers} />} />
        <Route path="/ping1" element={<Ping1 />} />
        <Route path="/ping2" element={<Ping2 />} />
        <Route path="/ping3" element={<Ping3 />} />
        <Route path="/ping4" element={<Ping4 />} />
        <Route path="/ping5" element={<Ping5 />} />
        <Route path="/ping6" element={<Ping6 />} />
        <Route path="/ping7" element={<Ping7 />} />
        <Route path="/ping8" element={<Ping8 />} />
        <Route path="/ping9" element={<Ping9 />} />
        <Route path="/ping10" element={<Ping10 />} />
        <Route path="/ping11" element={<Ping11 />} />
        <Route path="/ping12" element={<Ping12 />} />
        <Route path="/ping13" element={<Ping13 />} />
        <Route path="/ping14" element={<Ping14 />} />
        <Route path="/ping15" element={<Ping15 />} />

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
                  to="/login1"
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
            <Route
              path="/fortune"
              element={
                <Layout>
                  <FortuneCookie />
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

            {/* 게시글 */}
            <Route
              path="/article"
              element={
                <Layout>
                  <ArticlePage />
                </Layout>
              }
            />
            <Route
              path="/article/:articleId"
              element={
                <Layout>
                  <ArticleScrapDetailPage />
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
