import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AppDispatch } from "@store/index";
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch,  } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { fetchUserProfileThunk } from "@store/myPage/profileSlice";
// import { RootState } from '@store/index';
import UserProfile from '@components/myPage/UserProfile';
import Ping from '@components/myPage/Ping';
import Fortune from '@components/myPage/Fortune';
import Calendar from '@components/myPage/Calendar';
import ViewNews from '@components/myPage/MyNews';
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
  width: 95%;
  height: 60%;
  border: solid black 1px;
  margin: 3% 0%;
  background-color: #fff;
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
        console.log("프로필 데이터 불러옴:", res);
      })
      .catch((error) => {
        console.error("프로필 불러오기 오류:", error);
      });
  }, [dispatch]);
  const activityData = {
    1: 5,
    2: 10,
    3: 0,
    4: 2,
    5: 15,
    6: 8,
    7: 12,
  };
  return (
    <PageContainer>
      <LeftSection>
        <UserProfile />
        <Calendar activityData={activityData} />
      </LeftSection>

      <RightSection>
        <TopSection>
          <Ping />
          <Fortune />
        </TopSection>
        
        <BottomSection>
          <ViewNews/>
        </BottomSection>
      </RightSection>
    </PageContainer>
  );
};

export default MyPage;
