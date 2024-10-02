import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserViewNewsThunk } from "@store/myPage/userNewsSlice";
import { RootState, AppDispatch } from "@store/index";
import defaultImage from "@assets/auth/defaultProfile.jpg";
import arrow from "@assets/common/arrow.png";

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0.5;
    transform: translateY(5px); /* 아래에서 위로 슬라이드 인 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const NewsListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  position: relative;
  max-width: 850px;
  overflow: hidden;
`;

const NewsList = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  padding: 10px;
  width: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NewsItem = styled.div<{ animate: boolean }>`
  cursor: pointer;
  position: relative;
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  width: 120px;
  height: 180px;
  flex-shrink: 0;
  overflow: hidden;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${fadeIn} 0.5s ease-out; /* 애니메이션 적용 */
    `}
`;

const NewsImage = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 3px;
`;

const NewsContent = styled.div`
  color: white;
  z-index: 1;
`;

const NewsTitle = styled.h3`
  font-size: 11px;
  margin-bottom: 4px;
  line-height: 1.2;
  height: 27px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

const NewsDate = styled.p`
  font-size: 10px;
  color: white;
  margin-top: -5px;
`;

const SectionName = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
  color: #93939;
  font-weight: bold;
  position: absolute;
  top: 41.5%;
  left: 39.5%;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const LeftArrow = styled(ArrowButton)`
  left: 19%;
  top: 57%;
  img {
    width: 5%;
    height: 10%;
    transform: scaleX(-1);
  }
`;

const RightArrow = styled(ArrowButton)`
  left: 86%;
  top: 57%;
  img {
    width: 13%;
    height: 13%;
  }
`;

const ViewNews: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { recentNewsList } = useSelector((state: RootState) => state.userNews);
  const [page, setPage] = useState<number>(1); // 현재 페이지 상태
  const [animatedItems, setAnimatedItems] = useState<{
    [newsId: number]: boolean;
  }>({}); // 애니메이션 상태 저장
  const newsListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 첫 번째 페이지 뉴스 불러오기
    dispatch(fetchUserViewNewsThunk(1));
  }, [dispatch]);

  // 중복된 newsId 제거
  const uniqueRecentNewsList = recentNewsList.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.newsId === item.newsId)
  );

  const handleMove = (newsId: number) => {
    navigate(`/news/${newsId}`);
  };

  const loadMoreNews = () => {
    const nextPage = page + 1;
    dispatch(fetchUserViewNewsThunk(nextPage));
    setPage(nextPage);
  };

  useEffect(() => {
    if (page > 1) {
      // 새로운 페이지 로딩 시, 새로 추가된 아이템에만 애니메이션 적용
      const newItems = recentNewsList.slice((page - 1) * 10); // 각 페이지 10개 아이템 로드 가정
      const newAnimatedItems = newItems.reduce((acc, item) => {
        acc[item.newsId] = true;
        return acc;
      }, {} as { [newsId: number]: boolean });

      setAnimatedItems((prevState) => ({
        ...prevState,
        ...newAnimatedItems,
      }));
    }
  }, [page, recentNewsList]);

  const scrollLeft = () => {
    if (newsListRef.current) {
      newsListRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (newsListRef.current) {
      newsListRef.current.scrollLeft += 200;
      if (
        newsListRef.current.scrollLeft + newsListRef.current.clientWidth >=
        newsListRef.current.scrollWidth
      ) {
        loadMoreNews();
      }
    }
  };

  return (
    <Container>
      <SectionName>최근에 본 뉴스</SectionName>
      <LeftArrow onClick={scrollLeft}>
        <img src={arrow} alt="왼쪽 화살표" />
      </LeftArrow>
      <NewsListContainer>
        <NewsList ref={newsListRef}>
          {uniqueRecentNewsList.map((item) => (
            <NewsItem
              key={item.newsId}
              onClick={() => handleMove(item.newsId)}
              animate={!!animatedItems[item.newsId]} // 개별 아이템 애니메이션 관리
            >
              <NewsImage
                src={item.photoUrlList[0] || defaultImage}
                alt="뉴스 이미지"
              />
              <Overlay>
                <NewsContent>
                  <NewsTitle>{item.newsTitle}</NewsTitle>
                  <NewsDate>{item.newsPublishedAt.slice(0, 10)}</NewsDate>
                </NewsContent>
              </Overlay>
            </NewsItem>
          ))}
        </NewsList>
      </NewsListContainer>
      <RightArrow onClick={scrollRight}>
        <img src={arrow} alt="오른쪽 화살표" />
      </RightArrow>
    </Container>
  );
};

export default ViewNews;
