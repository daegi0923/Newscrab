export interface TabOption {
  id: string;
  label: string;
  path: string;
}

export const tabOptions: TabOption[] = [
  { id: "allNews", label: "수정 날짜순", path: "/updatedAtScrap" },
  { id: "filterNews", label: "필터링", path: "/filterScrap" },
];
