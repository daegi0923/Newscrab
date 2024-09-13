import GlobalStyle from "@components/GlobalStyle";
import Header from "@components/common/Header";
import SearchBar from "@components/common/SearchBar";
import styled from "styled-components";
// import { useState } from 'react'

// 이미지 import
// import imgAppliances from "@assets/voca/가전.png";
// import imgFinance from "@assets/voca/금융.png";
// import imgRobotics from "@assets/voca/기계로봇.png";
// import imgDisplay from "@assets/voca/디스플레이.png";
// import imgBioHealth from "@assets/voca/바이오헬스.png";
// import imgSemiconductor from "@assets/voca/반도체.png";
// import imgTextile from "@assets/voca/섬유.png";
// import imgBatteries from "@assets/voca/이차전지.png";
// import imgAutomobile from "@assets/voca/자동차.png";
// import imgOil from "@assets/voca/정유.png";
// import imgShipbuilding from "@assets/voca/조선.png";
// import imgSteel from "@assets/voca/철강.png";
// import imgComputer from "@assets/voca/컴퓨터.png";
// import imgTelecom from "@assets/voca/통신장비.png";
// import imgChemicals from "@assets/voca/화학.png";

// 프론트엔드에서 사용되는 이미지 데이터
// const words = [
//   { id: 1, word: "가전", img: imgAppliances },
//   { id: 2, word: "금융", img: imgFinance },
//   { id: 3, word: "기계로봇", img: imgRobotics },
//   { id: 4, word: "디스플레이", img: imgDisplay },
//   { id: 5, word: "바이오헬스", img: imgBioHealth },
//   { id: 6, word: "반도체", img: imgSemiconductor },
//   { id: 7, word: "섬유", img: imgTextile },
//   { id: 8, word: "이차전지", img: imgBatteries },
//   { id: 9, word: "자동차", img: imgAutomobile },
//   { id: 10, word: "정유", img: imgOil },
//   { id: 11, word: "조선", img: imgShipbuilding },
//   { id: 12, word: "철강", img: imgSteel },
//   { id: 13, word: "컴퓨터", img: imgComputer },
//   { id: 14, word: "통신장비", img: imgTelecom },
//   { id: 15, word: "화학", img: imgChemicals },
// ];

// const mockWords = [
//   { id: 1, term: "조선", definition: "LNG선", dateAdded: "2024.05.07" },
//   {
//     id: 2,
//     term: "바이오헬스",
//     definition: "치코리타",
//     dateAdded: "2024.06.07",
//   },
//   { id: 3, term: "금융", definition: "오트밀", dateAdded: "2024.07.07" },
//   { id: 4, term: "정유", definition: "하리보", dateAdded: "2024.08.07" },
//   { id: 5, term: "철강", definition: "꼬숨이", dateAdded: "2024.09.07" },
// ];

const SearchContainer = styled.div`
  // 전체 가로 중앙정렬
`;
const VocaContainer = styled.div`
  // 필터링이랑 카드 왼쪽에 맞추기
`;
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;
const Card = styled.div`
  width: 150px;
  height: 220px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
`;

const VocaPage: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <SearchContainer>
        <SearchBar />
        <VocaContainer>
          {/* 필터링 */}
          <CardContainer>
            <Card></Card>
          </CardContainer>
        </VocaContainer>
      </SearchContainer>
    </div>
  );
};

export default VocaPage;
