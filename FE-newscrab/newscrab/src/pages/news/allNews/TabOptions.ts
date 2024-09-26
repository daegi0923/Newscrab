export interface TopTabOption {
  id: number;
  name: string;
  label: string;
}

export interface BottomTabOption {
  id: number;
  label: string;
}

// 상단 탭 옵션
export const topTabOptions: TopTabOption[] = [
  { id: 1, name: "전체", label: "total" },
  { id: 2, name: "조회수", label: "hot" },
  { id: 3, name: "스크랩수", label: "scrap" },
];

// 하단 필터 옵션
export const bottomTabOptions: BottomTabOption[] = [
  { id: 12, label: "IT" },
  { id: 5, label: "가전" },
  { id: 11, label: "금융" },
  { id: 10, label: "디스플레이" },
  { id: 3, label: "바이오헬스" },
  { id: 2, label: "반도체" },
  { id: 8, label: "석유화학" },
  { id: 13, label: "섬유" },
  { id: 9, label: "이차전지" },
  { id: 15, label: "일반기계" },
  { id: 1, label: "자동차" },
  { id: 4, label: "정보통신기기" },
  { id: 7, label: "정유" },
  { id: 14, label: "조선" },
  { id: 6, label: "철강" },
];
