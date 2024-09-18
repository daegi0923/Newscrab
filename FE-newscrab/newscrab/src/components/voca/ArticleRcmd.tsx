import styled from "styled-components";

const ArticleContainer = styled.div`
  border: 3px solid red;
  padding: 10px;
  margin-bottom: 10px;
`;

// RelatedNews 컴포넌트: 각 related_news_id를 받아 해당 뉴스를 렌더링하는 컴포넌트
interface ArticleRcmdProps {
  newsId: number;
}

const ArticleRcmd: React.FC<ArticleRcmdProps> = ({ newsId }) => {
  return (
    <ArticleContainer>
      <p>뉴스 ID: {newsId}</p>
    </ArticleContainer>
  );
};

export default ArticleRcmd;

