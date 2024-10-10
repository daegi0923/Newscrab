import API from "@apis/apiClient";
import { ArticleData } from "../../types/articleTypes";

export const getArticleData = async (): Promise<ArticleData> => {
  try {
    const response = await API.get("/article");
    const { data } = response.data;

    const articleList = data.articleList.map((item: any) => ({
      articleId: item.articleId,
      name: item.name,
      likeCnt: item.likeCnt,
      scrapResponseDto: {
        scrapId: item.scrapResponseDto.scrapId,
        newsId: item.scrapResponseDto.newsId,
        newsTitle: item.scrapResponseDto.newsTitle,
        photolist: item.scrapResponseDto.photolist.length
          ? item.scrapResponseDto.photolist
          : ["https://picsum.photos/100/80"],
        scrapSummary: item.scrapResponseDto.scrapSummary,
        comment: item.scrapResponseDto.comment,
        createdAt: item.scrapResponseDto.createdAt,
        updatedAt: item.scrapResponseDto.updatedAt,
        vocalist: item.scrapResponseDto.vocalist.map((vocal: any) => ({
          vocaId: vocal.vocaId,
          newsId: vocal.newsId,
          userId: vocal.userId,
          vocaName: vocal.vocaName,
          vocaDesc: vocal.vocaDesc,
          originNewsId: vocal.originNewsId,
          sentence: vocal.sentence,
          industryId: vocal.industryId,
          createdAt: vocal.createdAt,
          updatedAt: vocal.updatedAt,
          relatedNewsId1: vocal.relatedNewsId1,
          relatedNewsId2: vocal.relatedNewsId2,
          relatedNewsId3: vocal.relatedNewsId3,
        })),
        newsContent: item.scrapResponseDto.newsContent,
        highlightList: item.scrapResponseDto.highlightList.map(
          (highlight: any) => ({
            highlightId: highlight.highlightId,
            startPos: highlight.startPos,
            endPos: highlight.endPos,
            color: highlight.color,
          })
        ),
        industryId: item.scrapResponseDto.industryId,
        view: item.scrapResponseDto.view,
        scrapCnt: item.scrapResponseDto.scrapCnt,
        newsCompany: item.scrapResponseDto.newsCompany,
      },
    }));

    const articleData: ArticleData = {
      statusCode: response.data.statusCode,
      httpStatus: response.data.httpStatus,
      message: response.data.message,
      data: {
        articleList: articleList,
        totalItems: data.totalItems,
      },
    };

    return articleData;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error fetching article data:", error);
    }
    throw error;
  }
};

export const postArticle = async (scrapId: number): Promise<void> => {
  try {
    const response = await API.post("/article", {
      scrapId: scrapId,
    });
    console.log("Article posted successfully:", response.data);
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error posting article:", error);
    }
    throw error;
  }
};

// deleteArticle 함수 추가
export const deleteArticle = async (articleId: number): Promise<void> => {
  try {
    const response = await API.delete(`/article/${articleId}`);
    console.log("Article deleted successfully:", response.data);
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error deleting article:", error);
    }
    throw error;
  }
};
