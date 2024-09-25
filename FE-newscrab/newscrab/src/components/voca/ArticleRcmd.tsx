import styled from "styled-components";

const ArticleContainer = styled.div`
  position: relative;
  border: 3px solid red;
  border-radius: 20px;
  padding: 7px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 30%;
  height: 100%;
  overflow: hidden;
  box-shadow: 3px 5px 4px rgba(0, 0, 0, 0.3);
  
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
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  background: rgba(0, 0, 0, 0.7); // 아래로 갈수록 투명해지는 배경
  z-index: 2; // 텍스트가 이미지 위로 올라오도록 함
  padding: 10px;
`;

// 제목 스타일
const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

// 날짜 스타일
const DateText = styled.p`
  margin: 5px 0 0;
  font-size: 0.8rem;
`;

const ArticleRcmd: React.FC<ArticleRcmdProps> = ({ newsId }) => {
// const ArticleRcmd: React.FC<ArticleRcmdProps> = ({ newsId, title, publishedAt, imgUrl }) => {
  return (
    <ArticleContainer>
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

