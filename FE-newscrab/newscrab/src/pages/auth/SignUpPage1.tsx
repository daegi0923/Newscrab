import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import NewsImage from '../../assets/auth/newsImage.png';
import BackgroundImage from '../../assets/auth/bg.png';
import Input from '@common/InputBox';
import RadioButton from '@common/RadioButton';
import Button from '@common/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

  // Form 상태 관리
  const [signupForm, setSignupForm] = useState({
    loginId: "",
    password: "",
    passwordConfirm: "",
    name: "", 
    email: "",
    birthday: "",
    gender: "male",
    userIndustry: []  // 관심 분야는 이후 처리
  });
  
  // const [successMessage, setSuccessMessage] = useState<string>("");
  const [isIdDuplicate, setIsIdDuplicate] = useState<boolean>(false); // ID 중복 여부
  const [isEmailDuplicate, setIsEmailDuplicate] = useState<boolean>(false); // ID 중복 여부
  // 중복 확인 완료 여부 추가
  const [isIdChecked, setIsIdChecked] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);

  const [errors, setErrors] = useState({
    loginId: "",
    password: "",
    passwordConfirm: "",
    email: "",
    birthday: "",
    check: ""
  });
  
  // 입력 필드 변경 핸들러
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
    } else if (field === "email") {
      setIsEmailDuplicate(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
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

  // 이메일 중복 확인
  const handleEmailCheck = async () => {
    try {
      const response = await axios.post("https://newscrab.duckdns.org/api/v1/user/email", { email: signupForm.email });
      
      if (response.data.statusCode === 208) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "이미 사용중인 이메일입니다." }));
        setIsEmailDuplicate(true);
        setIsEmailChecked(false); // 중복 확인 실패
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        setIsEmailDuplicate(false);
        setIsEmailChecked(true); // 중복 확인 성공
      }
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "이메일 확인 중 오류가 발생했습니다." }));
      setIsEmailDuplicate(false);
      setIsEmailChecked(false); // 오류 발생 시 확인 실패 상태로
    }
  };

  const isFormValid = Object.values(errors).every((error) => error === "") &&
  (Object.keys(signupForm) as (keyof typeof signupForm)[]).every((key) => {
    // interest 필드는 비어 있어도 통과하도록
    if (key === "userIndustry") return true;
    return signupForm[key] !== "";
  });

  const handleNext = () => {
    console.log("Signup Form Values: ", signupForm);
    console.log("Errors: ", errors);

    if (!isIdChecked || !isEmailChecked) {
      if (!isIdChecked && !isEmailChecked) {
        window.alert("아이디와 이메일 중복 확인을 완료해주세요.");
      } else if (!isIdChecked) {
        window.alert("아이디 중복 확인을 완료해주세요.");
      } else if (!isEmailChecked) {
        window.alert("이메일 중복 확인을 완료해주세요.");
      }
      return;
    }

    if (isFormValid) {
      navigate("/signup2", { state: { signupForm } });
    } else {
      window.alert("모든 정보를 필수로 입력해야 합니다.");
    }};

  return (
    <>
      <GlobalStyle />
      <SignUpContainer>
        <FormContainer>
          <div style={{ position: 'relative' }}>
            <Input name="loginId" type="text" label="아이디" placeholder="아이디를 입력하세요" value={signupForm.loginId} onChange={handleChange} error={errors.loginId} 
            disabled={isIdDuplicate} onBlur={() => handleBlur('loginId')}
            />
            <DuplicateButton onClick={handleIdCheck}>중복 확인</DuplicateButton>
          </div>
          <Input name="name" type="text" label="닉네임" placeholder="닉네임을 입력하세요" value={signupForm.name} onChange={handleChange}/>
          <Input name="password" type="password" label="비밀번호" placeholder="비밀번호를 입력하세요" value={signupForm.password} onChange={handleChange} error={errors.password}/>
          <div style={{ position: 'relative' }}>
            <Input name="email" type="email" label="이메일" placeholder="이메일를 입력하세요" value={signupForm.email} onChange={handleChange} error={errors.email} 
            disabled={isEmailDuplicate} onBlur={() => handleBlur('email')}
            />
            <DuplicateButton onClick={handleEmailCheck}>중복 확인</DuplicateButton>
          </div>
          <Input name="passwordConfirm" type="password" label="비밀번호 확인" placeholder="비밀번호를 입력하세요" value={signupForm.passwordConfirm} onChange={handleChange} error={errors.passwordConfirm}/>
          <Input name="birthday" type="date" label="생년월일" placeholder="생년월일을 입력하세요" 
            value={signupForm.birthday} onChange={handleChange}/>
          
          {/* 성별 라벨 추가 */}
          <Label>성별</Label>
          
          <RadioButton
            name="gender"
            options={[
              { value: 'MALE', label: '남성' },
              { value: 'FEMALE', label: '여성' },
              { value: 'OTHER', label: '그 외' },
            ]}
            value={signupForm.gender} // 선택된 값을 상태에 맞게 설정
            onChange={handleChange} // 값이 변경될 때 상태 업데이트
          />
          {errors.check && <p style={{ color: "red" }}>{errors.check}</p>}
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
