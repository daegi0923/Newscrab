import styled from "styled-components";

interface CardProps {
  img: string | null;
  industryName: string | null;
  vocaName: string;
  updatedAt: string;
  originNewsTitle: string;
  onClick?: () => void;
}

const CardWrapper = styled.div`
  perspective: 1000px; /* 3D 공간을 정의 */
`;

const CardContainer = styled.div`
  margin: 3% 0% 0 0;
  position: relative;
  width: 150px;
  height: 200px; /* 카드 크기 설정 */
  border-radius: 10px;
  transform-style: preserve-3d; /* 3D 회전 효과 적용 */
  transition: transform 0.6s ease-in-out, box-shadow 0.3s ease-out, transform 0.3s ease-out; /* 애니메이션 속도 조절 */
  
  &:hover {
    transform: rotateY(180deg) translateY(-10px); /* 살짝 띄워지면서 회전 */
    box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1); /* 호버 시 그림자 */
    cursor: pointer;
  }

  /* 기본 그림자는 없음 */
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0);

  /* 마우스가 사라지면 그림자 즉시 제거 */
  &:not(:hover) {
    box-shadow: none;
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* 카드 뒷면이 보이지 않도록 설정 */
  border-radius: 10px;
`;

const CardFront = styled(CardFace)`
  /* 카드 앞면 */
  background-color: #fff;
`;

const CardBack = styled(CardFace)`
  /* 카드 뒷면 */
  background-color: #f0f0f0;
  transform: rotateY(180deg); /* 뒷면을 180도 회전 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Industry = styled.div`
  position: absolute;
  top: 4%;
  left: 10%;
  z-index: 10;
  color: #333;
  font-size: 17px;
  font-weight: bold;
`;

const CardContent = styled.div`
  position: absolute;
  top: 14%;
  left: 10%;
  z-index: 10;
  color: #555;
  font-size: 14px;
  font-weight: bold;
`;

const CardContent1 = styled.div`
  position: absolute;
  top: 14%;
  left: 7%;
  z-index: 10;
  color: #555;
  font-size: 14px;
  // font-weight: bold;
`;

const CardDate = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  position: absolute;
  top: 80%;

  /* 수정: 좌우 반전 방지 */
  transform: rotateY(0);
`;

// 날짜 포맷 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};

const Card: React.FC<CardProps> = ({ img, industryName, vocaName, updatedAt, originNewsTitle, onClick }) => {
  return (
    <CardWrapper>
      <CardContainer onClick={onClick}>
        {/* 앞면 */}
        <CardFront>
          {img && <CardImage src={img} alt={vocaName} />}
          <Industry>{vocaName}</Industry>
          <CardContent>{industryName}</CardContent>
        </CardFront>

        {/* 뒷면 */}
        <CardBack>
          <CardDate>{formatDate(updatedAt)}</CardDate>
          <CardContent1>{originNewsTitle}</CardContent1>
        </CardBack>
      </CardContainer>
    </CardWrapper>
  );
};

export default Card;
