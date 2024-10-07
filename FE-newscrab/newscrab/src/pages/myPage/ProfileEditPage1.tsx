import styled, { createGlobalStyle } from "styled-components";
import Input from "@common/InputBox";
import RadioButton from "@common/RadioButton";
import Button from "@common/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileImageModal from "@components/myPage/ProfileImageModal";
import ProfileImageDisplay from "@components/myPage/ProfileImageDisplay";
import defaultProfile from "@assets/auth/defaultProfile.jpg";
import { AppDispatch } from "@store/index";
import { useNavigate } from "react-router-dom";
import {
  updateUserProfileThunk,
  fetchUserProfileThunk,
} from "@store/myPage/profileSlice";
import profile1 from "@assets/auth/profile1.jpg";
import profile2 from "@assets/auth/profile2.jpg";
import profile3 from "@assets/auth/profile3.jpg";
import Swal from 'sweetalert2';
import BgImage from "@assets/landing/bgImage.png";

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
  background-image: url(${BgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const WhiteBackground = styled.div`
  width: 45%;
  background-color: rgba(255, 255, 255, 0.95); /* Set background opacity to 95% */
  padding: 20px 0px 30px 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for some depth */
  border-radius: 10px;
  z-index: 1; /* Ensures the white div is on top */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
`;

const Title = styled.h2`
  text-align: center; /* Ensure the title is centered */
  margin-bottom: 20px;
`;


const FormContainer = styled.div`
  display: grid;
  gap: 0 20%;
  margin: 0 10%;
  width: 100%;
  align-items: center;
`;

const FormContainer1 = styled.div`
  justify-content: center;
  width: 50%;
`;

const FormContainer2 = styled.div`
padding-left: 40px;
margin-right: -20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-left: 20px;
`;

const ButtonWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  // justify-content: center;
  margin-left: 38%;
  gap: 20px;
  `;

interface UserProfile {
  userInfo: {
    data: {
      name: string;
      email: string;
      birthday: string;
      gender: string; // 성별: "male", "female", "other" 중 하나
      profileImg: string;
    };
  };
}

interface RootState {
  mypage: UserProfile;
}

// 이미지 경로를 A, B, C로 매핑하는 함수 수정
const mapEnumToImage = (imageEnum: string) => {
  if (imageEnum === "A") return profile1;
  if (imageEnum === "B") return profile2;
  if (imageEnum === "C") return profile3;
  return defaultProfile;
};
const mapImageToEnum = (imageSrc: string) => {
  if (imageSrc === profile1) return "A";
  if (imageSrc === profile2) return "B";
  if (imageSrc === profile3) return "C";
  return "";
};

const ProfileEdit1: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  
  const { userInfo } = useSelector((state: RootState) => state.mypage);
  
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    birthday: "",
    gender: "",
    profileImg: "",
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>(defaultProfile);

  // 사용자 정보 불러오기
  useEffect(() => {
    dispatch(fetchUserProfileThunk())
      .unwrap()
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("프로필 불러오기 오류:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (userInfo && userInfo.data) {
      setEditForm({
        name: userInfo.data.name,
        email: userInfo.data.email,
        birthday: userInfo.data.birthday,
        gender: userInfo.data.gender,
        profileImg: userInfo.data.profileImg || "A",
      });
      setSelectedImage(mapEnumToImage(userInfo.data.profileImg || "A"));
    }
  }, [userInfo]);

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // 라디오 버튼 변경 핸들러
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, gender: e.target.value });
  };

  // 이미지 선택 핸들러
  const handleSelectImage = (imageSrc: string) => {
    const imageEnum = mapImageToEnum(imageSrc);
    setSelectedImage(imageSrc);
    setEditForm({ ...editForm, profileImg: imageEnum });
  };

  // 저장 핸들러
  const handleSave = async () => {
    if (!editForm.name || !editForm.email || !editForm.birthday || !editForm.gender) {
      Swal.fire({
        icon: 'warning',
        title: '입력 오류',
        text: '모든 필드를 올바르게 입력해 주세요.',
        confirmButtonText: '확인'
      });
      return;
    }

    try {
      await dispatch(updateUserProfileThunk(editForm)).unwrap();
      Swal.fire({
        icon: 'success',
        title: '저장 성공',
        text: '회원 정보가 성공적으로 저장되었습니다.',
        confirmButtonText: '확인'
      }).then(() => {
        navigate('/mypage');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '저장 실패',
        text: '회원 정보를 저장하는 중 오류가 발생했습니다. 다시 시도해 주세요.',
        confirmButtonText: '확인'
      });
    }
  };

  const handleBack = () => {
    navigate('/mypage');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <GlobalStyle />
      <SignUpContainer>
        <WhiteBackground>
        <Title>회원 정보 수정</Title>
          <FormContainer>
            <FormContainer2>
              <Input
                name="name"
                type="text"
                label="닉네임"
                placeholder="닉네임을 입력하세요"
                value={editForm.name}
                onChange={handleChange}
              />
              <Input
                name="email"
                type="email"
                label="이메일"
                placeholder="이메일을 입력하세요"
                value={editForm.email}
                onChange={handleChange}
              />
              <Input
                name="birthday"
                type="date"
                label="생년월일"
                placeholder="생년월일을 입력하세요"
                value={editForm.birthday}
                onChange={handleChange}
              />

              <Label>성별</Label>
              <RadioButton
                name="gender"
                options={[
                  { value: "MALE", label: "남성" },
                  { value: "FEMALE", label: "여성" },
                  { value: "OTHER", label: "그 외" },
                ]}
                value={editForm.gender}
                onChange={handleGenderChange}
              />
            </FormContainer2>
            <FormContainer1>
              <ProfileImageDisplay
                src={selectedImage}
                onEdit={() => setModalOpen(true)}
              />
              <ProfileImageModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSelectImage={handleSelectImage}
              />
            </FormContainer1>
            <ButtonWrapper>
              <Button onClick={handleSave}>저장</Button>
              <Button onClick={handleBack}>돌아가기</Button>
            </ButtonWrapper>
          </FormContainer>
        </WhiteBackground>
      </SignUpContainer>
    </>
  );
};

export default ProfileEdit1;
