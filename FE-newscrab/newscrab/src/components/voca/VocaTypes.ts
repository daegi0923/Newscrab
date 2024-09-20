// types.ts
export interface MockWord {
  vocaId: number;
  industryId: number;
  vocaName: string;
  vocaDesc: string;
  sentence: string;
  originNewsId: number;
  createdAt: string;
  updatedAt: string;
  related_news_id1: number;
  related_news_id2: number;
  related_news_id3: number;
}

export interface Word {
  industryId: number;
  industryName: string;
  img: string;
}

export interface MockWordWithImages extends MockWord {
  img: string | null;
  industryName: string | null;
}
