import axios from "axios";
import { NewsData } from "../../types/newsTypes";
import { mock_token } from "./mock_token"; // 토큰 경로와 import 확인

// Axios 요청을 통해 뉴스 데이터를 가져오는 함수
export const getNewsData = async (page: number): Promise<NewsData> => {
  try {
    const response = await axios.get(
      "https://newscrab.duckdns.org/api/v1/news/filter?industryId=-1&page=1&size=10&option=total", // 실제 API URL로 요청
      {
        params: {
          page: page,
          size: 10, // 페이지당 아이템 수 설정
        },
        headers: {
          Authorization: mock_token, // 인증 헤더
        },
        withCredentials: true,
      }
    );

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
