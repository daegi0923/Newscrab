import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div>
      <h1>newscrab</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login 페이지</Link>
          </li>
          <li>
            <Link to="/mainNews">MainNews 페이지</Link>
          </li>
          {/* 다른 링크들은 필요에 따라 추가할 수 있습니다 */}
        </ul>
      </nav>
    </div>
  );
};

export default LandingPage;