export interface Article {
  articleId: string;
  newsId: string;
  newsTitle: string;
  industryId: string;
  name: string;
  likeCnt: number;
  createdAt: string;
  updatedAt: string;
}

const industries = [
  { industryId: "1", industryName: "자동차" },
  { industryId: "2", industryName: "반도체" },
  { industryId: "3", industryName: "바이오헬스" },
  { industryId: "4", industryName: "정보통신기기" },
  { industryId: "5", industryName: "가전" },
  { industryId: "6", industryName: "철강" },
  { industryId: "7", industryName: "정유" },
  { industryId: "8", industryName: "석유화학" },
  { industryId: "9", industryName: "이차전지" },
  { industryId: "10", industryName: "디스플레이" },
  { industryId: "11", industryName: "금융" },
  { industryId: "12", industryName: "IT" },
  { industryId: "13", industryName: "섬유" },
  { industryId: "14", industryName: "조선" },
  { industryId: "15", industryName: "일반기계" },
];

const newsTitles = [
  "신규 전기차 모델, 주행거리 30% 증가 발표",
  "메모리 반도체 시장 성장세 유지, 공급 부족 예고",
  "새로운 항암 치료제 임상 2상 진입 성공",
  "5G 스마트폰 출하량 20% 증가",
  "OLED TV 판매량, 올해 50% 성장 예상",
  "철강업계, 탄소 배출 감소 위한 신기술 개발",
  "원유 가격 상승, 정유업계 3분기 실적 개선 기대",
  "석유화학 산업, 친환경 소재로 전환 속도",
  "차세대 배터리, 10분 만에 완전 충전 기술 개발",
  "디스플레이 시장, 초고해상도 기술이 미래를 주도",
  "디지털 금융 서비스, 사용자 100만 돌파",
  "AI 기반 IT 솔루션, 제조업 생산성 30% 향상",
  "친환경 섬유 소재, 글로벌 시장에서 주목",
  "조선업, 친환경 LNG선 수주 경쟁 치열",
  "산업용 로봇, 스마트 공장 도입 가속화",
];

export const dummyData: Article[] = Array.from({ length: 100 }, (_, i) => {
  const randomIndustry =
    industries[Math.floor(Math.random() * industries.length)];
  const randomTitle = newsTitles[Math.floor(Math.random() * newsTitles.length)];
  const randomAuthor = [
    "Noah",
    "Guevara",
    "Aurora",
    "Eve",
    "Bernie",
    "Harry",
    "Alice",
    "Sophia",
  ][Math.floor(Math.random() * 8)];

  return {
    articleId: `${i + 1}`,
    newsId: `${Math.floor(10000 + Math.random() * 90000)}`,
    newsTitle: `${randomTitle} (${randomIndustry.industryName})`,
    industryId: randomIndustry.industryName,
    name: randomAuthor,
    likeCnt: Math.floor(Math.random() * 100),
    createdAt: `2024-${Math.floor(1 + Math.random() * 12)
      .toString()
      .padStart(2, "0")}-${Math.floor(1 + Math.random() * 28)
      .toString()
      .padStart(2, "0")} ${Math.floor(0 + Math.random() * 23)
      .toString()
      .padStart(2, "0")}:${Math.floor(0 + Math.random() * 59)
      .toString()
      .padStart(2, "0")}:${Math.floor(0 + Math.random() * 59)
      .toString()
      .padStart(2, "0")}`,
    updatedAt: `2024-${Math.floor(1 + Math.random() * 12)
      .toString()
      .padStart(2, "0")}-${Math.floor(1 + Math.random() * 28)
      .toString()
      .padStart(2, "0")} ${Math.floor(0 + Math.random() * 23)
      .toString()
      .padStart(2, "0")}:${Math.floor(0 + Math.random() * 59)
      .toString()
      .padStart(2, "0")}:${Math.floor(0 + Math.random() * 59)
      .toString()
      .padStart(2, "0")}`,
  };
});
