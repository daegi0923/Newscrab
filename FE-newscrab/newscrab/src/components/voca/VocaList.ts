import imgAppliances from "@assets/voca/가전.png";
import imgFinance from "@assets/voca/금융.png";
import imgRobotics from "@assets/voca/기계로봇.png";
import imgDisplay from "@assets/voca/디스플레이.png";
import imgBioHealth from "@assets/voca/바이오헬스.png";
import imgSemiconductor from "@assets/voca/반도체.png";
import imgTextile from "@assets/voca/섬유.png";
import imgBatteries from "@assets/voca/이차전지.png";
import imgAutomobile from "@assets/voca/자동차.png";
import imgOil from "@assets/voca/정유.png";
import imgShipbuilding from "@assets/voca/조선.png";
import imgSteel from "@assets/voca/철강.png";
import imgComputer from "@assets/voca/컴퓨터.png";
import imgTelecom from "@assets/voca/통신장비.png";
import imgChemicals from "@assets/voca/화학.png";
import imgEtc from "@assets/voca/기타.png";

export const words = [
  { industryId: 1, industryName: "자동차", img: imgAutomobile },
  { industryId: 2, industryName: "반도체", img: imgSemiconductor },
  { industryId: 3, industryName: "바이오헬스", img: imgBioHealth },
  { industryId: 4, industryName: "정보통신기기", img: imgTelecom },
  { industryId: 5, industryName: "가전", img: imgAppliances },
  { industryId: 6, industryName: "철강", img: imgSteel },
  { industryId: 7, industryName: "정유", img: imgOil },
  { industryId: 8, industryName: "석유화학", img: imgChemicals },
  { industryId: 9, industryName: "이차전지", img: imgBatteries },
  { industryId: 10, industryName: "디스플레이", img: imgDisplay },
  { industryId: 11, industryName: "금융", img: imgFinance },
  { industryId: 12, industryName: "IT", img: imgComputer },
  { industryId: 13, industryName: "섬유", img: imgTextile },
  { industryId: 14, industryName: "조선", img: imgShipbuilding },
  { industryId: 15, industryName: "일반기계", img: imgRobotics },
  { industryId: 16, industryName: "기타", img: imgEtc },
];

export const mockWords = [
  { vocaId: 2, industryId: 4, vocaName: "치코리타", vocaDesc: "치코리타입니다.", originNewsId: 102, sentence: "바이오헬스 산업이 급성장 중입니다.", createdAt: "2024-06-07T12:00:00", updatedAt: "2024-06-07T12:00:00", related_news_id1: 204, related_news_id2: 205, related_news_id3: 206 }, 
  { vocaId: 1, industryId: 2, vocaName: "재현이", vocaDesc: "재현이입니다.", originNewsId: 101, sentence: "조선업이 호황을 맞고 있습니다.", createdAt: "2024-05-07T12:00:00", updatedAt: "2024-05-07T12:00:00", related_news_id1: 201, related_news_id2: 202, related_news_id3: 203 }, 
  { vocaId: 3, industryId: 9, vocaName: "오트밀", vocaDesc: "오트밀입니다.", originNewsId: 103, sentence: "금융 시장의 변동성이 큽니다.", createdAt: "2024-07-07T12:00:00", updatedAt: "2024-07-07T12:00:00", related_news_id1: 207, related_news_id2: 208, related_news_id3: 209 },
  { vocaId: 5, industryId: 4, vocaName: "자경이", vocaDesc: "자경이입니다.", originNewsId: 105, sentence: "철강 산업의 생산량이 증가하고 있습니다.", createdAt: "2024-09-07T12:00:00", updatedAt: "2024-08-07T12:00:00", related_news_id1: 213, related_news_id2: 214, related_news_id3: 215 }, 
  { vocaId: 7, industryId: 8, vocaName: "전기차", vocaDesc: "전기차입니다.", originNewsId: 107, sentence: "전기차 시장이 빠르게 성장하고 있습니다.", createdAt: "2024-11-07T12:00:00", updatedAt: "2024-11-07T12:00:00", related_news_id1: 219, related_news_id2: 220, related_news_id3: 221 }, 
  { vocaId: 6, industryId: 11, vocaName: "컴퓨터 칩", vocaDesc: "컴퓨터 칩입니다.", originNewsId: 106, sentence: "반도체 산업의 수요가 급증하고 있습니다.", createdAt: "2024-10-07T12:00:00", updatedAt: "2024-10-07T12:00:00", related_news_id1: 216, related_news_id2: 217, related_news_id3: 218 },
  { vocaId: 4, industryId: 13, vocaName: "하리보", vocaDesc: "하리보입니다.", originNewsId: 104, sentence: "정유 업계의 수익이 증가하고 있습니다.", createdAt: "2024-08-07T12:00:00", updatedAt: "2024-08-07T12:00:00", related_news_id1: 210, related_news_id2: 211, related_news_id3: 212 },
  { vocaId: 8, industryId: 2, vocaName: "인공지능", vocaDesc: "인공지능입니다.", originNewsId: 108, sentence: "AI 기술이 다양한 산업에 도입되고 있습니다.", createdAt: "2024-12-07T12:00:00", updatedAt: "2024-12-07T12:00:00", related_news_id1: 222, related_news_id2: 223, related_news_id3: 224 },
  { vocaId: 9, industryId: 4, vocaName: "치코리타", vocaDesc: "치코리타입니다.", originNewsId: 102, sentence: "바이오헬스 산업이 급성장 중입니다.", createdAt: "2024-06-07T12:00:00", updatedAt: "2024-06-07T12:00:00", related_news_id1: 204, related_news_id2: 205, related_news_id3: 206 }, 
  { vocaId: 10, industryId: 2, vocaName: "LNG선", vocaDesc: "LNG선입니다.", originNewsId: 101, sentence: "조선업이 호황을 맞고 있습니다.", createdAt: "2024-05-07T12:00:00", updatedAt: "2024-05-07T12:00:00", related_news_id1: 201, related_news_id2: 202, related_news_id3: 203 }, 
  { vocaId: 11, industryId: 9, vocaName: "오트밀", vocaDesc: "오트밀입니다.", originNewsId: 103, sentence: "금융 시장의 변동성이 큽니다.", createdAt: "2024-07-07T12:00:00", updatedAt: "2024-07-07T12:00:00", related_news_id1: 207, related_news_id2: 208, related_news_id3: 209 },
  { vocaId: 12, industryId: 4, vocaName: "꼬숨이", vocaDesc: "꼬숨이입니다.", originNewsId: 105, sentence: "철강 산업의 생산량이 증가하고 있습니다.", createdAt: "2024-09-07T12:00:00", updatedAt: "2024-09-07T12:00:00", related_news_id1: 213, related_news_id2: 214, related_news_id3: 215 }, 
  { vocaId: 13, industryId: 8, vocaName: "전기차", vocaDesc: "전기차입니다.", originNewsId: 107, sentence: "전기차 시장이 빠르게 성장하고 있습니다.", createdAt: "2024-11-07T12:00:00", updatedAt: "2024-11-07T12:00:00", related_news_id1: 219, related_news_id2: 220, related_news_id3: 221 }, 
  { vocaId: 14, industryId: 11, vocaName: "컴퓨터 칩", vocaDesc: "컴퓨터 칩입니다.", originNewsId: 106, sentence: "반도체 산업의 수요가 급증하고 있습니다.", createdAt: "2024-10-07T12:00:00", updatedAt: "2024-10-07T12:00:00", related_news_id1: 216, related_news_id2: 217, related_news_id3: 218 },
  { vocaId: 15, industryId: 13, vocaName: "하리보", vocaDesc: "하리보입니다.", originNewsId: 104, sentence: "정유 업계의 수익이 증가하고 있습니다.", createdAt: "2024-08-07T12:00:00", updatedAt: "2024-08-07T12:00:00", related_news_id1: 210, related_news_id2: 211, related_news_id3: 212 },
  { vocaId: 16, industryId: 2, vocaName: "인공지능", vocaDesc: "인공지능입니다.", originNewsId: 108, sentence: "AI 기술이 다양한 산업에 도입되고 있습니다.", createdAt: "2024-12-07T12:00:00", updatedAt: "2024-12-07T12:00:00", related_news_id1: 222, related_news_id2: 223, related_news_id3: 224 },
];

