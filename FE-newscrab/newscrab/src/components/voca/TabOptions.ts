export interface TabOption {
  id: string;
  label: string;
}

export const tabOptions: TabOption[] = [
  { id: "filterVoca", label: "필터링"},
  { id: "mainVoca", label: "수정 날짜순"},
  { id: "orderVoca", label: "가나다순"},
];
