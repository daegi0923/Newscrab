import styled from "styled-components";
import carousel2 from "@assets/landing/carousel2.png";
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 100px;
`;

const Image = styled.img`
  width: 30%;
  height: auto;
  radius: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  text-align: left;
`;

const Carousel2: React.FC = () => {
  return (
    <StyledContainer>
      <Image src={carousel2} alt="carousel image" />
      <TextWrapper>
        <h1>선호 산업군을 기반으로</h1>
        <h1>추천 뉴스를 제공합니다.</h1>
        <br />
        <h3>15개의 산업군 중 선호하는 산업을</h3>
        <h3>우선순위에 따라 3개 선택해 보세요.</h3>
        <h3>알고리즘이 맞춤형 뉴스를 추천드립니다.</h3>
      </TextWrapper>
    </StyledContainer>
  );
};

export default Carousel2;
