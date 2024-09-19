import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import NewsImage from '../../assets/auth/newsImage.png';
import BackgroundImage from '../../assets/auth/bg.png';
import Input from '@common/InputBox';
import RadioButton from '@common/RadioButton';
import Button from '@common/Button';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden; /* 배경화면 넘쳐서 스크롤 방지 */
    height: 100%;
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const SignUpImage = styled.img`
  width: 65%;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 35%;
  left: 24%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  gap: 0 20%;
  margin: 0 10%;
  width: 30%;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  grid-column: span 2;  /* 라벨이 두 컬럼을 가로질러 위치 */
`;

const ButtonWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
`;

const DuplicateButton = styled.button`
  background-color: #ffbe98;
  border: none;
  font-size: 12px;
  border-radius: 10px;
  height: 20px;
  width: 70px;
  position: absolute;
  top: -2%; /* 원하는 위치로 이동 */
  left: 70%; /* 오른쪽으로 배치 */
  box-shadow: 3px 3px 3px #00000059;
  cursor: pointer;

  &:hover {
    background-color: #e09520;
  }
`;

const SignUpPage1: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/signup2");
  };

  return (
    <>
      <GlobalStyle />
      <SignUpContainer>
        <FormContainer>
          <div style={{ position: 'relative' }}>
            <Input type="text" label="아이디" placeholder="아이디를 입력하세요" />
            <DuplicateButton>중복 확인</DuplicateButton>
          </div>
          <Input type="text" label="닉네임" placeholder="닉네임을 입력하세요" />
          <Input type="password" label="비밀번호" placeholder="비밀번호를 입력하세요" />
          <Input type="email" label="이메일" placeholder="이메일을 입력하세요" />
          <Input type="password" label="비밀번호 확인" placeholder="비밀번호를 입력하세요" />
          <Input type="date" label="생년월일" placeholder="생년월일을 입력하세요" />
          
          {/* 성별 라벨 추가 */}
          <Label>성별</Label>
          
          <RadioButton
            name="gender"
            options={[
              { value: 'male', label: '남성' },
              { value: 'female', label: '여성' },
              { value: 'other', label: '그 외' },
            ]}
          />
          
          <ButtonWrapper>
          <Button onClick={handleNext}>다음</Button>
          </ButtonWrapper>
        </FormContainer>
        <SignUpImage src={NewsImage} alt="SignUpImage" />
      </SignUpContainer>
    </>
  );
};

export default SignUpPage1;
