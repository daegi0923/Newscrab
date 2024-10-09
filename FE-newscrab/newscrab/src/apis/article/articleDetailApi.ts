import API from "@apis/apiClient";
import { ArticleDetailItem } from "../../types/articleTypes";

// API URL 설정
const API_URL = "/article";

// GET 요청 함수
export const getArticleDetail = async (
  articleId: number
): Promise<ArticleDetailItem | null> => {
  try {
    const response = await API.get(`${API_URL}/${articleId}`);
    const { data } = response.data; // API 응답 데이터 추출

    const articleDetail: ArticleDetailItem = {
      statusCode: response.data.statusCode,
      httpStatus: response.data.httpStatus,
      message: response.data.message,
      data: {
        articleId: data.articleId,
        name: data.name,
        likeCnt: data.likeCnt,
        scrapResponseDto: {
          scrapId: data.scrapResponseDto.scrapId,
          newsId: data.scrapResponseDto.newsId,
          newsTitle: data.scrapResponseDto.newsTitle,
          photolist: data.scrapResponseDto.photolist.length
            ? data.scrapResponseDto.photolist
            : ["https://picsum.photos/100/80"], // 이미지가 없는 경우 기본 이미지 설정
          scrapSummary: data.scrapResponseDto.scrapSummary,
          comment: data.scrapResponseDto.comment,
          createdAt: data.scrapResponseDto.createdAt,
          updatedAt: data.scrapResponseDto.updatedAt,
          vocalist: data.scrapResponseDto.vocalist.map((vocal: any) => ({
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
          newsContent: data.scrapResponseDto.newsContent,
          highlightList: data.scrapResponseDto.highlightList.map(
            (highlight: any) => ({
              highlightId: highlight.highlightId,
              startPos: highlight.startPos,
              endPos: highlight.endPos,
              color: highlight.color,
            })
          ),
          industryId: data.scrapResponseDto.industryId,
          view: data.scrapResponseDto.view,
          scrapCnt: data.scrapResponseDto.scrapCnt,
          newsCompany: data.scrapResponseDto.newsCompany,
        },
      },
    };

    return articleDetail; // 기사 상세 데이터 반환
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error fetching article details:", error);
    }
    return null;
  }
};
