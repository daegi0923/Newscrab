// types.ts
export interface RelatedNews {
  newsId: number;
  newsTitle: string;
  publishedAt: string;
  imageUrl: string;
}

export interface VocaResponseDto {
  vocaId: number;
  industryId: number;
  vocaName: string;
  vocaDesc: string;
  sentence: string;
  originNewsId: number;
  createdAt: string;
  updatedAt: string;
  originNewsTitle: string;
  originNewsUrl: string;
  originNewsImgUrl: string;
  relatedNews1: RelatedNews; 
  relatedNews2: RelatedNews; 
  relatedNews3: RelatedNews;
}

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
