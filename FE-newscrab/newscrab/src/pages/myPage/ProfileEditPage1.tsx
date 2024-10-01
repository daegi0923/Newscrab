// import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import NewsImage from "../../assets/auth/newsImage.png";
import BackgroundImage from "../../assets/auth/bg.png";
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

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden; /* 배경화면 넘쳐서 스크롤 방지 */
    height: 100%;
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
  align-items: center;
`;

const FormContainer1 = styled.div`
  justify-content: center;
  width: 55%;
`;

const FormContainer2 = styled.div``;

const Label = styled.label`
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
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

const ProfileEdit1: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // Redux 상태에서 사용자 정보 가져오기
  const { userInfo } = useSelector((state: RootState) => state.mypage);

  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);

  // 사용자 정보 상태 관리 (초기값을 사용자 정보로 설정)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    birthday: "",
    gender: "", // 성별 기본값은 빈 문자열
    profileImg: "",
  });

  const [errors] = useState({
    name: "",
    email: "",
    birthday: "",
  });
  // const [errors, setErrors] = useState({
  //   name: "",
  //   email: "",
  //   birthday: "",
  // });

  const [isModalOpen, setModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [selectedImage, setSelectedImage] = useState<string>(profile1);

  // 이미지 경로를 A, B, C로 매핑하는 함수
  const mapImageToEnum = (imageSrc: string) => {
    if (imageSrc === profile1) return "A";
    if (imageSrc === profile2) return "B";
    if (imageSrc === profile3) return "C";
    return "";
  };

  const mapEnumToImage = (imageEnum: string) => {
    if (imageEnum === "A") return profile1;
    if (imageEnum === "B") return profile2;
    if (imageEnum === "C") return profile3;
    return defaultProfile;
  };

  // 사용자 정보를 불러와서 초기값 설정 (처음 마운트될 때 실행)
  useEffect(() => {
    dispatch(fetchUserProfileThunk())
      .unwrap()
      .then((res) => {
        console.log("프로필 데이터 불러옴!!:", res);
        setLoading(false); // 데이터가 불러와지면 로딩 해제
      })
      .catch((error) => {
        console.error("프로필 불러오기 오류:", error);
        setLoading(false); // 에러 발생 시에도 로딩 해제
      });
  }, [dispatch]);

  useEffect(() => {
    if (userInfo && userInfo.data) {
      console.log("업데이트된 사용자 정보:", userInfo);
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

  if (loading) {
    return <p>Loading...</p>; // 로딩 중일 때 표시할 UI
  }

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // 라디오 버튼 변경 핸들러
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, gender: e.target.value });
  };

  const handleSelectImage = (imageSrc: string) => {
    const imageEnum = mapImageToEnum(imageSrc);
    setSelectedImage(imageSrc);
    setEditForm({ ...editForm, profileImg: imageEnum }); // A, B, C로 설정
  };

  const handleSave = async () => {
    try {
      console.log("수정된 사용자 데이터:", editForm);
      // 모든 필드를 포함한 데이터를 PUT 요청으로 전송
      const response = await dispatch(
        updateUserProfileThunk(editForm)
      ).unwrap();
      console.log("수정 완료:", response);
      navigate('/mypage');  // 성공 시 이동
    } catch (error) {
      console.error("회원 정보 업데이트 실패:", error);
      alert("정보를 업데이트하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <GlobalStyle />
      <SignUpContainer>
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
              error={errors.email}
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
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
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
          </ButtonWrapper>
        </FormContainer>
        <SignUpImage src={NewsImage} alt="SignUpImage" />
      </SignUpContainer>
    </>
  );
};

export default ProfileEdit1;
