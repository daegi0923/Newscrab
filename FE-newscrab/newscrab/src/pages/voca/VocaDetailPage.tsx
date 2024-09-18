import GlobalStyle from "@components/GlobalStyle";
import VocaCommon from "@pages/voca/VocaCommon";
import { MockWordWithImages } from "@components/voca/VocaTypes";
import { useLocation, useNavigate } from 'react-router-dom';
import VocaDetail from "@components/voca/VocaDetail";
import styled from "styled-components";
import ArticleRcmd from "@components/voca/ArticleRcmd";

const VocaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px black;
  height: 80vh;
`;

const NewsContainer = styled.div`
  border: solid 1px black;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  width: 54%;
`;

const BackButton = styled.button`
  position: absolute;
  top: 12%;
  left: 10%;
  padding: 10px 15px;
  background-color: #FFBE98;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  // font-weight: bold;
  color: white;
  &:hover {
    background-color: #FF8F4D;
  }
`;

const VocaDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { word } = location.state as { word: MockWordWithImages };
  const handleBackClick = () => {
    navigate('/voca');
  };


  return (
    <div>
      <GlobalStyle />
      <VocaCommon />
      <BackButton onClick={handleBackClick}>돌아가기</BackButton>
      <VocaContainer>
        <VocaDetail word={word} />
        <NewsContainer>
          <ArticleRcmd newsId={word.related_news_id1} />
          <ArticleRcmd newsId={word.related_news_id2} />
          <ArticleRcmd newsId={word.related_news_id3} />
        </NewsContainer>
      </VocaContainer>
    </div>
  );
};

export default VocaDetailPage;
