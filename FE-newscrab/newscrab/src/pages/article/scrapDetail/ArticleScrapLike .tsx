import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaThumbsUp } from "react-icons/fa";
import { postLike, deleteLike } from "@apis/article/LikeApi"; // postLike, deleteLike API import

// 콘페티 애니메이션
const confettiFall = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--x), var(--y)) rotate(1080deg); /* 더 많은 회전 추가 */
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

// 부모 컨테이너에 relative 설정
const LikeContainer = styled.div`
  position: relative; /* 부모 컨테이너가 기준이 되도록 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

// 따봉 버튼 스타일
const ThumbsUpButton = styled.button<{ liked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.liked ? "transparent" : "white")};
  cursor: pointer;
  padding: 15px;
  font-size: 40px;
  color: white;
  outline: none;
  border: none;

  &:hover {
    background-color: ${(props) => (props.liked ? "transparent" : "#f0f0f0")};
  }

  svg {
    color: ${(props) => (props.liked ? "red" : "black")};
    animation: ${(props) => (props.liked ? pop : "none")} 0.3s ease;
  }
`;

// 좋아요 카운트 스타일
const LikeCount = styled.span<{ liked: boolean }>`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => (props.liked ? "red" : "black")};
  margin-left: 10px;
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
  top: 55%; /* 따봉 버튼 아래에서 시작 */
  left: 50%;
  width: ${(props) => (props.shape === "circle" ? "12px" : "10px")};
  height: ${(props) => (props.shape === "circle" ? "12px" : "18px")};
  background-color: ${(props) => props.color};
  border-radius: ${(props) => (props.shape === "circle" ? "50%" : "0")};
  transform-origin: center;
  animation: ${confettiFall} 1.5s ease-out forwards;
  --x: ${(props) => props.x}px;
  --y: ${(props) => props.y}px;
`;

interface ArticleScrapLikeProps {
  articleId: number;
  initialLikeCount: number;
}

const ArticleScrapLike: React.FC<ArticleScrapLikeProps> = ({
  articleId,
  initialLikeCount,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [confetti, setConfetti] = useState<
    { x: number; y: number; color: string; shape: string }[]
  >([]);

  // 따봉 버튼 클릭 핸들러
  const handleLikeClick = async () => {
    if (liked) {
      try {
        await deleteLike(articleId);
        setLikeCount(likeCount - 1);
        setLiked(false);
        console.log(`Article ${articleId} 좋아요 취소`);
      } catch (error) {
        console.error("좋아요 취소 실패:", error);
      }
    } else {
      try {
        await postLike(articleId);
        setLikeCount(likeCount + 1);
        setLiked(true);
        console.log(`Article ${articleId} 좋아요 요청 성공`);

        // 콘페티 효과 추가
        const newConfetti = Array.from({ length: 30 }).map(() => {
          const angle = Math.random() * 360;
          const distance = Math.random() * 200 + 100;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          const color =
            confettiColors[Math.floor(Math.random() * confettiColors.length)];
          const shape =
            confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
          return { x, y, color, shape };
        });

        setConfetti(newConfetti);

        setTimeout(() => {
          setConfetti([]);
        }, 1500);
      } catch (error) {
        console.error("좋아요 요청 실패:", error);
      }
    }
  };

  return (
    <LikeContainer>
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
      <LikeCount liked={liked}>{likeCount}</LikeCount>
    </LikeContainer>
  );
};

export default ArticleScrapLike;
