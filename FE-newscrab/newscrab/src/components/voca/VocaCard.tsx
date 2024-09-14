import styled from "styled-components";

interface CardProps {
  img: string | null;
  industryName: string | null;
  vocaName: string;
  updatedAt: string;
  onClick: () => void;
}

const CardContainer = styled.div`
  position: relative;
  width: 150px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15%;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Industry = styled.div`
  position: absolute;
  top: 4%;
  left: 10%;
  z-index: 10;
  color: #333;
  font-size: 16px;
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

const CardDate = styled.div`
  position: absolute;
  bottom: 6%;
  left: 10%;
  z-index: 10;
  color: #555;
  font-size: 12px;
  font-weight: bold;
`;

// 날짜 포맷 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};

const Card: React.FC<CardProps> = ({ img, industryName, vocaName, updatedAt, onClick }) => {
  return (
    <CardContainer onClick={onClick} style={{ cursor: 'pointer' }}>
      {img && <CardImage src={img} alt={vocaName} />}
      <Industry>{industryName}</Industry>
      <CardContent>{vocaName}</CardContent>
      <CardDate>{formatDate(updatedAt)}</CardDate>
    </CardContainer>
  );
};

export default Card;
