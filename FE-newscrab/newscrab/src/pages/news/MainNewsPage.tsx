import GlobalStyle from "@components/GlobalStyle";
import { Link } from "react-router-dom";

const MainNewsPage: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <h1>뉴스 메인페이지!!</h1>
      <ul>
        <li>
          <Link to="/rcmdNews">추천 뉴스 페이지</Link>
        </li>
        <li>
          <Link to="/allNews">전체 뉴스 페이지</Link>
        </li>
      </ul>
    </div>
  );
};

export default MainNewsPage;
