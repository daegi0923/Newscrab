export interface TabOption {
  id: string;
  label: string;
  path: string;
}

export const tabOptions: TabOption[] = [
  { id: "mainVoca", label: "수정 날짜순", path: "/mainVoca" },
  { id: "orderVoca", label: "가나다순", path: "/orderVoca" },
  { id: "filterVoca", label: "필터링", path: "/filterVoca" },
];
