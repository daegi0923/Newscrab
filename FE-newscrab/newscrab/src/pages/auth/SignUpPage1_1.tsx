import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Input from '@common/InputBox';
import RadioButton from '@common/RadioButton';
import Button from '@common/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BgImage from "@assets/landing/bgImage.png";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevent scrolling */
    height: 100%;
  }
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); 
  z-index: 1; 
`;

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 23%; /* Adjust as needed */
  height: 70%;
  gap: -2px; /* Space between fields - reduced */
  margin: 0 10%;
  z-index: 2; /* Above the overlay */
  padding: 25px; /* Padding for the container */
  background: rgba(255, 255, 255, 0.9); /* Light background for contrast */
  border-radius: 10px; /* Rounded corners */
  // border: 1px solid red;
  padding: 2%;
  `;

const Title = styled.h1`
  text-align: center;
  margin: -3% 0;
  margin-bottom: 20px;
  color: #333; /* Title color */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5%;
  margin-bottom: -2%;
  // border: 1px solid blue;
  `;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #93939;
  margin-left: 8%;
`;

const DuplicateButton = styled.button`
background-color: #1e90ff; /* 기본 배경 색 (밝은 파란색) */
  border: none; /* 테두리 없음 */
  font-size: 14px; /* 폰트 크기 */
  font-weight: 600; /* 폰트 굵기 조정 */
  color: white; /* 텍스트 색상 */
  border-radius: 6px; /* 둥근 모서리 */
  height: 36px; /* 버튼 높이 */
  width: 80px; /* 버튼 너비 */
  cursor: pointer; /* 커서 모양 */
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s; /* 애니메이션 효과 */
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3); /* 미세한 그림자 효과 */

  &:hover {
    background-color: #1c7ed6; /* 호버 시 색상 변화 */
    transform: translateY(-1px); /* 위로 살짝 이동하는 효과 */
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3); /* 그림자 효과 증가 */
  }

  &:active {
    background-color: #155a8a; /* 클릭 시 색상 변화 */
    transform: translateY(0); /* 이동 효과 제거 */
  }
`;

const SignUpPage1: React.FC = () => {
  const navigate = useNavigate();

  // Form 상태 관리
  const [signupForm, setSignupForm] = useState({
    loginId: "",
    password: "",
    passwordConfirm: "",
    name: "", 
    email: "",
    birthday: "",
    gender: "MALE",
    userIndustry: []  // 관심 분야는 이후 처리
  });
  
  const [isIdDuplicate, setIsIdDuplicate] = useState<boolean>(false); // ID 중복 여부
  const [isIdChecked, setIsIdChecked] = useState<boolean>(false); // 중복 확인 완료 여부

  const [errors, setErrors] = useState({
    loginId: "",
    password: "",
    passwordConfirm: "",
    email: "",
    birthday: "",
    check: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleBlur = (field: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));

    if (field === "loginId") {
      setIsIdDuplicate(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        loginId: "",
      }));
    }
  };

  // ID 유효성 검사
  useEffect(() => {
    if (signupForm.loginId && (signupForm.loginId.length < 5 || signupForm.loginId.length > 20)) {
      setErrors((prevErrors) => ({ ...prevErrors, loginId: "ID는 5~20자 사이여야 합니다." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, loginId: "" }));
    }
  }, [signupForm.loginId]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (signupForm.password && !passwordRegex.test(signupForm.password)) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "8~16자, 영어, 숫자, 특수문자 조합이어야 합니다." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
    if (signupForm.passwordConfirm && signupForm.password !== signupForm.passwordConfirm) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: "비밀번호가 일치하지 않습니다." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: "" }));
    }
  }, [signupForm.password, signupForm.passwordConfirm]);

  // 이메일 유효성 검사
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (signupForm.email && !emailRegex.test(signupForm.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "올바른 이메일 형식을 입력하세요." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  }, [signupForm.email]);

  // 생년월일 유효성 검사
  useEffect(() => {
    if (signupForm.birthday === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        birthday: "생년월일을 선택하세요.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        birthday: "",
      }));
    }
  }, [signupForm.birthday]);

  // ID 중복 확인
  const handleIdCheck = async () => {
    try {
      const response = await axios.post("https://newscrab.duckdns.org/api/v1/user/nickname", { loginId: signupForm.loginId });
      
      if (response.data.statusCode === 208) {
        setErrors((prevErrors) => ({ ...prevErrors, loginId: "이미 사용중인 아이디입니다." }));
        setIsIdDuplicate(true);
        setIsIdChecked(false);  // 중복 확인 실패
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, loginId: "" }));
        setIsIdDuplicate(false);
        setIsIdChecked(true);  // 중복 확인 성공
      }
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, loginId: "ID 확인 중 오류가 발생했습니다." }));
      setIsIdDuplicate(false);
      setIsIdChecked(false); // 오류 발생 시 확인 실패 상태로
    }
  };

  const isFormValid = Object.values(errors).every((error) => error === "") &&
  (Object.keys(signupForm) as (keyof typeof signupForm)[]).every((key) => {
    if (key === "userIndustry") return true;
    return signupForm[key] !== "";
  });

  const handleNext = () => {
    if (!isIdChecked) {
      window.alert("아이디 중복 확인을 완료해주세요.");
      return;
    }

    if (isFormValid) {
      navigate("/signup2", { state: { signupForm } });
    } else {
      window.alert("모든 정보를 필수로 입력해야 합니다.");
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackgroundContainer>
        <Overlay/>
        <FormContainer>
          <Title>회원가입</Title>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Input
              name="loginId"
              type="text"
              label="아이디"
              value={signupForm.loginId}
              onChange={handleChange}
              error={errors.loginId}
              disabled={isIdDuplicate}
              onBlur={() => handleBlur('loginId')}
              placeholder='아이디를 입력하세요.'
            />
            <DuplicateButton onClick={handleIdCheck}>중복 확인</DuplicateButton>
          </div>
          <Input name="name" type="text" label="닉네임" value={signupForm.name} onChange={handleChange} placeholder='닉네임을 입력하세요.' />
          <Input name="email" type="email" label="이메일" value={signupForm.email} onChange={handleChange} error={errors.email} placeholder='이메일을 입력하세요.'/>
          <Input name="password" type="password" label="비밀번호" value={signupForm.password} onChange={handleChange} error={errors.password} placeholder='비밀번호를 입력하세요.'/>
          <Input name="passwordConfirm" type="password" label="비밀번호 확인" value={signupForm.passwordConfirm} onChange={handleChange} error={errors.passwordConfirm} placeholder='비밀번호를 다시 입력하세요.' />
          <Input name="birthday" type="date" label="생년월일" value={signupForm.birthday} onChange={handleChange}  placeholder='생일을 선택해주세요.'/>
          
          <Label>성별</Label>
          <RadioButton
            name="gender"
            options={[
              { value: 'MALE', label: '남성' },
              { value: 'FEMALE', label: '여성' },
              { value: 'OTHER', label: '그 외' },
            ]}
            value={signupForm.gender}
            onChange={handleChange}
          />
          <ButtonWrapper>
            <DuplicateButton onClick={handleNext}>다음</DuplicateButton>
          </ButtonWrapper>
        </FormContainer>
      </BackgroundContainer>
    </>
  );
};

export default SignUpPage1;
