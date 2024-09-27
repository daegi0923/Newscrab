// 목업 데이터 구조를 정의한 인터페이스 (리스트용)
export interface NewsData {
  news: NewsItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// 뉴스 항목의 구조를 정의한 인터페이스 (리스트용)
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

// 뉴스 상세 정보를 위한 새로운 인터페이스
export interface NewsDetailItem {
  newsId: number; // 뉴스 고유 ID
  newsTitle: string; // 뉴스 제목
  industryId: number; // 산업 ID
  newsContent: string; // 뉴스 내용 (상세)
  newsPublishedAt: string; // 뉴스 게시일
  newsCompany: string; // 뉴스 회사
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
  newsUrl: string; // 뉴스 URL
  view: number; // 조회수
  scrap: number; // 스크랩 수 (상세에서는 scrapCnt 대신 scrap 사용)
  newsPhoto: string[]; // 뉴스 사진 URL 리스트
  relatedNews1?: RelatedNewsItem | null; // 선택적 필드
  relatedNews2?: RelatedNewsItem | null; // 선택적 필드
  relatedNews3?: RelatedNewsItem | null; // 선택적 필드
}

// 연관 뉴스 항목의 구조를 정의한 인터페이스
export interface RelatedNewsItem {
  newsId: number;
  newsTitle: string;
  industryId: number;
  newsPublishedAt: string;
  newsCompany: string;
  createdAt: string;
  updatedAt: string;
  newsUrl: string;
  view: number;
  scrapCnt: number;
  photoUrlList: string[] | null;
}
