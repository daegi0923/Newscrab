export interface TabOption {
  id: string;
  label: string;
  path: string;
}

export const tabOptions: TabOption[] = [
  { id: "rcmdNews", label: "추천", path: "/rcmdNews" },
  { id: "filterNews", label: "필터링", path: "/filterNews" },
  { id: "viewCountNews", label: "조회수", path: "/viewCountNews" },
  { id: "scrapCountNews", label: "스크랩수", path: "/scrapCountNews" },
];
