import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ArticleContainer = styled.div`
  position: relative;
  // border: 3px solid red;
  border-radius: 10px;
  // padding: 7px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 32%;
  height: 80%;
  overflow: hidden;
  box-shadow: 3px 5px 4px rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.5); // 아래로 갈수록 투명해지는 배경
  `
;

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

// const NewsImage = styled.img
//   width: 100%;
//   height: 100%;
//   object-fit: cover; // 이미지를 박스에 맞추면서 비율 유지
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 1; // 이미지가 텍스트보다 뒤에 있어야 함
// ;

const TextContainer = styled.div`
  position: absolute;
  bottom: -13%;
  left: -0%;
  width: 92%;
  color: white;
  z-index: 2; // 텍스트가 이미지 위로 올라오도록 함
  padding: 10px;
  // border: 3px solid blue;`
;

// 제목 스타일
const Title = styled.h3`
  font-size: 0.8rem;
  margin:-1%;
  white-space: nowrap;       /* 한 줄로 표시 */
  overflow: hidden;          /* 넘친 부분 숨김 */
  text-overflow: ellipsis;   /* 넘친 텍스트를 ...로 표시 */
  width: 100%;               /* 컨테이너의 너비에 맞춤 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
`;

// 날짜 스타일
const DateText = styled.p`
  margin: 2% 0 5% 0%;
  font-size: 0.6rem;
  text-shadow: 1%;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.9);
`;

const ArticleRcmd: React.FC<ArticleRcmdProps> = ({ relatedNews }) => {
const navigate = useNavigate();
const handleNewsClick = () => {
  navigate(`/news/${relatedNews.newsId}`);
};

  return (
    <ArticleContainer onClick={handleNewsClick}>
      <img src={relatedNews.imageUrl} alt="News Thumbnail" style={{ width: '100%', height: '100%' }} />
      <TextContainer>
        <Title>{relatedNews.newsTitle}</Title>
        <DateText>{new Date(relatedNews.publishedAt).toLocaleDateString()}</DateText>
      </TextContainer>
    </ArticleContainer>
  );
};

export default ArticleRcmd;