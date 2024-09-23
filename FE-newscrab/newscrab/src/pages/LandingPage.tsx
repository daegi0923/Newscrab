import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@store/user/loginLogout";

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div>
      <h1>newscrab 바꼈나요?</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login 페이지</Link>
          </li>
          <li>
            <Link to="/signup1">회원가입 페이지</Link>
          </li>
          <li>
            <Link to="/mypage">마이페이지</Link>
          </li>
          <li>
            <Link to="/voca">단어장 페이지</Link>
          </li>
          <li>
            <Link to="/mainNews">MainNews 페이지</Link>
          </li>
          <li>
            <Link to="/updatedAtScrap">스크랩 페이지</Link>
          </li>
          <li>
            <Link to="/newsDetail/1">뉴스 디테일 (임시)</Link>
          </li>
          {/* 다른 링크들은 필요에 따라 추가할 수 있습니다 */}
        </ul>
      </nav>
      
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default LandingPage;
