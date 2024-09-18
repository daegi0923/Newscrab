import styled from "styled-components";

interface VocaDetailCardProps {
  img: string | null;
  industryName: string | null;
  vocaName: string;
}

const DetailContainer = styled.div`
  display: flex;
  align-items: flex-start;
  border: 1px solid black;
  border-radius: 10px;
  width: 50%;
  // height: 350px; // 원하는 DetailContainer 높이
  background: #FFFFFF;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.3);
  padding:2%;
`;

const CardContainer = styled.div`
  position: relative;
  flex: 1;
  width: auto;
  height: 100%;
  border-radius: 10px;
  // overflow: hidden;
  margin-right: 20px;
`;

const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Industry = styled.div`
  position: absolute;
  top: 4%;
  left: 10%;
  z-index: 10;
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

const CardContent = styled.div`
  position: absolute;
  top: 14%;
  left: 10%;
  z-index: 10;
  color: #555;
  font-size: 16px;
  font-weight: bold;
`;

const VocaDesc = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const VocaDetailCard: React.FC<VocaDetailCardProps> = ({ img, industryName, vocaName }) => {
  return (
    <CardContainer>
      {img && <CardImage src={img} alt={vocaName} />}
      <Industry>{industryName}</Industry>
      <CardContent>{vocaName}</CardContent>
    </CardContainer>
  );
};

interface VocaDetailProps {
  word: {
    vocaId: number;
    img: string | null;
    industryName: string | null;
    vocaName: string;
    vocaDesc: string;
  };
}

const VocaDetail: React.FC<VocaDetailProps> = ({ word }) => {
  return (
    <DetailContainer>
      <VocaDetailCard
        img={word.img}
        industryName={word.industryName}
        vocaName={word.vocaName}
      />
      <VocaDesc>
        <h3>{word.vocaDesc}</h3>
      </VocaDesc>
    </DetailContainer>
  );
};

export default VocaDetail;
