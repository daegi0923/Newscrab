import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ArticleContainer = styled.div`
  position: relative;
  border-radius: 10px;
  // margin-bottom: 10px;
  cursor: pointer;
  width: 32%;
  height: 80%;
  overflow: hidden;
  box-shadow: 3px 5px 4px rgba(0, 0, 0, 0.6);

  // 이미지 위에 얇은 막을 씌우기 위한 ::before 요소
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 배경을 어둡게 하는 반투명 효과 */
    z-index: 1; /* 이미지보다 위에 표시 */
  }
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: -16%;
  left: 0%;
  width: 96%;
  color: white;
  z-index: 2; /* 텍스트가 투명한 배경 위로 올라오도록 */
  padding: 10px;
  font-family: 'SUIT Variable', sans-serif;
`;

const Title = styled.h3`
  font-size: 0.8rem;
  margin: -1%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
`;

const DateText = styled.p`
  margin: 2% 0 5% 0%;
  font-size: 0.6rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.9);
`;

// RelatedNews 컴포넌트: 각 related_news_id를 받아 해당 뉴스를 렌더링하는 컴포넌트
interface RelatedNews {
  newsId: number;
  newsTitle: string;
  publishedAt: string;
  imageUrl: string;
}

interface ArticleRcmdProps {
  relatedNews: RelatedNews;
}

const ArticleRcmd: React.FC<ArticleRcmdProps> = ({ relatedNews }) => {
  const navigate = useNavigate();
  const handleNewsClick = () => {
    navigate(`/news/${relatedNews.newsId}`);
  };

  return (
    <ArticleContainer onClick={handleNewsClick}>
      <img
        src={relatedNews.imageUrl}
        alt="News Thumbnail"
        style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <TextContainer>
        <Title>{relatedNews.newsTitle}</Title>
        <DateText>{new Date(relatedNews.publishedAt).toLocaleDateString()}</DateText>
      </TextContainer>
    </ArticleContainer>
  );
};

export default ArticleRcmd;
