import React, { useEffect } from "react";
import styled from "styled-components";
import { AppDispatch } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfileThunk } from "@store/myPage/profileSlice";
import { RootState } from "@store/index";
import profile1 from "@assets/auth/profile1.jpg";
import profile2 from "@assets/auth/profile2.jpg";
import profile3 from "@assets/auth/profile3.jpg";
// import { industry } from '@components/common/Industry';

// 사용자 정보 컴포넌트 섹션
const UserInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ccc;
  padding: 20px;
  width: 350px;
  border-radius: 10px;
  margin: 20px 0;
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: #f0f0f0;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }

  &:nth-child(2) {
    background-color: #ef4444;
  }

  &:nth-child(2):hover {
    background-color: #dc2626;
  }
`;

// 마이페이지 컴포넌트
const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.mypage);
  // const {name, userIndustry} = useSelector((state: RootState) => state.mypage.userInfo);
  // const isAuthenticated = useSelector((state: RootState) => state.mypage.isAuthenticated);

  const images = {
    A: profile1,
    B: profile2,
    C: profile3,
  };

  // 사용자 정보를 불러와서 초기값 설정 (처음 마운트될 때 실행)
  useEffect(() => {
    dispatch(fetchUserProfileThunk())
      .unwrap()
      .then((res) => {
        console.log("프로필 데이터 불러옴:", res);
      })
      .catch((error) => {
        console.error("프로필 불러오기 오류:", error);
      });
  }, [dispatch]);

  const handleEdit1 = () => {
    navigate("/edit1"); // 클릭 시 해당 vocaId로 이동
  };

  const handleEdit2 = () => {
    navigate("/edit2"); // 클릭 시 해당 vocaId로 이동
  };

  const handlePassword = () => {
    navigate("/password"); // 클릭 시 해당 vocaId로 이동
  };

  const selectedImage = images[userInfo.profileImg as keyof typeof images] || profile1;

  return (
    <>
    <UserInfoSection>
      {/* 사용자 이미지 자리 (나중에 실제 이미지를 삽입할 수 있음) */}
      <UserImage src={selectedImage} alt="User profile" />

        <div>
        <p>이름: {userInfo.name || "이름 없음"}</p>
        </div>

        {/* 회원정보수정 및 비밀번호수정 버튼 */}
        <ButtonGroup>
          <StyledButton onClick={handleEdit1}>회원정보수정</StyledButton>
          <StyledButton onClick={handleEdit2}>산업군 수정</StyledButton>
          <StyledButton onClick={handlePassword}>비밀번호수정</StyledButton>
        </ButtonGroup>
      </UserInfoSection>

      <p>스크랩 수: {userInfo.scrapCount || "0"}</p>
      <p>단어 수: {userInfo.vocaCount || "0"}</p>
      <p>성별: {userInfo.gender || "0"}</p>
    </>
  );
};

export default MyPage;
