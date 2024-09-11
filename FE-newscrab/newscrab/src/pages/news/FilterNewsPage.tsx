import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";

const FilterNewsPage: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <NewsCommon />
      <h1>필터링 뉴스 페이지</h1>
    </div>
  );
};

export default FilterNewsPage;
