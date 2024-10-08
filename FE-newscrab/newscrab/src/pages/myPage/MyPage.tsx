import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AppDispatch } from '@store/index';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { fetchUserProfileThunk } from '@store/myPage/profileSlice';
// import { RootState } from '@store/index';
import UserProfile from '@components/myPage/UserProfile';
import Ping from '@components/myPage/Ping';
import Fortune from '@components/myPage/Fortune';
import Calendar from '@components/myPage/Calendar';
import ViewNews from '@components/myPage/MyNews';
import LikeNews from '@components/myPage/LikeNews';
// import { industry } from '@components/common/Industry';

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // text-align: center;
  justify-content: center;
  margin-top: 5%;
  width: 30%; /* 왼쪽 섹션 너비 */
  padding: 20px;
  // background-color: #f9f9f9;
  // border-right: 1px solid #ccc;
`;

const RightSection = styled.div`
  width: 70%; /* 오른쪽 섹션 너비 */
  padding: 20px;
`;

const TopSection = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  margin-top: 5%;
`;
const BottomSection = styled.div`
  width: 93%;
  height: 60%;
  // border: dashed #888 1.4px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 3% 0%;
  background-color: #fff;
  border-radius: 10px;
`;
const Overlay = styled.div`
  position: absolute;
  z-index: 10;
  top: 0; /* 오버레이가 카드에 완전히 겹치도록 */
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 219, 112, 0.8) 45%,
    rgba(132, 50, 255, 0.6) 50%,
    transparent 54%
  );
  filter: brightness(1.2) opacity(0.8);
  mix-blend-mode: screen;
  background-size: 150% 150%;
  background-position: 100%;
  transition: all 0.1s ease;
  // border: 3px solid red;
`;


const MyPage: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  // const { userInfo } = useSelector((state: RootState) => state.mypage);

  // 사용자 정보를 불러와서 초기값 설정 (처음 마운트될 때)
  useEffect(() => {
    dispatch(fetchUserProfileThunk())
      .unwrap()
      .then((res) => {
        console.log('프로필 데이터 불러옴:', res);
      })
      .catch((error) => {
        console.error('프로필 불러오기 오류:', error);
      });
  }, [dispatch]);

  // 컴포넌트가 마운트될 때 새로고침 여부 확인 및 새로고침 실행
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      sessionStorage.setItem('hasRefreshed', 'true'); // 새로고침 방지 위한 값 설정
      window.location.reload(); // 페이지 리로드
    }

    // 페이지 떠날 때 sessionStorage에서 값 제거
    return () => {
      sessionStorage.removeItem('hasRefreshed');
    };
  }, []);

  return (
    <PageContainer>
      <LeftSection>
        <UserProfile />
        <Calendar />
      </LeftSection>

      <RightSection>
        <TopSection>
          <Ping />
          <Fortune />
        </TopSection>

        <BottomSection>
          <ViewNews />
          <LikeNews />
        </BottomSection>
      </RightSection>
    </PageContainer>
  );
};

export default MyPage;
