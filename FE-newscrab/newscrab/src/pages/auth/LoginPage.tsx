import styled, { createGlobalStyle } from 'styled-components';
import Login from '../../assets/auth/login.png';
import BackgroundImage from '../../assets/auth/bg.png';
import Input from '@common/InputBox';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginLoading } from '../../store/user/login'

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden; /* 배경화면 넘쳐서 스크롤 방지 */
    height: 100%;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  // 배경화면 지정
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const LoginImage = styled.img`
  width: 65%;
`

const FormContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 28%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginButton = styled.button`
  background-color: #ffbe98;
  border: none;
  font-size: 14px;
  border-radius: 10px;
  height: 29px;
  width: 65px;
  box-shadow: 3px 3px 3px #00000059;
  cursor: pointer;

  &:hover {
    background-color: #e09520;
  }
`;

const LoginPage: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    loginId: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const isFormValid = loginForm.loginId !== "" && loginForm.password !== "";
  
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
    setLoginForm({...loginForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <GlobalStyle />  {/* 글로벌 스타일 적용 */}
      <LoginContainer>
        <FormContainer>
          <Input name="loginId" type="text" label="아이디" placeholder='아이디를 입력하세요' value={loginForm.loginId} onChange={handleChange}/>
          <Input name="password" type="password" label="비밀번호" placeholder='비밀번호를 입력하세요' value={loginForm.password} onChange={handleChange} />
          <LoginButton onClick={handleLogin} disabled={!isFormValid}>로그인</LoginButton>
          {errorMessage && <p>{errorMessage}</p>}
        </FormContainer>
        <LoginImage src={Login} alt="loginImage" />
      </LoginContainer>
    </>
  );
};

export default LoginPage;