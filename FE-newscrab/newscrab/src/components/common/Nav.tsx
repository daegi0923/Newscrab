import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from '@assets/crab.png';
import { logout } from "@store/user/loginLogout";

const SidebarContainer = styled.nav`
  padding-top: 3%;
  background-color: #212121;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 100%;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 1000;
  &:hover {
    width: 180px;
  }
`;

const NavList = styled.ul`
  padding: 0;
  list-style: none;
  height: 100%;
`;

const NavItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0;  /* 패딩 제거 */
  margin: 0;  /* 마진 제거 */
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  padding: 15px 10px;  /* 패딩을 조정하여 공간 확보 */
  text-decoration: none;
  color: #999;
  font-size: 12px;
  width: 100%;
  transition: all 0.2s ease;
  
  &:hover {
    color: white;
    background-color: #000;
    cursor: pointer;
  }
  
  span {
    margin-right: 20px;
    font-size: 15px;
    display: inline-block;
  }
`;

const NavText = styled.span`
  font-size: 16px;
  font-family: 'Titillium Web', sans-serif;
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.3s ease;
  
  ${SidebarContainer}:hover & {
    opacity: 1;
  }
`;

const LogoutItem = styled.li`
  position: absolute;
  bottom: 6%;
  width: 100%;
  list-style: none;
`;

const ImageTop = styled.img`
  position: absolute;
  top: 2%;
  left: 10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 2; /* 네비게이션 바 위에 보이도록 설정 */
`;

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <SidebarContainer>
      {/* 좌측 상단에 프로필 이미지 1 */}
      <ImageTop src={logo} alt="Profile 1" />
      
      <NavList>
        <NavItem>
          <NavLink onClick={() => navigate("/mypage")}>
            <span>🏠</span>
            <NavText>마이페이지</NavText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => navigate("/voca")}>
            <span>📖</span>
            <NavText>단어장</NavText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => navigate("/news")}>
            <span>📰</span>
            <NavText>전체 뉴스</NavText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => navigate("/news/scrap")}>
            <span>📋</span>
            <NavText>스크랩</NavText>
          </NavLink>
        </NavItem>
      </NavList>

      {/* 좌측 하단에 로그아웃 버튼 */}
      <LogoutItem>
        <NavLink onClick={(handleLogout)}>
          <span>🚪</span>
          <NavText>로그아웃</NavText>
        </NavLink>
      </LogoutItem>
    </SidebarContainer>
  );
};

export default Nav;
