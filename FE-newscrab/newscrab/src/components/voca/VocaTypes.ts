// types.ts
export interface VocaResponseDto {
  vocaId: number;
  industryId: number;
  vocaName: string;
  vocaDesc: string;
  sentence: string;
  originNewsId: number;
  createdAt: string;
  updatedAt: string;
  relatedNewsId1: number;
  relatedNewsId2: number;
  relatedNewsId3: number;
}
// export interface MockWord {
//   vocaId: number;
//   industryId: number;
//   vocaName: string;
//   vocaDesc: string;
//   sentence: string;
//   originNewsId: number;
//   createdAt: string;
//   updatedAt: string;
//   related_news_id1: number;
//   related_news_id2: number;
//   related_news_id3: number;
// }

export interface Word {
  industryId: number;
  industryName: string;
  img: string;
}

// export interface VocaWithImages extends MockWord {
export interface VocaWithImages extends VocaResponseDto  {
  img: string | null;
  industryName: string | null;
}
