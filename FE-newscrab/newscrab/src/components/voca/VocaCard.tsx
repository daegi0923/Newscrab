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
  perspective: 1500px;
`;

// const CardContainer = styled.div`
//   margin: 3% 0% 0 0;
//   position: relative;
//   width: 150px;
//   height: 200px; 
//   border-radius: 10px;
//   transform-style: preserve-3d;
//   transition: transform 0.6s ease-in-out, box-shadow 0.3s ease-out, transform 0.3s ease-out;
//   transform-origin: center;
//   &:hover {
//     transform: rotateY(180deg) translateY(-10px);
//     box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1);
//     cursor: pointer;
//     transition: transform 0.8s ease, box-shadow 0.4s ease;
//   }

//   box-shadow: 0 0px 0px rgba(0, 0, 0, 0);

//   &:not(:hover) {
//     transition: transform 0.5s ease-out, box-shadow 0.5s ease-out;
//     box-shadow: none;
//   }
// `;

const CardContainer = styled.div`
  margin: 3% 0% 0 0;
  position: relative;
  width: 150px;
  height: 200px; 
  border-radius: 10px;
  transform-style: preserve-3d;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-out; // 트랜지션 효과

  &:hover {
    transform: translateY(-7px); // 위로 살짝 이동
    box-shadow: 3px 8px 7px rgba(0, 5, 5, 0.4); // 그림자 추가
    cursor: pointer;
  }

  box-shadow: 0 0px 0px rgba(0, 0, 0, 0);

  &:not(:hover) {
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    box-shadow: none;
  }
`;


const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
`;

const CardFront = styled(CardFace)`
  background-color: #fff;
`;

// const CardBack = styled(CardFace)`
//   // background-color: #f0f0f0;
//   transform: rotateY(180deg);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const CardBack = styled(CardFace)`
  background-color: rgba(0, 0, 0, 0.6); // 반투명 배경 추가
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: #fff; // 텍스트를 흰색으로 변경
`;

const CardBackImage = styled.img`
  width: 80%; // 이미지 크기를 줄여서 상단에 배치
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px; // 이미지와 텍스트 사이 간격 추가
`;

const CardBackDate = styled.div`
  font-size: 12px;
  margin-top: 10px;
  color: #fff; // 날짜 텍스트 색상 변경
  text-align: center;
`;

const CardBackTitle = styled.div`
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
  color: #fff; // 원래 뉴스 제목도 추가
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const CardContent = styled.div`
  position: absolute;
  top: 17%;
  left: 11%;
  z-index: 10;
  color: #555;
  font-size: 17px;
  font-weight: bold;
`;

const Industry = styled.div`
  position: absolute;
  top: 5%;
  left: 8%;
  z-index: 10;
  color: #72717;
  font-size: 12px;
  // font-weight: bold;
  border: 0.06rem solid #404040;
  padding: 2px 7px;
  border-radius: 55px;
  // background-color: #727171;
`;

// const CardContent1 = styled.div`
//   position: absolute;
//   top: 15%;
//   left: 9%;
//   z-index: 10;
//   color: #555;
//   font-size: 14px;
//   // font-weight: bold;
// `;

const CardDate = styled.div`
  font-size: 11px;
  font-weight: bold;
  color: #555;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  margin-left: 8%;
  width: 85%;
  top: 90%;
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
          <Industry>{industryName}</Industry>
          <CardContent>{vocaName}</CardContent>
          <CardDate>{formatDate(updatedAt)}</CardDate>
        </CardFront>

        {/* 뒷면 */}
        {/* <CardBack>
          <CardDate>{formatDate(updatedAt)}</CardDate>
          {/* <CardContent1>{originNewsTitle}</CardContent1> */}
        {/* </CardBack> */}
        <CardBack>
          {img && <CardBackImage src={img} alt={vocaName} />} {/* 뒷면에도 이미지 추가 */}
          <CardBackDate>{formatDate(updatedAt)}</CardBackDate> {/* 날짜 추가 */}
          <CardBackTitle>{originNewsTitle}</CardBackTitle> {/* 뉴스 제목 추가 */}
        </CardBack>
      </CardContainer>
    </CardWrapper>
  );
};

export default Card;
