import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const formatDate = (dateString: string) => {
  return dateString.replace("T", " ");
};

const PopupContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  bottom: 29%;
  left: 17%;
  background-color: #fdfaf8;
  border-radius: 8px;
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: ${(props) => (props.$show ? 98 : -1)};
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transform: ${(props) => (props.$show ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const PopupButton = styled.button`
  position: fixed;
  bottom: 4%;
  left: 62%;
  background-color: #45a049;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -3px;
  right: -3px;
  background: none;
  border: none;
  color: #808080;
  font-size: 30px;
  cursor: pointer;
  z-index: 100;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const NewsContainer = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  cursor: pointer;
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
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 0px 5px 5px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  border-radius: 5px;
`;

const PublishedAt = styled.p`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 3px 8px;
  margin: 0;
  border-radius: 5px;
`;

interface NewsDetailRcmdProps {
  newsId: number;
  newsDetailItem: {
    relatedNews1?: any; // optional로 변경
    relatedNews2?: any; // optional로 변경
    relatedNews3?: any; // optional로 변경
  };
}

const NewsDetailRcmd: React.FC<NewsDetailRcmdProps> = ({ newsDetailItem }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleNewsClick = (id: number) => {
    setShowPopup(false);
    navigate(`/news/${id}`);
  };

  const relatedNews = [
    newsDetailItem.relatedNews1,
    newsDetailItem.relatedNews2,
    newsDetailItem.relatedNews3,
  ]
    .filter((relatedNewsItem) => relatedNewsItem !== null)
    .map((relatedNewsItem) => ({
      imageUrl:
        relatedNewsItem?.photoUrlList?.[0] || "https://picsum.photos/300/150",
      title: relatedNewsItem?.newsTitle || "제목 없음",
      newsPublishedAt: relatedNewsItem?.newsPublishedAt || "",
      newsId: relatedNewsItem?.newsId || 0,
    }));

  return (
    <>
      <PopupButton onClick={togglePopup}>
        연관
        <br />
        뉴스
      </PopupButton>
      <PopupContainer $show={showPopup}>
        <CloseButton onClick={togglePopup}>×</CloseButton>
        <ImageWrapper>
          {relatedNews.map((item, index) => (
            <NewsContainer
              key={index}
              onClick={() => handleNewsClick(item.newsId)}
            >
              <NewsImage
                src={item.imageUrl}
                alt={`Related news image ${index}`}
              />
              <NewsTitle>{item.title}</NewsTitle>
              <PublishedAt>{formatDate(item.newsPublishedAt)}</PublishedAt>
            </NewsContainer>
          ))}
        </ImageWrapper>
      </PopupContainer>
    </>
  );
};

export default NewsDetailRcmd;
