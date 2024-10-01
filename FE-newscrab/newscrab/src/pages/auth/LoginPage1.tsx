import styled from 'styled-components';
// import Login from '../../assets/auth/login.png';
import BgImage from "@assets/landing/bgImage.png";
import Input from '@common/InputBox';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginLoading } from '../../store/user/loginLogout';
import ErrorModal from '@components/common/Error';
import { useLocation, useNavigate } from 'react-router-dom';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* 검은색 투명도 20% */
  z-index: 1; /* 오버레이는 가장 아래 */
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* 투명 배경 */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px; /* 너비를 조정 */
  position: relative; /* 상대적인 위치를 설정 */
  z-index: 2; /* 폼 컨테이너는 오버레이 위로 */
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  background-color: #0073b1;
  border: none;
  font-size: 16px;
  border-radius: 25px;
  height: 40px;
  width: 70%;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #005582;
  }
`;

const SignupContainer = styled.div`
  margin-top: 20px;
  font-size: 14px;
`;

const SignupLink = styled.a`
  color: #0073b1;
  font-weight: bold;
  cursor: pointer;
`;

const BackgroundContainer = styled.div`
  background-image: url(${BgImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 부모 요소도 position 설정 필요 */
`;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    loginId: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isFormValid = loginForm.loginId !== "" && loginForm.password !== "";
  const location = useLocation();
  const navigate = useNavigate();
  const error = location.state?.error;

  const handleLogin = () => {
    if (isFormValid) {
      dispatch(
        loginLoading({
          loginId: loginForm.loginId,
          password: loginForm.password,
        })
      );
    } else {
      setErrorMessage("아이디와 비밀번호를 모두 입력하세요.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleLogin(); // 엔터키를 눌렀을 때 로그인 함수 호출
    }
  };

  const handleModalClose = () => {
    setErrorMessage(null);
    navigate("/login", { replace: true, state: {} });
  };

  const handleSignUp = () => {
    setErrorMessage(null);
    navigate("/signup1");
  };

  return (
    <>
      {error && <ErrorModal title="로그인 오류" message={error} onClose={handleModalClose} />}
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
          }
          #root {
            height: 100%;
          }
        `}
      </style>
      <BackgroundContainer>
        <Overlay /> {/* 오버레이가 배경 위에 오지만, 폼 아래에 있음 */}
        <FormContainer onKeyDown={handleKeyDown}>
          <Title>로그인</Title>
          <Input
            name="loginId"
            type="text"
            label="아이디" 
            placeholder="아이디를 입력하세요."
            value={loginForm.loginId}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            label="비밀번호" 
            placeholder="비밀번호를 입력하세요."
            value={loginForm.password}
            onChange={handleChange}
          />
          <LoginButton onClick={handleLogin} disabled={!isFormValid}>
            로그인
          </LoginButton>
          {errorMessage && <p>{errorMessage}</p>}
          <SignupContainer>
            NEWSCRAB이 처음이세요? <SignupLink onClick={handleSignUp}>회원 가입</SignupLink>
          </SignupContainer>
        </FormContainer>
      </BackgroundContainer>
    </>
  );
};

export default LoginPage;
