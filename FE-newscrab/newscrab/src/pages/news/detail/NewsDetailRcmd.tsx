import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
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
  cursor: pointer; /* 클릭 가능하게 커서 스타일 추가 */
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

const PublishedAt = styled.p`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 12px;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

interface NewsDetailRcmdProps {
  newsId: number; // props로 newsId를 전달받도록 인터페이스 정의
}

const NewsDetailRcmd: React.FC<NewsDetailRcmdProps> = ({ newsId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [relatedNews, setRelatedNews] = useState<
    {
      imageUrl: string;
      title: string;
      newsPublishedAt: string;
      newsId: number;
    }[] // newsId 추가
  >([]);

  const navigate = useNavigate(); // useNavigate 훅 호출

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleNewsClick = (id: number) => {
    navigate(`/news/${id}`); // 클릭 시 해당 뉴스 페이지로 이동
  };

  useEffect(() => {
    // 뉴스 API에서 관련 뉴스를 가져오는 로직
    const fetchRelatedNews = async () => {
      const newsDetail = await getNewsDetail(newsId); // 동적으로 전달받은 newsId 사용
      const relatedItems = [
        newsDetail.relatedNews1,
        newsDetail.relatedNews2,
        newsDetail.relatedNews3,
      ].map((relatedNewsItem) => ({
        imageUrl:
          relatedNewsItem.photoUrlList?.[0] || "https://picsum.photos/300/150", // 이미지가 없을 경우 기본 이미지 설정
        title: relatedNewsItem.newsTitle, // 뉴스 제목
        newsPublishedAt: relatedNewsItem.newsPublishedAt, // 생성일
        newsId: relatedNewsItem.newsId, // 뉴스 ID 추가
      }));

      setRelatedNews(relatedItems);
    };

    fetchRelatedNews();
  }, [newsId]); // newsId가 변경될 때마다 관련 뉴스 다시 가져옴

  return (
    <>
      <PopupButton onClick={togglePopup}>+</PopupButton>
      <PopupContainer $show={showPopup}>
        <ImageWrapper>
          {relatedNews.map((item, index) => (
            <NewsContainer
              key={index}
              onClick={() => handleNewsClick(item.newsId)}
            >
              {" "}
              {/* 클릭 이벤트 추가 */}
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
