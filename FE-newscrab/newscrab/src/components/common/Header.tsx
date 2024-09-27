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
`;

const Divider = styled.hr`
  width: 100%;
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
