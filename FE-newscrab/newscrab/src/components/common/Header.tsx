import styled from "styled-components";
import headerImage from "@assets/header.png";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HeaderImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const Divider = styled.hr`
  width: 90%;
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderImage src={headerImage} alt="Header" />
      <Divider />
    </HeaderContainer>
  );
};

export default Header;
