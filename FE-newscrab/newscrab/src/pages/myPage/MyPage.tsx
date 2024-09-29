import React, {useEffect} from 'react';
import styled from 'styled-components';
import { AppDispatch } from "@store/index";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfileThunk } from "@store/myPage/profileSlice";
import { RootState } from '@store/index';
import profile1 from "@assets/auth/profile1.jpg";
import profile2 from "@assets/auth/profile2.jpg";
import profile3 from "@assets/auth/profile3.jpg";
import UserProfile from '@components/myPage/UserProfile';
// import { industry } from '@components/common/Industry';

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

  return (
    <UserProfile />
  );
};

export default MyPage;
