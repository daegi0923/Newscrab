import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import NewsImage from '../../assets/auth/newsImage.png';
import BackgroundImage from '../../assets/auth/bg.png';
import Input from '@common/InputBox';
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
  top: 37%;
  left: 33%;
  // display: grid;
  // grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  gap: 0 20%;
  margin: 0 10%;
  // width: 30%;
`;

const ButtonWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
`;


const PasswordChange: React.FC = () => {
  const navigate = useNavigate();

  // Form 상태 관리
  const [editForm, setEditForm] = useState({
    currentPassword: "",  // 현재 비밀번호
    newPassword: "",      // 새 비밀번호
    passwordConfirm: "",  // 새 비밀번호 확인
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // 비밀번호 유효성 검사
  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    
    // 새 비밀번호 유효성 검사
    if (editForm.newPassword && !passwordRegex.test(editForm.newPassword)) {
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: "8~16자, 영어, 숫자, 특수문자 조합이어야 합니다." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: "" }));
    }

    // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (editForm.passwordConfirm && editForm.newPassword !== editForm.passwordConfirm) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: "비밀번호가 일치하지 않습니다." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: "" }));
    }
  }, [editForm.newPassword, editForm.passwordConfirm]);

  const isFormValid = Object.values(errors).every((error) => error === "") &&
    editForm.currentPassword !== "" &&
    editForm.newPassword !== "" &&
    editForm.passwordConfirm !== "";

  const handlePasswordChange = async () => {
    console.log("변경할 비밀번호 정보:", editForm); // 콘솔에 비밀번호 정보 출력

    if (isFormValid) {
      try {
        const response = await axios.put('https://newscrab.duckdns.org/api/v1/user/pw', {
          currentPassword: editForm.currentPassword,
          newPassword: editForm.newPassword,
        });

        if (response.status === 200) {
          console.log("비밀번호 변경 성공:", response.data);
          alert("비밀번호가 성공적으로 변경되었습니다.");
          navigate("/mypage"); // 예시: 프로필 페이지로 이동
        }
      } catch (error) {
        console.error("비밀번호 변경 실패:", error);
        alert("비밀번호 변경 중 오류가 발생했습니다.");
      }
    } else {
      window.alert("모든 필드를 올바르게 입력해 주세요.");
    }
  };
  return (
    <>
      <GlobalStyle />
      <SignUpContainer>
        <FormContainer>          
          <Input name="currentPassword" type="password" label="현재 비밀번호" placeholder="현재 비밀번호를 입력하세요" value={editForm.currentPassword} onChange={handleChange} error={errors.currentPassword} />
          <Input name="newPassword" type="password" label="비밀번호" placeholder="새 비밀번호를 입력하세요" value={editForm.newPassword} onChange={handleChange} error={errors.newPassword}/>
          <Input name="passwordConfirm" type="password" label="비밀번호 확인" placeholder="비밀번호를 입력하세요" value={editForm.passwordConfirm} onChange={handleChange} error={errors.passwordConfirm}/>
          {errors.passwordConfirm  && <p style={{ color: "red" }}>{errors.passwordConfirm}</p>}
          <ButtonWrapper>
          <Button onClick={handlePasswordChange}>다음</Button>
          </ButtonWrapper>
        </FormContainer>
        <SignUpImage src={NewsImage} alt="SignUpImage" />
      </SignUpContainer>
    </>
  );
};

export default PasswordChange;
