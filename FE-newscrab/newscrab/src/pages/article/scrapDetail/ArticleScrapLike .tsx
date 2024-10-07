import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaThumbsUp } from "react-icons/fa";

// 콘페티 애니메이션
const confettiFall = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--x), var(--y)) rotate(720deg);
    opacity: 0;
  }
`;

// 따봉 버튼 애니메이션
const pop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

// 따봉 버튼 스타일
const ThumbsUpButton = styled.button<{ liked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.liked ? "#ff8f4d" : "#ffbe98")};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 20px;
  font-size: 50px;
  color: white;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => (props.liked ? "#ff6e2f" : "#ffa566")};
  }

  svg {
    animation: ${(props) => (props.liked ? pop : "none")} 0.3s ease;
  }
`;

// 다양한 색상과 모양 리스트
const confettiColors = [
  "#ffcc00",
  "#ff6f61",
  "#66ccff",
  "#99ff99",
  "#ff66cc",
  "#cc99ff",
  "#ff6666",
];
const confettiShapes = ["circle", "rect"];

// 콘페티 스타일
const Confetti = styled.div<{
  x: number;
  y: number;
  color: string;
  shape: string;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => (props.shape === "circle" ? "8px" : "6px")};
  height: ${(props) => (props.shape === "circle" ? "8px" : "12px")};
  background-color: ${(props) => props.color};
  border-radius: ${(props) => (props.shape === "circle" ? "50%" : "0")};
  transform-origin: center;
  animation: ${confettiFall} 1s ease-out forwards;
  --x: ${(props) => props.x}px;
  --y: ${(props) => props.y}px;
`;

// const LikeCount = styled.span`
//   font-size: 18px;
//   margin-left: 10px;
// `;

interface ArticleScrapLikeProps {
  onLike: () => void;
}

const ArticleScrapLike: React.FC<ArticleScrapLikeProps> = ({ onLike }) => {
  const [liked, setLiked] = useState(false);
  const [confetti, setConfetti] = useState<
    { x: number; y: number; color: string; shape: string }[]
  >([]);

  // const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setLiked(!liked);
  const handleLikeClick = () => {
    setLiked(!liked);

    // 콘페티 효과 추가
    const newConfetti = Array.from({ length: 20 }).map(() => {
      const angle = Math.random() * 360; // 360도 각도
      const distance = Math.random() * 120 + 50; // 퍼지는 거리
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;
      const color =
        confettiColors[Math.floor(Math.random() * confettiColors.length)]; // 랜덤 색상
      const shape =
        confettiShapes[Math.floor(Math.random() * confettiShapes.length)]; // 랜덤 모양
      return { x, y, color, shape };
    });

    setConfetti(newConfetti);

    // 일정 시간 후 콘페티 제거
    setTimeout(() => {
      setConfetti([]);
    }, 1000);

    onLike();
  };

  return (
    <div>
      <ThumbsUpButton liked={liked} onClick={handleLikeClick}>
        <FaThumbsUp />
        {confetti.map((confettiPiece, index) => (
          <Confetti
            key={index}
            x={confettiPiece.x}
            y={confettiPiece.y}
            color={confettiPiece.color}
            shape={confettiPiece.shape}
          />
        ))}
      </ThumbsUpButton>
    </div>
  );
};

export default ArticleScrapLike;
