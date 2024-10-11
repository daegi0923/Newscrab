import React, { useState, useEffect } from "react";
import styled from "styled-components";
import confetti from "canvas-confetti"; // canvas-confetti 추가
import likeIcon from "@assets/like.png";
import unlikeIcon from "@assets/unlike.png";
import { getLike, postLike, deleteLike } from "@apis/news/LikeApi";

// LikeButtonContainer 스타일은 기존과 동일
const LikeButtonContainer = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 10px;
`;

const LikeIcon = styled.img<{ $isAnimating: boolean }>`
  width: 25px;
  height: 22px;
  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.$isAnimating &&
    `
    transform: scale(1.5);
    animation: pop 0.5s ease-in-out;
  `}

  @keyframes pop {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

type LikeButtonProps = {
  newsId: number;
};

const LikeButton: React.FC<LikeButtonProps> = ({ newsId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태 추가

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const likeStatus = await getLike(newsId);
        setIsLiked(likeStatus);
      } catch (error) {
        console.error("좋아요 상태 조회 중 오류 발생:", error);
      }
    };
    fetchLikeStatus();
  }, [newsId]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100, // 컨페티 개수
      spread: 70, // 컨페티 퍼짐 정도
      origin: { x: 0.5, y: 0.3 }, // 컨페티 시작 위치 (버튼 중앙)
    });
  };

  const toggleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 이벤트 전파를 막음

    try {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500); // 0.5초 후 애니메이션 종료

      if (isLiked) {
        await deleteLike(newsId);
      } else {
        await postLike(newsId);
        triggerConfetti(); // 좋아요할 때만 컨페티 터뜨리기
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  return (
    <LikeButtonContainer onClick={toggleLike}>
      <LikeIcon
        src={isLiked ? likeIcon : unlikeIcon}
        alt="좋아요 아이콘"
        $isAnimating={isAnimating} // 애니메이션 상태 전달
      />
    </LikeButtonContainer>
  );
};

export default LikeButton;
