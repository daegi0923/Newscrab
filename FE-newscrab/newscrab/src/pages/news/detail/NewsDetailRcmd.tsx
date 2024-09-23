import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getMockNews } from "@apis/newsApi"; // API 함수 가져오기

const formatDate = (dateString: string) => {
  return dateString.replace("T", " ");
};

// 스타일 정의
const PopupContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 50px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: ${(props) =>
    props.$show ? 98 : -1}; /* 팝업이 보이지 않을 때 z-index를 낮춤 */
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transform: ${(props) => (props.$show ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const PopupButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: green;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 99;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
`;

const NewsContainer = styled.div`
  position: relative;
  width: 300px;
  height: 150px;
`;

const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const NewsTitle = styled.p`
  position: absolute;
  bottom: 30px; /* 이미지 안에서 제목을 표시할 위치 */
  left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin: 0;
  white-space: nowrap; /* 텍스트를 한 줄로 표시 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 넘칠 경우 ...으로 표시 */
  max-width: 280px; /* 제목이 너무 길 경우 줄여줄 최대 너비 설정 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 글자가 잘 보이도록 그림자 추가 */
`;

const CreatedAt = styled.p`
  position: absolute;
  bottom: 10px; /* 이미지 안에서 날짜를 표시할 위치 */
  left: 10px;
  font-size: 12px;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 글자가 잘 보이도록 그림자 추가 */
`;

const PopupImages: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [news, setNews] = useState<
    { imageUrl: string; title: string; createdAt: string }[]
  >([]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    // 뉴스 API에서 이미지를 3개 가져오는 로직
    const fetchImages = async () => {
      const mockData = await getMockNews(1); // 뉴스 API 호출
      const newsItems = mockData.news.slice(0, 3).map((newsItem) => ({
        imageUrl: newsItem.photoUrlList[0],
        title: newsItem.newsTitle,
        createdAt: newsItem.createdAt, // 날짜 추가
      }));
      setNews(newsItems);
    };

    fetchImages();
  }, []);

  return (
    <>
      <PopupButton onClick={togglePopup}>+</PopupButton>
      <PopupContainer $show={showPopup}>
        <ImageWrapper>
          {news.map((item, index) => (
            <NewsContainer key={index}>
              <NewsImage src={item.imageUrl} alt={`News image ${index}`} />
              <NewsTitle>{item.title}</NewsTitle>
              <CreatedAt>{formatDate(item.createdAt)}</CreatedAt>
            </NewsContainer>
          ))}
        </ImageWrapper>
      </PopupContainer>
    </>
  );
};

export default PopupImages;
