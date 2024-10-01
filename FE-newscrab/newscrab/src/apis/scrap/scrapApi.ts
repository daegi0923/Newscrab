import API from "@apis/apiClient";

import {
  ScrapListResponse,
  ScrapData,
  PostScrapRequest,
  PutScrapRequest,
} from "../../types/scrapTypes";

export const getScrapData = async (
  page: number = 1,
  size: number = 10
): Promise<ScrapListResponse> => {
  try {
    const response = await API.get("/scrap", {
      params: {
        page, // 현재 페이지 전달
        size, // 페이지당 아이템 수 전달
      },
    });

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
      view: item.view,
      scrapCnt: item.scrapCnt,
      newsCompany: item.newsCompany,
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

export const postScrap = async (scrapData: PostScrapRequest): Promise<void> => {
  try {
    const response = await API.post("/scrap", {
      newsId: scrapData.newsId,
      comment: scrapData.comment,
      scrapSummary: scrapData.scrapSummary,
      // vocalist: scrapData.vocalist,
      highlights: scrapData.highlights,
    });

    console.log("Scrap posted successfully:", response.data);
  } catch (error: any) {
    console.error("Error posting scrap:", error);
    throw error;
  }
};

export const putScrap = async (
  scrapId: number,
  scrapData: PutScrapRequest
): Promise<void> => {
  try {
    const response = await API.put(`/scrap/${scrapId}`, {
      newsId: scrapData.newsId,
      comment: scrapData.comment,
      scrapSummary: scrapData.scrapSummary,
      highlights: scrapData.highlights,
    });

    console.log("Scrap updated successfully:", response.data);
  } catch (error: any) {
    console.error("Error updating scrap:", error);
    throw error;
  }
};

export const deleteScrap = async (scrapId: number): Promise<void> => {
  try {
    const response = await API.delete(`/scrap/${scrapId}`);
    console.log("Scrap deleted successfully:", response.data);
  } catch (error: any) {
    console.error("Error deleting scrap:", error);
    throw error;
  }
};
