// src/types/newsTypes.ts

// 뉴스 항목의 구조를 정의한 인터페이스
export interface NewsItem {
  newsId: number; // 뉴스 고유 ID
  newsTitle: string; // 뉴스 제목
  industryId: number; // 산업 ID
  newsContent: string; // 뉴스 내용
  newsPublishedAt: string; // 뉴스 게시일
  newsCompany: string; // 뉴스 회사
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
  newsUrl: string; // 뉴스 URL
  view: number; // 조회수
  scrapCnt: number; // 스크랩 수
  photoUrlList: string[] | null; // 사진 URL 리스트 (없을 경우 null)
}

// 목업 데이터 구조를 정의한 인터페이스
export interface MockData {
  news: NewsItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
