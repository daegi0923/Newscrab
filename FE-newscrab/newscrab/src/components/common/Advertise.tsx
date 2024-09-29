import styled from "styled-components";
import AdImage from "../../assets/voca/adver.png";

const AdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10%;
  width: 10%;
  // border: 1px solid black;
  padding: 0;
  margin: 0;
`;

const AdverImage = styled.img`
  width: 80%;
  object-fit: cover;
  display: block;
`;

const Advertise: React.FC = () => {
  return (
    <AdContainer>
      <AdverImage src={AdImage} alt="광고" />
    </AdContainer>
  );
};

export default Advertise;
