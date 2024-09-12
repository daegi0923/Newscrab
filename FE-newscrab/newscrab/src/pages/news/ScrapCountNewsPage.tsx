import GlobalStyle from "@components/GlobalStyle";
import NewsCommon from "@pages/news/common/NewsCommon";

const ScrapCountNewsPage: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <NewsCommon />
      <h1>스크랩순 뉴스 페이지</h1>
    </div>
  );
};

export default ScrapCountNewsPage;
