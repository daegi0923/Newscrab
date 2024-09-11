import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";

const ViewCountNewsPage: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <NewsCommon />
      <h1>조회수순 뉴스 페이지</h1>
    </div>
  );
};

export default ViewCountNewsPage;
