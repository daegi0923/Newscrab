import axios from "axios";
import { ScrapListResponse, ScrapData } from "../../types/scrapTypes";
import { mock_token } from "../mock_token"; // 토큰 경로와 import 확인

export const getScrapData = async (
  page: number = 1,
  size: number = 10
): Promise<ScrapListResponse> => {
  try {
    const response = await axios.get(
      "https://newscrab.duckdns.org/api/v1/scrap",
      {
        params: {
          page, // 현재 페이지 전달
          size, // 페이지당 아이템 수 전달
        },
        headers: {
          Authorization: mock_token, // 인증 헤더
        },
        withCredentials: true, // 쿠키와 함께 요청
      }
    );

    const { data } = response.data; // API 응답 데이터 추출
    const scrapList: ScrapData[] = data.data.map((item: ScrapData) => ({
      scrapId: item.scrapId,
      newsId: item.newsId,
      newsTitle: item.newsTitle,
      photolist: item.photolist,
      scrapSummary: item.scrapSummary,
      comment: item.comment,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      vocalist: item.vocalist, // Vocalist 배열 그대로 매핑
      newsContent: item.newsContent,
      highlightList: item.highlightList, // Highlight 배열 그대로 매핑
      industryId: item.industryId,
    }));

    const scrapData: ScrapListResponse = {
      statusCode: response.data.statusCode,
      httpStatus: response.data.httpStatus,
      message: response.data.message,
      data: {
        data: scrapList, // 매핑된 스크랩 리스트 데이터
        totalItems: data.totalItems,
      },
    };

    return scrapData; // 스크랩 데이터 반환
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error fetching scrap data:", error);
    }
    throw error;
  }
};
