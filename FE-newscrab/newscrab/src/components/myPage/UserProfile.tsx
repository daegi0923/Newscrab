// import React, { useEffect, useState, useRef } from 'react';
// import styled from 'styled-components';
// import { AppDispatch } from "@store/index";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchUserProfileThunk } from "@store/myPage/profileSlice";
// import { RootState } from '@store/index';
// import profile1 from "@assets/auth/profile1.jpg";
// import profile2 from "@assets/auth/profile2.jpg";
// import profile3 from "@assets/auth/profile3.jpg";
// import { words } from '@components/voca/VocaList';

// // 기존 스타일 유지
// const UserInfoContainer = styled.div`
//   position: relative;
//   width: 280px;
//   text-align: center;
//   margin: 8% 5%;
//   padding: 20px;
//   border: 2px solid #ccc;
//   border-radius: 10px;
//   background-color: #fff;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const UserImage = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   border: 2px solid #ccc;
//   background-color: #fff;
//   position: absolute;
//   top: -75px;
//   left: 50%;
//   transform: translateX(-50%);
//   z-index: 1;
// `;

// const UserInfoContent = styled.div`
//   margin-top: 75px;
// `;

// const UserName = styled.p`
//   font-size: 20px;
//   font-weight: bold;
//   display: inline-block;
//   margin-right: 10px;
// `;

// // 드롭다운 버튼 스타일
// const EditButton = styled.button`
//   background-color: #007bff; /* 버튼 배경색 */
//   color: #ffffff; /* 버튼 텍스트 색상 */
//   padding: 5px 10px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 14px;
//   transition: background-color 0.3s ease-in-out;
//   display: inline-block;
//   position: relative;

//   &:hover {
//     background-color: #6A94FF; /* 호버 시 배경색 */
//   }
// `;

// // 드롭다운 스타일 정의
// const DropdownContainer = styled.div<{ isOpen: boolean }>`
//   position: absolute;
//   top: 43%;
//   left: 36%;
//   width: 130px;
//   background-color: #f8f9fa; /* 흰색 배경과 구별되는 밝은 회색 */
//   border-radius: 8px;
//   box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
//   z-index: 100;
//   display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
//   margin-top: 10px;
//   padding: 8px 0;
// `;

// const DropdownItem = styled.div`
//   padding: 12px;
//   font-size: 14px;
//   color: #333;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in-out, border-left 0.2s ease-in-out;
//   display: flex;
//   align-items: center;
//   border-left: 4px solid transparent; /* 기본은 투명 */

//   &:hover {
//     background-color: #e9ecef; /* 호버 시 배경색 */
//     border-left: 4px solid #007bff; /* 호버 시 왼쪽에만 파란색 보더 */
//   }

//   &:last-child {
//     border-bottom: none;
//   }
// `;

// // 산업군 리스트 스타일 유지
// const IndustryContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
// `;

// const IndustryItem = styled.div`
//   text-align: center;
//   margin: 0 10px;
// `;

// const IndustryImage = styled.img`
//   width: 75px;
//   height: 75px;
//   border-radius: 50%;
//   box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
//   object-fit: cover;
// `;

// const IndustryName = styled.p`
//   margin-top: 10px;
//   font-weight: bold;
//   font-size: 13px;
//   color: #333;
// `;

// // 산업군 리스트 컴포넌트
// const IndustryListContainer: React.FC<{ userIndustries: { industryId: number, industryName: string, preRank: number }[] }> = ({ userIndustries }) => {
//   const findIndustryImage = (industryId: number) => {
//     const found = words.find(word => word.industryId === industryId);
//     return found ? found.img : ''; // 이미지가 있으면 반환, 없으면 빈 문자열
//   };

//   // preRank 순으로 정렬
//   const sortedIndustries = [...userIndustries].sort((a, b) => a.preRank - b.preRank);

//   return (
//     <IndustryContainer>
//       {sortedIndustries.map(industry => (
//         <IndustryItem key={industry.industryId}>
//           <IndustryImage src={findIndustryImage(industry.industryId)} alt={industry.industryName} />
//           <IndustryName>{industry.industryName}</IndustryName>
//         </IndustryItem>
//       ))}
//     </IndustryContainer>
//   );
// };

// // UserProfile 컴포넌트
// const UserProfile: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch: AppDispatch = useDispatch();
//   const { userInfo } = useSelector((state: RootState) => state.mypage);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

//   // 드롭다운 Ref 설정
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // 바깥쪽 클릭 시 드롭다운 닫기
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     dispatch(fetchUserProfileThunk())
//       .unwrap()
//       .then(res => console.log("프로필 데이터 불러옴:", res))
//       .catch(error => console.error("프로필 불러오기 오류:", error));
//   }, [dispatch]);

//   const handleEdit1 = () => navigate('/edit1');
//   const handleEdit2 = () => navigate('/edit2');
//   const handlePassword = () => navigate('/password');

//   if (!userInfo || !userInfo.data) {
//     return <p>Loading...</p>;
//   }

//   const selectedImage = {
//     A: profile1,
//     B: profile2,
//     C: profile3,
//   }[userInfo.data.profileImg] || profile1;

//   return (
//     <UserInfoContainer>
//       <UserImage src={selectedImage} alt="User profile" />
//       <UserInfoContent>
//         <UserName>{userInfo.data.name || "이름 없음"}</UserName>
//         <EditButton onClick={toggleDropdown}>수정하기</EditButton>
//         <DropdownContainer isOpen={isDropdownOpen} ref={dropdownRef}>
//           <DropdownItem onClick={handleEdit1}>회원정보 수정</DropdownItem>
//           <DropdownItem onClick={handleEdit2}>산업군 수정</DropdownItem>
//           <DropdownItem onClick={handlePassword}>비밀번호 수정</DropdownItem>
//         </DropdownContainer>
//         <IndustryListContainer userIndustries={userInfo.data.userIndustry} />
//       </UserInfoContent>
//     </UserInfoContainer>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
// import { AppDispatch } from '@store/index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { fetchUserProfileThunk } from '@store/myPage/profileSlice';
import { RootState } from '@store/index';
import profile1 from '@assets/auth/profile1.jpg';
import profile2 from '@assets/auth/profile2.jpg';
import profile3 from '@assets/auth/profile3.jpg';
import { words } from '@components/voca/VocaList';

const UserInfoContainer = styled.div`
  position: relative;
  width: 280px;
  text-align: center;
  margin: 8% 5%;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 0.5px solid grey;
  background-color: #fff;
  position: absolute;
  top: -75px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  background-color: #007bff;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease-in-out;
  display: inline-block;
  position: relative;

  &:hover {
    background-color: #6a94ff;
  }
`;

const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 43%;
  left: 36%;
  width: 130px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  margin-top: 10px;
  padding: 8px 0;
`;

const DropdownItem = styled.div`
  padding: 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, border-left 0.2s ease-in-out;
  display: flex;
  align-items: center;
  border-left: 4px solid transparent;

  &:hover {
    background-color: #e9ecef;
    border-left: 4px solid #007bff;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const IndustryContainer = styled.div<{ $isEmpty: boolean }>`
  display: ${({ $isEmpty }) => ($isEmpty ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const IndustryItem = styled.div`
  text-align: center;
  margin: 0 10px;
`;

const IndustryImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  object-fit: cover;
`;

const IndustryName = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 13px;
  color: #333;
`;

const IndustryListContainer: React.FC<{
  userIndustries: { industryId: number; industryName: string; preRank: number }[];
}> = ({ userIndustries }) => {
  const isEmpty = userIndustries.length === 0;
  const findIndustryImage = (industryId: number) => {
    const found = words.find((word) => word.industryId === industryId);
    return found ? found.img : '';
  };

  const sortedIndustries = [...userIndustries].sort((a, b) => a.preRank - b.preRank);

  return (
    <IndustryContainer $isEmpty={isEmpty}>
      {sortedIndustries.map((industry) => (
        <IndustryItem key={industry.industryId}>
          <IndustryImage src={findIndustryImage(industry.industryId)} alt={industry.industryName} />
          <IndustryName>{industry.industryName}</IndustryName>
        </IndustryItem>
      ))}
    </IndustryContainer>
  );
};

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  // const dispatch: AppDispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.mypage);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (!userInfo.data.name) {
  //     dispatch(fetchUserProfileThunk())
  //       .unwrap()
  //       .then((res) => console.log('프로필 데이터 불러옴:', res))
  //       .catch((error) => console.error('프로필 불러오기 오류:', error));
  //   }
  // }, [dispatch]);

  const handleEdit1 = () => navigate('/edit1');
  const handleEdit2 = () => navigate('/edit2', { state: { selectedIndustries: userInfo.data.userIndustry } });
  const handlePassword = () => navigate('/password');

  if (!userInfo || !userInfo.data) {
    return <p>Loading...</p>;
  }

  const selectedImage =
    {
      A: profile1,
      B: profile2,
      C: profile3,
    }[userInfo.data.profileImg] || profile1;

  return (
    <UserInfoContainer>
      <UserImage src={selectedImage} alt="User profile" />
      <UserInfoContent>
        <UserName>{userInfo.data.name || '이름 없음'}</UserName>
        <EditButton onClick={toggleDropdown}>수정하기</EditButton>
        <DropdownContainer $isOpen={isDropdownOpen} ref={dropdownRef}>
          <DropdownItem onClick={handleEdit1}>회원정보 수정</DropdownItem>
          <DropdownItem onClick={handleEdit2}>산업군 수정</DropdownItem>
          <DropdownItem onClick={handlePassword}>비밀번호 수정</DropdownItem>
        </DropdownContainer>
        <IndustryListContainer userIndustries={userInfo.data.userIndustry} />
      </UserInfoContent>
    </UserInfoContainer>
  );
};

export default UserProfile;
