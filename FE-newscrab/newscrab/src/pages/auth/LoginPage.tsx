import styled, { createGlobalStyle } from 'styled-components';
import Login from '../../assets/auth/login.png';
import BackgroundImage from '../../assets/auth/bg.png';
import Input from '@common/InputBox';

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
  return (
    <>
      <GlobalStyle />  {/* 글로벌 스타일 적용 */}
      <LoginContainer>
        <FormContainer>
          <Input type="text" label="아이디" placeholder='아이디를 입력하세요' />
          <Input type="password" label="비밀번호" placeholder='비밀번호를 입력하세요' />
          <LoginButton>로그인</LoginButton>
        </FormContainer>
        <LoginImage src={Login} alt="loginImage" />
      </LoginContainer>
    </>
  );
};

export default LoginPage;
