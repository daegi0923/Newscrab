// import React from "react";
// import { useNavigate } from "react-router-dom"; // useNavigate 훅 import
// import styled from "styled-components";
// import Hot from "@assets/hot.png";
// import All from "@assets/all.png";

// // 탭 스타일링
// const TabContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 10px 100px;
//   font-size: 16px;
//   font-weight: 500;
//   color: #333;
// `;

// const TabItem = styled.h1`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   padding: 0 15px;
//   color: #666;
//   margin: 0px;

//   &:hover {
//     color: #ffbe98; /* 마우스 오버 시 색상 변화 */
//   }
// `;

// // All 아이콘 스타일링
// const AllIcon = styled.img`
//   width: 30px; /* All 아이콘 크기 */
//   height: 30px;
//   margin-right: 8px; /* 아이콘과 텍스트 사이 간격 */
// `;

// // Hot 아이콘 스타일링
// const HotIcon = styled.img`
//   width: 23.34px; /* Hot 아이콘 크기 */
//   height: 30px;
//   margin-right: 8px; /* 아이콘과 텍스트 사이 간격 */
// `;

// const Tab: React.FC = () => {
//   const navigate = useNavigate(); // useNavigate 훅 사용

//   return (
//     <div>
//       <TabContainer>
//         <TabItem onClick={() => navigate("/rcmdNews")}>🔍 추천 뉴스 ⏵</TabItem>

//         {/* 최신 뉴스 - All 아이콘 추가 */}
//         <TabItem onClick={() => navigate("/news")}>
//           <AllIcon src={All} alt="All" />
//           최신 뉴스 ⏵
//         </TabItem>

//         {/* 인기 뉴스 - Hot 아이콘 추가 */}
//         <TabItem>
//           <HotIcon src={Hot} alt="Hot" />
//           인기 뉴스
//         </TabItem>
//       </TabContainer>
//     </div>
//   );
// };

// export default Tab;
