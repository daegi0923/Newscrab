import React, { useRef } from "react";
import styled from "styled-components";

interface VocaDetailProps {
  img: string | null;
  industryName: string | null;
  vocaName: string;
  vocaDesc: string;
  sentence: string;
}

const DetailContainer = styled.div`
  z-index: 1;
  display: flex;
  align-items: flex-start;
  border-radius: 10px;
  width: 49%;
  background: #ffffff;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.3);
  padding: 2%;
`;

const CardContainer = styled.div`
  position: relative;
  width: 200px;
  height: 280px;
  border-radius: 15px;
  overflow: hidden;
  perspective: 1000px;
  transition: transform 0.1s ease;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 10;
  top: 0; /* 오버레이가 카드에 완전히 겹치도록 */
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 219, 112, 0.8) 45%,
    rgba(132, 50, 255, 0.6) 50%,
    transparent 54%
  );
  filter: brightness(1.2) opacity(0.8);
  mix-blend-mode: screen;
  background-size: 150% 150%;
  background-position: 100%;
  transition: all 0.1s ease;
  // border: 3px solid red;
`;

const CardImage = styled.img`
  width: 100%; /* 카드 이미지가 카드 크기에 맞도록 */
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
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
  align-items: center;
  padding-left: 20px;
`;

interface VocaDetailCardProps {
  img: string | null;
  industryName: string | null;
  vocaName: string;
}

const VocaDetailCard: React.FC<VocaDetailCardProps> = ({ img, industryName, vocaName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    overlay.style.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
    container.style.transform = `perspective(1000px) rotateY(${(x / rect.width - 0.5) * 20}deg) rotateX(${(y / rect.height - 0.5) * -20}deg)`;
    overlay.style.opacity = "1";
  };

  const handleMouseOut = () => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    overlay.style.opacity = "0";
    container.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <CardContainer ref={containerRef} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
      {img && <CardImage src={img} alt={vocaName} />}
      <Overlay ref={overlayRef} />
      <Industry>{industryName}</Industry>
      <CardContent>{vocaName}</CardContent>
    </CardContainer>
  );
};

const VocaDetail: React.FC<VocaDetailProps> = ({ img, industryName, vocaName, vocaDesc, sentence }) => {
  return (
    <DetailContainer>
      <VocaDetailCard img={img} industryName={industryName} vocaName={vocaName} />
      <VocaDesc>
        <h3>{vocaDesc}</h3>
        <h4>{sentence}</h4>
      </VocaDesc>
    </DetailContainer>
  );
};

export default VocaDetail;
