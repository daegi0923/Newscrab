// ArticleScrapLike.tsx
import React from "react";
import styled from "styled-components";
import { FaThumbsUp } from "react-icons/fa";

// 따봉 버튼 스타일
const ThumbsUpButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffbe98;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 20px;
  font-size: 50px;
  color: white;

  &:hover {
    background-color: #ff8f4d;
  }
`;

interface ArticleScrapLikeProps {
  onLike: () => void;
}

const ArticleScrapLike: React.FC<ArticleScrapLikeProps> = ({ onLike }) => {
  return (
    <ThumbsUpButton onClick={onLike}>
      <FaThumbsUp />
    </ThumbsUpButton>
  );
};

export default ArticleScrapLike;

// import React, { useState } from "react";
// import styled, { keyframes } from "styled-components";
// import { FaThumbsUp } from "react-icons/fa";

// // 따봉 애니메이션 키프레임
// const pop = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.3);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;

// // 버튼 스타일
// const ThumbsUpButton = styled.button<{ liked: boolean }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: ${(props) => (props.liked ? "#4285F4" : "transparent")};
//   border: none;
//   color: ${(props) => (props.liked ? "white" : "black")};
//   font-size: 30px;
//   cursor: pointer;
//   outline: none;
//   position: relative;

//   &:hover {
//     background-color: ${(props) => (props.liked ? "#357ae8" : "#e0e0e0")};
//   }

//   svg {
//     animation: ${(props) => (props.liked ? pop : "none")} 0.3s ease;
//   }
// `;

// // 이펙트 스타일
// const LikeEffect = styled.div<{ show: boolean }>`
//   position: absolute;
//   top: -20px;
//   left: 50%;
//   transform: translateX(-50%);
//   display: ${(props) => (props.show ? "block" : "none")};
//   background-color: #ffcc00;
//   padding: 5px;
//   border-radius: 10px;
//   font-size: 12px;
//   color: white;
//   animation: ${pop} 0.5s ease;
// `;

// const LikeCount = styled.span`
//   font-size: 18px;
//   margin-left: 10px;
// `;

// const ArticleScrapLike = () => {
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(210000); // 좋아요 개수
//   const [showEffect, setShowEffect] = useState(false);

//   const handleLikeClick = () => {
//     setLiked(!liked);
//     setLikeCount(liked ? likeCount - 1 : likeCount + 1);

//     // 이펙트 잠깐 보여줬다가 사라지게 하기
//     setShowEffect(true);
//     setTimeout(() => {
//       setShowEffect(false);
//     }, 500);
//   };

//   return (
//     <div>
//       <ThumbsUpButton liked={liked} onClick={handleLikeClick}>
//         <FaThumbsUp />
//         <LikeCount>{Math.floor(likeCount / 10000)}만</LikeCount>
//         <LikeEffect show={showEffect}>+1</LikeEffect>
//       </ThumbsUpButton>
//     </div>
//   );
// };

// export default ArticleScrapLike;
