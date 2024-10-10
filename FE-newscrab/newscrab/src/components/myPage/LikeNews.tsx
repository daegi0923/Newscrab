import React, { useEffect, useRef} from "react";
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
  justify-content: center; /* 세로 중앙 정렬 */
  padding: 10px;
  width: 100%;  /* Container가 화면을 벗어나지 않도록 함 */
  height: 41%;
  box-sizing: border-box;
  overflow: hidden;
`;

const NewsListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  height: 100%;
  max-width: 1000px;
  position: relative;
  box-sizing: border-box;
  margin-top: 4%;
`;

const NewsListContainer = styled.div`
  // margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: center;  /* 내용물이 없을 때 중앙 정렬 */
  width: 97%;
  overflow: hidden;
`;

const NewsList = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px;
  width: 97%;
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
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
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
  font-size: 15px;
  color: #93939;
  font-weight: bold;
  position: absolute;
  top: 70%;
  left: 37%;
`;


const LeftArrow = styled.button`
  position: absolute;
  left: -20px; /* 화살표를 스크롤 바깥으로 이동 */
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 25px;
    height: 25px;
    transform: scaleX(-1);
  }
`;

const RightArrow = styled.button`
  position: absolute;
  right: -20px; /* 화살표를 스크롤 바깥으로 이동 */
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 25px;
    height: 25px;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Message = styled.div`
  font-size: 16px;
  color: gray;
  font-family: "Paper7";
  text-align: center;
`;

const LikeNews: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { likedNewsList } = useSelector((state: RootState) => state.userNews);

  // const [page, setPage] = useState<number>(1);
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

  const handleMove = (newsId: number) => {
    navigate(`/news/${newsId}`);
  };

  const scrollLeft = () => {
    if (newsListRef.current) {
      newsListRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (newsListRef.current) {
      newsListRef.current.scrollLeft += 200;
    }
  };

  return (
    <Container>
      <SectionName>찜한 뉴스</SectionName>
      <NewsListWrapper>
        <LeftArrow onClick={scrollLeft}>
          <img src={arrow} alt="왼쪽 화살표" />
        </LeftArrow>

        <MessageWrapper>
          {uniqueLikedNewsList.length === 0 ? (
            <Message>아직 찜한 뉴스가 없습니다. 😪</Message>
          ) : (
            <NewsListContainer>
              <NewsList ref={newsListRef}>
                {uniqueLikedNewsList.map((item) => (
                  <NewsItem
                    key={item.newsId}
                    onClick={() => handleMove(item.newsId)}
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
          )}
        </MessageWrapper>

        <RightArrow onClick={scrollRight}>
          <img src={arrow} alt="오른쪽 화살표" />
        </RightArrow>
      </NewsListWrapper>
    </Container>
  );
};

export default LikeNews;
