import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import NewsImage from '../../assets/auth/newsImage.png';
import BackgroundImage from '../../assets/auth/bg.png';
import Input from '@common/InputBox';
import RadioButton from '@common/RadioButton';
import Button from '@common/Button';
import { useState, useEffect } from 'react';
import ProfileImageModal  from '@components/myPage/ProfileImageModal';
import ProfileImageDisplay from '@components/myPage/ProfileImageDisplay';
import defaultProfile from '@assets/auth/defaultProfile.jpg'

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
  left: 23%;
  display: grid;
  gap: 0 20%;
  margin: 0 10%;
  width: 35%;
  // border: 1px solid red;
  align-items: center;
`;

const FormContainer1 = styled.div`
  top: 35%;
  left: 25%;
  justify-content: center;
  width: 55%;
  
`
const FormContainer2 = styled.div`
  top: 35%;
  left: 25%;
`

const Label = styled.label`
  font-size: 14px;
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
    name: "", 
    email: "",
    birthday: "",
    gender: "",
    profileImage: ""
  });
  
  // 유효성 검사 에러 메시지
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    birthday: "",
  });

  const [isModalOpen, setModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [selectedImage, setSelectedImage] = useState<string>(editForm.profileImage || defaultProfile);
  
  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
    setEditForm({ ...editForm, profileImage: image });
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
      navigate("/mypage", { state: { editForm } });
    } else {
      window.alert("모든 정보를 필수로 입력해야 합니다.");
    }
  };

  return (
    <>
      <GlobalStyle />
      <SignUpContainer>
        <FormContainer>
          <FormContainer2>
          <Input name="name" type="text" label="닉네임" placeholder="닉네임을 입력하세요" value={editForm.name} onChange={handleChange}/>
          <Input name="email" type="email" label="이메일" placeholder="이메일을 입력하세요" value={editForm.email} onChange={handleChange} error={errors.email}/>
          <Input name="birthday" type="date" label="생년월일" placeholder="생년월일을 입력하세요" 
            value={editForm.birthday} onChange={handleChange}/>
          
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
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </FormContainer2>
          <FormContainer1>
        <ProfileImageDisplay src={selectedImage} onEdit={() => setModalOpen(true)} />
          <ProfileImageModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSelectImage={handleSelectImage}
          />         
        </FormContainer1> 
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
