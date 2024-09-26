import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '@store/index';
// import { industry } from '@components/common/Industry';

// 사용자 정보 컴포넌트 섹션
const UserInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ccc;
  padding: 20px;
  width: 250px;
  border-radius: 10px;
  margin: 20px 0;
`;

const UserImage = styled.div`
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
  // const {name, userIndustry} = useSelector((state: RootState) => state.mypage.userInfo);
  // const isAuthenticated = useSelector((state: RootState) => state.mypage.isAuthenticated);

  const handleEdit1 = () => {
    navigate('/edit1'); // 클릭 시 해당 vocaId로 이동
  };

  const handleEdit2 = () => {
    navigate('/edit2'); // 클릭 시 해당 vocaId로 이동
  };

  const handlePassword = () => {
    navigate('/password'); // 클릭 시 해당 vocaId로 이동
  };

  return (
    <UserInfoSection>
      {/* 사용자 이미지 자리 (나중에 실제 이미지를 삽입할 수 있음) */}
      <UserImage />

      {/* {isAuthenticated && (
        <div>
          <p>이름 : {name}</p>
          <p>관심 산업: {userIndustry.map(industry => industry.industryName).join(', ')}</p>
        </div>
      )} */}
      
      {/* 회원정보수정 및 비밀번호수정 버튼 */}
      <ButtonGroup>
        <StyledButton onClick={handleEdit1}>회원정보수정</StyledButton>
        <StyledButton onClick={handleEdit2}>산업군 수정</StyledButton>
        <StyledButton onClick={handlePassword}>비밀번호수정</StyledButton>
      </ButtonGroup>
    </UserInfoSection>
  );
};

export default MyPage;
