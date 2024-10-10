import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaThumbsUp } from "react-icons/fa";
import { postLike } from "@apis/article/LikeApi"; // postLike, deleteLike API import

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
  background-color: ${(props) =>
    props.liked ? "transparent" : "white"}; /* 눌렀을 때 배경 없음 */
  cursor: ${(props) => (props.liked ? "default" : "pointer")};
  padding: 15px;
  font-size: 40px;
  color: white;
  overflow: hidden;
  outline: none; /* 기본 outline 제거 */
  border: none; /* 추가적인 테두리 제거 */

  &:hover {
    background-color: ${(props) =>
      props.liked
        ? "transparent"
        : "#f0f0f0"}; /* hover 시 흰색일 때 연한 회색 */
  }

  svg {
    color: ${(props) =>
      props.liked ? "red" : "black"}; /* 아이콘 색상, liked일 때 빨간색 */
    animation: ${(props) => (props.liked ? pop : "none")} 0.3s ease;
  }
`;

// 좋아요 카운트를 버튼 오른쪽에 배치할 컨테이너
const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* 버튼과 카운트 사이의 간격 */
  margin-top: 20px;
`;

// 좋아요 카운트 스타일
const LikeCount = styled.span<{ liked: boolean }>`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) =>
    props.liked ? "red" : "black"}; /* liked 상태에 따라 색상 변경 */
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

interface ArticleScrapLikeProps {
  articleId: number; // 좋아요할 기사 ID를 전달
  initialLikeCount: number; // 초기 좋아요 수
}

const ArticleScrapLike: React.FC<ArticleScrapLikeProps> = ({
  articleId,
  initialLikeCount,
}) => {
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [likeCount, setLikeCount] = useState(initialLikeCount); // 좋아요 카운트
  const [confetti, setConfetti] = useState<
    { x: number; y: number; color: string; shape: string }[]
  >([]);

  // 따봉 버튼 클릭 핸들러
  const handleLikeClick = async () => {
    // 이미 좋아요가 눌린 상태라면 아무 동작도 하지 않음
    if (liked) {
      return;
    }

    try {
      // 좋아요 요청(postLike 요청)
      await postLike(articleId);
      setLikeCount(likeCount + 1); // 좋아요 수 증가
      setLiked(true); // 좋아요 상태 활성화
      console.log(`Article ${articleId} 좋아요 요청 성공`);

      // 콘페티 효과 추가
      const newConfetti = Array.from({ length: 20 }).map(() => {
        const angle = Math.random() * 360;
        const distance = Math.random() * 120 + 50;
        const x = Math.cos((angle * Math.PI) / 180) * distance;
        const y = Math.sin((angle * Math.PI) / 180) * distance;
        const color =
          confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const shape =
          confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
        return { x, y, color, shape };
      });

      setConfetti(newConfetti);

      // 일정 시간 후 콘페티 제거
      setTimeout(() => {
        setConfetti([]);
      }, 1000);
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
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
      {/* 좋아요 카운트를 스타일드 컴포넌트로 적용 */}
      <LikeCount liked={liked}>{likeCount}</LikeCount>
    </LikeContainer>
  );
};

export default ArticleScrapLike;
