export interface Vocalist {
  vocaId: number;
  newsId: number;
  userId: number;
  vocaName: string;
  vocaDesc: string;
  originNewsId: number;
  sentence: string;
  createdAt: string;
  updatedAt: string;
  relatedNewsId1: number;
  relatedNewsId2: number;
  relatedNewsId3: number;
}

export interface Highlight {
  startPos: number;
  endPos: number;
  color: string; // Y, R, G 등의 값으로 색상 표현
}

export interface ScrapData {
  scrapId: number;
  newsId: number;
  newsTitle: string;
  photolist: string[]; // 사진 리스트
  scrapSummary: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  vocalist: Vocalist[]; // 다수의 vocalist 정보
  newsContent: string; // 뉴스 본문
  highlightList: Highlight[]; // 강조된 하이라이트 리스트
  industryId: number;
  view: number;
  scrapCnt: number;
  newsCompany: string;
}

export interface ScrapListResponse {
  statusCode: number;
  httpStatus: string;
  message: string;
  data: {
    data: ScrapData[];
    totalItems: number;
  };
}

// 스크랩 post요청
export interface PostScrapRequest {
  newsId: number | null;
  comment: string | null;
  scrapSummary: string | null;
  highlights: Highlight[] | null;
}

// 스크랩 put요청
export interface PutScrapRequest {
  newsId: number | null;
  comment: string | null;
  scrapSummary: string | null;
  highlights: Highlight[] | null;
}

// 스크랩 디테일
export interface ScrapDetailResponse {
  scrapId: number;
  newsId: number;
  newsTitle: string;
  industryId: number;
  newsContent: string;
  createdAt: string;
  updatedAt: string;
  newsCompany: string;
  view: number;
  scrapCnt: number;
  scrapSummary: string;
  comment: string;
  photolist: string[];
  vocalist: Vocalist[];
  highlightList: Highlight[];
}

// 스크랩 디테일 단어장
export interface ScrapDetailVocaListResponse {
  vocaId: number;
  newsId: number;
  userId: number;
  vocaName: string;
  vocaDesc: string;
  originNewsId: number;
  sentence: string;
  createdAt: string;
  updatedAt: string;
  relatedNewsId1: number | null;
  relatedNewsId2: number | null;
  relatedNewsId3: number | null;
}
