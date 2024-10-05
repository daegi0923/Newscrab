import API from "@apis/apiClient";
import { NewsData } from "../../types/newsTypes";

export const getNewsData = async (
  industryId: number = -1,
  page: number = 1,
  size: number = 10,
  ds?: string,
  de?: string,
  option: string = "total"
): Promise<NewsData> => {
  try {
    const response = await API.get("/news/filter", {
      params: {
        industryId, // 선택한 industryId를 전달
        page, // 현재 페이지 전달
        size, // 페이지당 아이템 수 전달
        ds, // 시작 날짜 (선택 사항)
        de, // 종료 날짜 (선택 사항)
        option, // 옵션 (예: total)
      },
    });

    const { data } = response.data; // API 응답 데이터 추출
    const news = data.news.map((item: any) => ({
      newsId: item.newsId,
      newsTitle: item.newsTitle,
      industryId: item.industryId,
      newsContent: item.newsContent,
      newsPublishedAt: item.newsPublishedAt,
      newsCompany: item.newsCompany,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      newsUrl: item.newsUrl,
      view: item.view,
      scrapCnt: item.scrapCnt,
      photoUrlList: item.photoUrlList.length
        ? item.photoUrlList
        : ["https://picsum.photos/100/80"], // 이미지가 없는 경우 기본 이미지 설정
    }));

    const newsData: NewsData = {
      news,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      totalItems: data.totalItems,
    };

    return newsData; // 뉴스 데이터 반환
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error fetching news data:", error);
    }
    throw error;
  }
};
