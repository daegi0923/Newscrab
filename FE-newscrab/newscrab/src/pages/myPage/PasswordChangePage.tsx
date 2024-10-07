import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BgImage from '@assets/landing/bgImage.png';
import Input from '@common/InputBox';
import Button from '@common/Button';
import { useState, useEffect } from 'react';
import API from '@apis/apiClient';
import Swal from 'sweetalert2';

const BackgroundContainer = styled.div`
  background-image: url(${BgImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 280px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const PasswordChange: React.FC = () => {
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState({
    currentPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    
    if (editForm.newPassword && !passwordRegex.test(editForm.newPassword)) {
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: "8~16자, 영어, 숫자, 특수문자 조합이어야 합니다." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: "" }));
    }

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
    if (isFormValid) {
      try {
        const response = await API.put('/user/password', {
          password: editForm.newPassword,
        });

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '비밀번호 변경 완료',
            text: '비밀번호가 성공적으로 변경되었습니다.',
            confirmButtonText: '확인'
          }).then(() => {
            navigate("/mypage");
          });
        }
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: '비밀번호 변경 실패',
          text: '문제가 발생했습니다.',
          confirmButtonText: '확인'
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: '입력 오류',
        text: '모든 필드를 올바르게 입력해 주세요.',
        confirmButtonText: '확인'
      });
    }
  };

  return (
    <BackgroundContainer>
      <FormContainer>
        <Input
          name="currentPassword"
          type="password"
          label="현재 비밀번호"
          placeholder="현재 비밀번호를 입력하세요"
          value={editForm.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
        />
        <Input
          name="newPassword"
          type="password"
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력하세요"
          value={editForm.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />
        <Input
          name="passwordConfirm"
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          value={editForm.passwordConfirm}
          onChange={handleChange}
          error={errors.passwordConfirm}
        />
        <ButtonWrapper>
          <Button onClick={() => navigate("/mypage")}>돌아가기</Button>
          <Button onClick={handlePasswordChange}>저장</Button>
        </ButtonWrapper>
      </FormContainer>
    </BackgroundContainer>
  );
};

export default PasswordChange;
