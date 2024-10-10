import styled from "styled-components";
import carousel3 from "@assets/landing/carousel3.png";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 50px;
`;

const Image = styled.img`
  width: 50%;
  height: auto;
  radius: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  text-align: left;
`;

const Carousel3: React.FC = () => {
  return (
    <>
      <StyledContainer>
        <Image src={carousel3} alt="carousel image" />
        <TextWrapper>
          <h1>스크랩을 통해</h1>
          <h1>나만의 뉴스와 키워드를 만드세요!</h1>
          <br />
          <h3>뉴스를 나만의 생각으로 요약, 의견, 단어장을 작성하세요.</h3>
          <h3>저장하고 싶은 글을 형광펜칠 할 수도 있어요.</h3>
          <h3>스크랩을 하나씩 늘려가며 모으는 재미를 느껴보세요.</h3>
        </TextWrapper>
      </StyledContainer>
    </>
  );
};

export default Carousel3;
