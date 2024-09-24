import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getNewsDetail } from "@apis/news/newsDetailApi"; // API 함수 가져오기

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
  bottom: 30px;
  left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const CreatedAt = styled.p`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 12px;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const PopupImages: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [relatedNews, setRelatedNews] = useState<
    { imageUrl: string; title: string; createdAt: string }[]
  >([]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    // Lorem Picsum에서 랜덤 이미지를 가져오는 함수
    const getRandomImageUrl = () => {
      return "https://picsum.photos/300/150"; // 300x150 사이즈의 랜덤 이미지
    };

    // 뉴스 API에서 관련 뉴스를 가져오는 로직
    const fetchRelatedNews = async () => {
      const mockData = await getNewsDetail(1); // 뉴스 API 호출
      const relatedItems = [
        mockData.relatedNews1,
        mockData.relatedNews2,
        mockData.relatedNews3,
      ].map((relatedNewsItem) => ({
        imageUrl: relatedNewsItem.photoUrlList?.[0] || getRandomImageUrl(), // 이미지가 없을 경우 Lorem Picsum에서 랜덤 이미지 가져오기
        title: relatedNewsItem.newsTitle, // 뉴스 제목
        createdAt: relatedNewsItem.createdAt, // 생성일
      }));

      setRelatedNews(relatedItems);
    };

    fetchRelatedNews();
  }, []);

  return (
    <>
      <PopupButton onClick={togglePopup}>+</PopupButton>
      <PopupContainer $show={showPopup}>
        <ImageWrapper>
          {relatedNews.map((item, index) => (
            <NewsContainer key={index}>
              <NewsImage
                src={item.imageUrl}
                alt={`Related news image ${index}`}
              />
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
