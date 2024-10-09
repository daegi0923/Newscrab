import React, { useRef } from "react";
import styled from "styled-components";
import defaultImg from '@assets/auth/defaultProfile.jpg'

interface VocaDetailProps {
  img: string | null;
  industryName: string | null;
  vocaName: string;
  vocaDesc: string;
  sentence: string;
  newsImage?: string;
}

const DetailContainer = styled.div`
  z-index: 1;
  position: relative;
  top: 5%;
  // display: flex;
  // align-items: flex-start;
  border-radius: 10px;
  width: 55%;
  height: 55%;
  background: #ffffff;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.3);
  // padding: 2%;
  // border: solid red 1px;
`;

const CardContainer = styled.div`
  // position: relative;
  position: absolute;
  top: 15%; /* 원하는 위치에 배치 */
  left: 5%; /* 오른쪽에 배치 */
  width: 200px;
  height: 280px;
  border-radius: 15px;
  overflow: hidden;
  perspective: 1000px;
  transition: transform 0.1s ease;
  z-index: 5;
  
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
  left: 8%;
  z-index: 10;
  color: #555;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid #888;
  border-radius:20px;
  padding: 2px 7px;
`;

const CardContent = styled.div`
  position: absolute;
  top: 13%;
  left: 10%;
  z-index: 10;
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

const VocaSection = styled.div`
  // border : 1px solid blue;
  position: relative;
  width: 100%; /* 전체 폭을 차지 */
  height: 45%; /* 부모 컨테이너의 30%만 차지 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1; /* 추가: z-index 설정 */
`;

const VocaSection1 = styled.div`
  // border : 1px solid red;
  position: relative;
  width: 100%; /* 전체 폭을 차지 */
  height: 58%; /* 부모 컨테이너의 30%만 차지 */
  display: flex;
  justify-content: center;
  // align-items: center;
  overflow: hidden;  
  // z-index: -1;
  // border: solid 1px red;
`;

// const BlurredImage = styled.img`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: cover; /* 이미지가 섹션을 채우도록 설정 */
//   filter: blur(5px); /* 블러 처리 */
//   z-index: 1;
//   border-radius: 10px;
// `;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  /* 오버레이 추가 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2); /* 얇은 검은색 오버레이 */
    z-index: 2; /* 이미지 위에 오버레이가 표시되도록 설정 */
    border-radius: 10px 10px 0 0; /* 위쪽 두 꼭지점에만 둥글게 설정 */
  }
`;

const BlurredImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px);
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const VocaTitle = styled.h2`
  position: absolute; /* 절대 위치로 설정 */
  z-index: 2; 
  color: white;
  font-size: 1.4rem;
  
  top: 63%; /* 카드 내에서 가운데에 위치하도록 설정 */
  left: 34%; /* 가로 중앙 정렬 */
  // transform: translate(-50%, -50%); /* 중앙에 위치하도록 조정 */
  text-align: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  white-space: nowrap; /* 텍스트가 한 줄로 나오게 설정 */

  // /* 배경을 추가하는 부분 */
  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   width: 130%;
  //   height: 1em; /* 텍스트 크기에 맞게 배경 높이를 설정 */
  //   background-color: rgba(0, 0, 0, 0.3); /* 반투명 배경 */
  //   z-index: -1; /* 텍스트 뒤에 배경을 표시 */
  //   border-radius: 4px; /* 모서리를 둥글게 */
  // }
`;

const VocaDesc = styled.div`
  flex: 2;
  // border: solid 1px red;
  position: absolute; /* 절대 위치로 설정 */
  align-items: center;
  // text-align: center;
  left:34%;
  width: 65%;
  margin-top: -1%;
  span{
  color: navy;
  font-weight: 800;
  }
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
    container.style.transform = `perspective(1000px) rotateY(${(x / rect.width - 0.5) * 30}deg) rotateX(${(y / rect.height - 0.5) * -30}deg)`;
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
      <CardContent>{vocaName}</CardContent>
      <Industry>{industryName}</Industry>
    </CardContainer>
  );
};

const VocaDetail: React.FC<VocaDetailProps> = ({ img, industryName, vocaName, vocaDesc, sentence, newsImage  }) => {
  return (
    <DetailContainer>
      <VocaSection>
        {/* <p>{newsImage}</p> */}
        <ImageContainer>{newsImage && <BlurredImage src={newsImage} alt="blurred background" onError={(e) => { e.currentTarget.src = defaultImg; }}/>}</ImageContainer>
        <VocaTitle>{vocaName}</VocaTitle>
      </VocaSection>

      <VocaSection1>
      <VocaDesc>
        {/* 뜻 정의 예문 */}
        <h3><span>정의)</span> {vocaDesc}</h3>
        <h4><span>예문)</span> {sentence}</h4>
      {/* <p>{newsImage}</p> */}
      </VocaDesc>
      </VocaSection1>
      <VocaDetailCard img={img} industryName={industryName} vocaName={vocaName} />
    </DetailContainer>
    
  );
};

export default VocaDetail;
