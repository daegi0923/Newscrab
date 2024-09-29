import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 import
import styled from "styled-components";
import headerImage from "@assets/headerImage.png";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HeaderImage = styled.img`
  margin-top: 3%;
  max-width: 100%;
  height: auto;
  cursor: pointer; // 클릭할 수 있도록 커서 스타일 추가
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
`;

const Header: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = () => {
    navigate("/"); // '/' 경로로 이동
  };

  return (
    <HeaderContainer>
      <HeaderImage src={headerImage} alt="Header" onClick={handleClick} />{" "}
      {/* 클릭 이벤트 추가 */}
      <Divider />
    </HeaderContainer>
  );
};

export default Header;
