import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";
// 뉴스 10개만 보여줌, pagenation없음

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
