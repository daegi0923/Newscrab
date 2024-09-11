import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";

const RcmdNewsPage: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <NewsCommon />
      <h1>추천 뉴스 페이지</h1>
    </div>
  );
};

export default RcmdNewsPage;
