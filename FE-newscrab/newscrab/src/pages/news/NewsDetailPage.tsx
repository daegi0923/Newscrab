import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";

const NewsDetailPage: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <NewsCommon />
      <h1>뉴스 디테일 페이지</h1>
    </div>
  );
};

export default NewsDetailPage;
