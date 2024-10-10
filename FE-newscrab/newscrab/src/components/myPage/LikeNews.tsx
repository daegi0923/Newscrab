import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLikeNewsThunk } from "@store/myPage/userNewsSlice";
import { RootState, AppDispatch } from "@store/index";
import defaultImage from "@assets/auth/defaultProfile.jpg";
import arrow from "@assets/common/arrow.png";

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
  margin: -3%;
  // border: 1px solid blue;
`;

const NewsList = styled.div`
  // border: 1px solid red;
  display: flex;
  gap: 20px;
  margin-top: 5%;
  overflow-x: scroll;
  padding: 10px;
  width: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NewsItem = styled.div`
  cursor: pointer;
  position: relative;
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  width: 120px;
  height: 180px;
  flex-shrink: 0;
  overflow: hidden;
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
`;

const NewsDate = styled.p`
  font-size: 10px;
  color: white;
  margin-top: -5px;
`;

const SectionName = styled.div`
  position: absolute;
  font-size: 15px;
  margin-top:1%;
  // margin-bottom: 10px;
  top: 70%;
  left: 39.5%;
  color: #93939;
  font-weight: bold;
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
  top: 85%;
  img {
    width: 5%;
    height: 10%;
    transform: scaleX(-1);
  }
`;

const RightArrow = styled(ArrowButton)`
  left: 86%;
  top: 85%;
  img {
    width: 13%;
    height: 13%;
  }
`;

const LikeNews: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { likedNewsList } = useSelector((state: RootState) => state.userNews);

  const [page, setPage] = useState<number>(1);
  const newsListRef = useRef<HTMLDivElement | null>(null);

  // 중복된 newsId 제거
  const uniqueLikedNewsList = likedNewsList.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.newsId === item.newsId)
  );

  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 데이터를 강제로 갱신
    dispatch(fetchUserLikeNewsThunk(1));
  }, [dispatch]);

  // 데이터가 업데이트될 때마다 렌더링
  useEffect(() => {
    console.log("찜한 뉴스:", likedNewsList);
  }, [likedNewsList]);

  const handleMove = (newsId: number) => {
    navigate(`/news/${newsId}`);
  };

  const loadMoreNews = () => {
    const nextPage = page + 1;
    dispatch(fetchUserLikeNewsThunk(nextPage));
    setPage(nextPage);
  };

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
      <SectionName>찜한 뉴스</SectionName>
      <LeftArrow onClick={scrollLeft}>
        <img src={arrow} alt="왼쪽 화살표" />
      </LeftArrow>
      <NewsListContainer>
        <NewsList ref={newsListRef}>
          {uniqueLikedNewsList.map((item) => (
            <NewsItem key={item.newsId} onClick={() => handleMove(item.newsId)}>
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

export default LikeNews;
