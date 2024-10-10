export interface ArticleData {
  statusCode: number;
  httpStatus: string;
  message: string;
  data: {
    articleList: ArticleItem[];
    totalItems: number;
  };
}

export interface ArticleItem {
  articleId: number;
  name: string;
  likeCnt: number;
  scrapResponseDto: {
    scrapId: number;
    newsId: number;
    newsTitle: string;
    photolist: string[];
    scrapSummary: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    vocalist: {
      vocaId: number;
      newsId: number;
      userId: number;
      vocaName: string;
      vocaDesc: string;
      originNewsId: number;
      sentence: string;
      industryId: number;
      createdAt: string;
      updatedAt: string;
      relatedNewsId1: number;
      relatedNewsId2: number;
      relatedNewsId3: number;
    }[];
    newsContent: string;
    highlightList: {
      highlightId: number;
      startPos: number;
      endPos: number;
      color: string;
    }[];
    industryId: number;
    view: number;
    scrapCnt: number;
    newsCompany: string;
  };
}

export interface ArticleDetailItem {
  statusCode: number;
  httpStatus: string;
  message: string;
  data: {
    articleId: number;
    name: string;
    likeCnt: number;
    scrapResponseDto: {
      scrapId: number;
      newsId: number;
      newsTitle: string;
      photolist: string[];
      scrapSummary: string;
      comment: string;
      createdAt: string;
      updatedAt: string;
      vocalist: {
        vocaId: number;
        newsId: number;
        userId: number;
        vocaName: string;
        vocaDesc: string;
        originNewsId: number;
        sentence: string;
        industryId: number;
        createdAt: string;
        updatedAt: string;
        relatedNewsId1: number;
        relatedNewsId2: number;
        relatedNewsId3: number;
      }[];
      newsContent: string;
      highlightList: {
        highlightId: number;
        startPos: number;
        endPos: number;
        color: string;
      }[];
      industryId: number;
      view: number;
      scrapCnt: number;
      newsCompany: string;
    };
  };
}
