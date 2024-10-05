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

const Carousel4: React.FC = () => {
  return (
    <>
      <StyledContainer>
        <h1>NEWSCRAB과 함께 기회를 잡고</h1>
        <h1>여러분이 목표하는 바를 이루세요!</h1>
      </StyledContainer>
    </>
  );
};

export default Carousel4;
