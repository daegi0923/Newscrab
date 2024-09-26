import React, { useState, useEffect } from "react";
import styled from "styled-components";
import likeIcon from "@assets/like.png";
import unlikeIcon from "@assets/unlike.png";
import { getLike, postLike, deleteLike } from "@apis/news/LikeApi";

const LikeButtonContainer = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 10px;
`;

const LikeIcon = styled.img`
  width: 25px;
  height: 22px;
`;

type LikeButtonProps = {
  newsId: number;
};

const LikeButton: React.FC<LikeButtonProps> = ({ newsId }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // 처음 로딩 시 해당 뉴스의 찜 여부를 확인
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

  const toggleLike = async () => {
    try {
      if (isLiked) {
        await deleteLike(newsId);
      } else {
        await postLike(newsId);
      }
      setIsLiked(!isLiked); // 상태 토글
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  return (
    <LikeButtonContainer onClick={toggleLike}>
      <LikeIcon src={isLiked ? likeIcon : unlikeIcon} alt="좋아요 아이콘" />
    </LikeButtonContainer>
  );
};

export default LikeButton;
