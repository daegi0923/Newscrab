import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { AppDispatch } from "@store/index";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfileThunk } from "@store/myPage/profileSlice";
import { RootState } from '@store/index';
import profile1 from "@assets/auth/profile1.jpg";
import profile2 from "@assets/auth/profile2.jpg";
import profile3 from "@assets/auth/profile3.jpg";

// 사용자 정보 컴포넌트 섹션
const UserInfoContainer = styled.div`
  position: relative;
  width: 280px;
  text-align: center;
  margin: 8% 5%;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: #fff;
  position: absolute;
  top: -75px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const UserInfoContent = styled.div`
  margin-top: 75px;
`;

const UserName = styled.p`
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  margin-right: 10px;
`;

const EditButton = styled.button`
  background-color: #a6c8e0;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  display: inline-block;

  &:hover {
    background-color: #90b4d0;
  }
`;

const SmallPopup = styled.div`
  position: absolute;
  top: 39%;
  left: 90%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #d1bebe;
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  width: 120px;
`;

const PopupButton = styled.button`
  background-color: #f9b5ac;
  color: white;
  padding: 7px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 5px;
  width: 100%;

  &:hover {
    background-color: #f69a90;
  }

  &:nth-child(2) {
    background-color: #b5e3e0;
  }

  &:nth-child(2):hover {
    background-color: #a0d1cd;
  }

  &:nth-child(3) {
    background-color: #ffdfba;
  }

  &:nth-child(3):hover {
    background-color: #ffd4a1;
  }
`;

// 마이페이지 컴포넌트
const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.mypage);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

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

  const handleEdit1 = () => { navigate('/edit1'); };
  const handleEdit2 = () => { navigate('/edit2'); };
  const handlePassword = () => { navigate('/password'); };

  const selectedImage = images[userInfo.data.profileImg as keyof typeof images] || profile1;

  // 팝업 외부를 클릭하면 팝업 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  return (
    <UserInfoContainer>
      <UserImage src={selectedImage} alt="User profile" />
      <UserInfoContent>
        <UserName>{userInfo.data.name || "이름 없음"}</UserName>
        <EditButton onClick={() => setPopupOpen(!isPopupOpen)}>수정하기</EditButton>
        {isPopupOpen && (
          <SmallPopup ref={popupRef}>
            <PopupButton onClick={handleEdit1}>회원정보 수정</PopupButton>
            <PopupButton onClick={handleEdit2}>산업군 수정</PopupButton>
            <PopupButton onClick={handlePassword}>비밀번호 수정</PopupButton>
          </SmallPopup>
        )}
      </UserInfoContent>
    </UserInfoContainer>
  );
};

export default UserProfile;
