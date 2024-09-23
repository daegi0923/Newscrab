import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import NewsImage from '../../assets/auth/newsImage.png';
import BackgroundImage from '../../assets/auth/bg.png';
import Input from '@common/InputBox';
import RadioButton from '@common/RadioButton';
import Button from '@common/Button';
import { useState, useEffect } from 'react';

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
  left: 33%;
  // display: grid;
  // grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  gap: 0 20%;
  margin: 0 10%;
  // width: %;
`;

const Label = styled.label`
  font-size: 14px;
  // margin-bottom: %;
  // grid-column: span 2;  /* 라벨이 두 컬럼을 가로질러 위치 */
`;

const ButtonWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
`;

const ProfileEdit1: React.FC = () => {
  const navigate = useNavigate();

  // 사용자 정보 상태 관리
  const [editForm, setEditForm] = useState({
    nickname: "", 
    email: "",
    birthday: "",
    gender: "male", // 기본값: 남성
  });
  
  // 유효성 검사 에러 메시지
  const [errors, setErrors] = useState({
    nickname: "",
    email: "",
    birthday: "",
  });
  
  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // 이메일 유효성 검사
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editForm.email && !emailRegex.test(editForm.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "올바른 이메일 형식을 입력하세요." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  }, [editForm.email]);

  // 생년월일 유효성 검사
  useEffect(() => {
    if (editForm.birthday === "") {
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
  }, [editForm.birthday]);

  const isFormValid = Object.values(errors).every((error) => error === "") &&
    Object.keys(editForm).every((key) => editForm[key as keyof typeof editForm] !== "");

  const handleNext = () => {
    console.log("Edit Form Values: ", editForm);
    console.log("Errors: ", errors);

    if (isFormValid) {
      navigate("/edit2", { state: { editForm } });
    } else {
      window.alert("모든 정보를 필수로 입력해야 합니다.");
    }
  };

  return (
    <>
      <GlobalStyle />
      <SignUpContainer>
        <FormContainer>
        
          <Input name="nickname" type="text" label="닉네임" placeholder="닉네임을 입력하세요" value={editForm.nickname} onChange={handleChange}/>
          <Input name="email" type="email" label="이메일" placeholder="이메일을 입력하세요" value={editForm.email} onChange={handleChange} error={errors.email}/>
          <Input name="birthday" type="date" label="생년월일" placeholder="생년월일을 입력하세요" 
            value={editForm.birthday} onChange={handleChange}/>
          
          {/* 성별 라벨 추가 */}
          <Label>성별</Label>
          
          <RadioButton
            name="gender"
            options={[
              { value: 'male', label: '남성' },
              { value: 'female', label: '여성' },
              { value: 'other', label: '그 외' },
            ]}
            value={editForm.gender} // 선택된 값을 상태에 맞게 설정
            onChange={handleChange} // 값이 변경될 때 상태 업데이트
          />
          {errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}
          <ButtonWrapper>
          <Button onClick={handleNext}>다음</Button>
          </ButtonWrapper>
        </FormContainer>
        <SignUpImage src={NewsImage} alt="SignUpImage" />
      </SignUpContainer>
    </>
  );
};

export default ProfileEdit1;
