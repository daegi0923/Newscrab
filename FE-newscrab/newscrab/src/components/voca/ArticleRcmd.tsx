import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ArticleContainer = styled.div`
  position: relative;
  border: 3px solid red;
  border-radius: 20px;
  // padding: 7px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 30%;
  height: 100%;
  overflow: hidden;
  box-shadow: 3px 5px 4px rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.5); // 아래로 갈수록 투명해지는 배경
  
`;

// RelatedNews 컴포넌트: 각 related_news_id를 받아 해당 뉴스를 렌더링하는 컴포넌트
interface ArticleRcmdProps {
  newsId: number;
}

// const NewsImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover; // 이미지를 박스에 맞추면서 비율 유지
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 1; // 이미지가 텍스트보다 뒤에 있어야 함
// `;

const TextContainer = styled.div`
  position: absolute;
  bottom: -13%;
  left: -0%;
  width: 88%;
  color: white;
  z-index: 2; // 텍스트가 이미지 위로 올라오도록 함
  padding: 10px;
  // border: 3px solid blue;
`;

// 제목 스타일
const Title = styled.h3`
  font-size: 1rem;
  margin:0%;
  white-space: nowrap;       /* 한 줄로 표시 */
  overflow: hidden;          /* 넘친 부분 숨김 */
  text-overflow: ellipsis;   /* 넘친 텍스트를 ...로 표시 */
  width: 100%;               /* 컨테이너의 너비에 맞춤 */
`;

// 날짜 스타일
const DateText = styled.p`
  margin-top:0%;
  font-size: 0.7rem;
`;

const ArticleRcmd: React.FC<ArticleRcmdProps> = ({ newsId }) => {
// const ArticleRcmd: React.FC<ArticleRcmdProps> = ({ newsId, title, publishedAt, imgUrl }) => {
const navigate = useNavigate();
const handleNewsClick = () => {
  navigate(`/news/${newsId}`);
};

  return (
    <ArticleContainer onClick={handleNewsClick}>
      <p>뉴스 ID: {newsId}</p>
      {/* {imgUrl && <NewsImage src={imgUrl} alt="News Thumbnail" />} */}
      <TextContainer>
        <Title>제목</Title>
        <DateText>시간</DateText>
      </TextContainer>
    </ArticleContainer>
  );
};

export default ArticleRcmd;

