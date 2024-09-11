import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";

const AllNewsPage: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <NewsCommon />
      <h1>전체 뉴스 페이지</h1>
    </div>
  );
};

export default AllNewsPage;
