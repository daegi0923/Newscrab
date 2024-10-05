import styled from "styled-components";

const StyledContainer = styled.div`
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Carousel2: React.FC = () => {
  return (
    <>
      <StyledContainer>
        <h1>선호 산업군을 기반으로</h1>
        <h1>추천 뉴스를 제공합니다.</h1>
        <br />
        <h3>15개의 산업군 중 선호하는 산업을</h3>
        <h3>우선순위에 따라 3개 선택해 보세요.</h3>
        <h3>알고리즘이 맞춤형 뉴스를 추천드립니다.</h3>
      </StyledContainer>
    </>
  );
};

export default Carousel2;
