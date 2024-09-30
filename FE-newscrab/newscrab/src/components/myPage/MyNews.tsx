import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserViewNewsThunk } from '@store/myPage/userNewsSlice';
import { RootState, AppDispatch } from '@store/index';
import defaultImage from "@assets/auth/defaultProfile.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const NewsList = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px;
  width: 100%;
`;

const NewsItem = styled.div`
  cursor: pointer;
  position: relative;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 120px;
  height: 180x;
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
  margin-bottom: 10px;
  color: #888;
  position: left:
  font-weight: bold;
`;

const ViewNews: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  
  const { newsList, loading, error } = useSelector((state: RootState) => state.userNews); 

  // 중복된 newsId 제거
  const uniqueNewsList = newsList.filter(
    (item, index, self) => index === self.findIndex((t) => t.newsId === item.newsId)
  );

  useEffect(() => {
    dispatch(fetchUserViewNewsThunk(1)); // 첫 번째 페이지 데이터 로드
  }, [dispatch]);

  console.log(newsList)
  
  const handleMove = (newsId: number) => {
    navigate(`/news/${newsId}`)
  };

  return (
    <Container>
      <SectionName>
        최근에 본 뉴스
      </SectionName>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {uniqueNewsList.length > 0 ? (
        <NewsList>
          {uniqueNewsList.reverse().map((item) => (
            <NewsItem key={item.newsId} onClick={() => handleMove(item.newsId)}>
              <NewsImage src={item.photoUrlList[0] || defaultImage} alt="뉴스 이미지" />
              <Overlay>
                <NewsContent>
                  <NewsTitle>{item.newsTitle}</NewsTitle>
                  <NewsDate>{item.newsPublishedAt.slice(0, 10)}</NewsDate>
                </NewsContent>
              </Overlay>
            </NewsItem>
          ))}
        </NewsList>
      ) : (
        <p>최근 본 뉴스가 없습니다.</p>
      )}
    </Container>
  );
}

export default ViewNews;
