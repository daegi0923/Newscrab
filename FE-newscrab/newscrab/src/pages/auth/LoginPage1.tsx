import styled from 'styled-components';
import BgImage from "@assets/landing/bgImage.png";
import Input from '@common/InputBox';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginLoading } from '../../store/user/loginLogout';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert2 추가

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
  padding: 9px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
  position: relative;
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
  width: 60%;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #005582;
  }
`;

const SignupContainer = styled.div`
  margin: 12px 0 8px;
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
  position: relative;
`;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    loginId: "",
    password: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const error = location.state?.error;

  // ID 검증 함수 (5~20자 이내)
  const validateLoginId = (loginId: string) => {
    const idPattern = /^[a-zA-Z0-9]{5,20}$/;
    return idPattern.test(loginId);
  };

  // 비밀번호 검증 함수 (8~16자, 영어, 숫자, 특수문자 조합)
  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    return passwordPattern.test(password);
  };

  const handleLogin = () => {
    if (!loginForm.loginId || !loginForm.password) {
      Swal.fire({
        icon: 'error',
        title: '입력 오류',
        text: '아이디와 비밀번호를 모두 입력하세요.',
      });
      return;
    }

    if (!validateLoginId(loginForm.loginId)) {
      Swal.fire({
        icon: 'error',
        title: '아이디 오류',
        text: '아이디는 5~20자 이내의 영문자 또는 숫자여야 합니다.',
      });
      return;
    }

    if (!validatePassword(loginForm.password)) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호 오류',
        text: '비밀번호는 8~16자 이내의 영어, 숫자, 특수문자를 포함해야 합니다.',
      });
      return;
    }

    // 검증 통과 시 로그인 시도
    dispatch(
      loginLoading({
        loginId: loginForm.loginId,
        password: loginForm.password,
      })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleLogin(); // 엔터키를 눌렀을 때 로그인 함수 호출
    }
  };

  const handleSignUp = () => {
    navigate("/signup1");
  };

  return (
    <>
      {error && Swal.fire({
        icon: 'error',
        title: '로그인 오류',
        text: error,
      })}
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
          <LoginButton onClick={handleLogin}>
            로그인
          </LoginButton>
          <SignupContainer>
            NEWSCRAB이 처음이세요? <SignupLink onClick={handleSignUp}>회원 가입</SignupLink>
          </SignupContainer>
        </FormContainer>
      </BackgroundContainer>
    </>
  );
};

export default LoginPage;
