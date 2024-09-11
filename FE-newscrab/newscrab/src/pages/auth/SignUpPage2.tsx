import styled from 'styled-components';
import { useState } from 'react';
import appliances from '../../assets/voca/가전.png';
import finance from '../../assets/voca/금융.png';
import robotics from '../../assets/voca/기계로봇.png';
import display from '../../assets/voca/디스플레이.png';
import bioHealth from '../../assets/voca/바이오헬스.png';
import semiconductor from '../../assets/voca/반도체.png';
import textile from '../../assets/voca/섬유.png';
import batteries from '../../assets/voca/이차전지.png';
import automobile from '../../assets/voca/자동차.png';
import oil from '../../assets/voca/정유.png';
import shipbuilding from '../../assets/voca/조선.png';
import steel from '../../assets/voca/철강.png';
import computer from '../../assets/voca/컴퓨터.png';
import telecom from '../../assets/voca/통신장비.png';
import chemicals from '../../assets/voca/화학.png';

const industries = [
  { id: 1, name: '조선', img: shipbuilding },
  { id: 2, name: '바이오헬스', img: bioHealth },
  { id: 3, name: '금융', img: finance },
  { id: 4, name: '정유', img: oil },
  { id: 5, name: '철강', img: steel },
  { id: 6, name: '자동차', img: automobile },
  { id: 7, name: '반도체', img: semiconductor },
  { id: 8, name: '섬유', img: textile },
  { id: 9, name: '가전', img: appliances },
  { id: 10, name: '화학', img: chemicals },
  { id: 11, name: '이차전지', img: batteries },
  { id: 12, name: '컴퓨터', img: computer },
  { id: 13, name: '통신장비', img: telecom },
  { id: 14, name: '기계로봇', img: robotics },
  { id: 15, name: '디스플레이', img: display }
];

const SignUpContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin-bottom: 2%;
    text-align: center;
  }
  h3 {
    margin-left: 5%;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Card = styled.div<{ isHidden: boolean }>`
  width: 120px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: grab;
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')}; /* 카드가 선택되면 숨기기 */
  img {
    width: 100%;
    height: 100%;
  }
`;

const IndustryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  margin-right: 50px;
`;

const DropArea = styled.div`
  width: 120px;
  height: 160px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  p {
    color: #999;
    font-size: 14px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SaveButton = styled.button`
  background-color: #ffbe98;
  border: none;
  font-size: 14px;
  border-radius: 10px;
  height: 40px;
  width: 80px;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  &:hover {
    background-color: #e09520;
  }
`;

const SignUpPage2: React.FC = () => {
  const [selectedIndustries, setSelectedIndustries] = useState<Array<string | null>>([null, null, null]);
  const [availableIndustries, setAvailableIndustries] = useState(industries);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, industry: string) => {
    event.dataTransfer.setData('industry', industry);

    const dragImg = new Image();
    dragImg.src = industry;
    dragImg.onload = () => {
      event.dataTransfer.setDragImage(dragImg, dragImg.width / 2, dragImg.height / 2); // 드래그 시 선명한 이미지 표시
    };
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    const industry = event.dataTransfer.getData('industry');
    const newSelectedIndustries = [...selectedIndustries];
    newSelectedIndustries[index] = industry;
    setSelectedIndustries(newSelectedIndustries);

    // 선택된 카드는 CardContainer에서 사라지도록 처리
    setAvailableIndustries(availableIndustries.filter((item) => item.img !== industry));
  };

  const handleRemoveIndustry = (index: number) => {
    const newSelectedIndustries = [...selectedIndustries];
    const removedIndustry = newSelectedIndustries[index];
    newSelectedIndustries[index] = null;
    setSelectedIndustries(newSelectedIndustries);

    // 선택 취소된 카드를 다시 availableIndustries에 추가
    const removedIndustryObj = industries.find((item) => item.img === removedIndustry);
    if (removedIndustryObj) {
      setAvailableIndustries([...availableIndustries, removedIndustryObj]);
    }
  };

  return (
    <SignUpContainer>
      <h3>2단계 2/2</h3>
      <h2>✅ 좋아하는 산업군을 3개 선택하세요</h2>
      
      <CardContainer>
        <IndustryGrid>
          {industries.map((industry) => (
            <Card
              key={industry.id}
              draggable
              onDragStart={(event) => handleDragStart(event, industry.img)}
              isHidden={selectedIndustries.includes(industry.img)} // 선택된 카드는 숨기기
            >
              <img src={industry.img} alt={industry.name} />
            </Card>
          ))}
        </IndustryGrid>

        <DropContainer>
          {selectedIndustries.map((industry, index) => (
            <DropArea key={index} 
              onDrop={(event) => handleDrop(event, index)} 
              onDragOver={(event) => event.preventDefault()}
              onClick={() => handleRemoveIndustry(index)}>
              {industry ? <img src={industry} alt={`순위 ${index + 1}`} /> : <p>{index + 1}순위</p>}
            </DropArea>
          ))}
        </DropContainer>
        <SaveButton>저장</SaveButton>
      </CardContainer>
    </SignUpContainer>
  );
};

export default SignUpPage2;
