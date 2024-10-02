import API from "@apis/apiClient";
import { HighlightResponse, HighlightItem } from "../../types/highlightTypes";

// 특정 scrapId에 대한 하이라이트 데이터를 가져오는 함수
export const getScrapHighlights = async (scrapId: number): Promise<HighlightItem[]> => {
  try {
    const response = await API.get<HighlightResponse>(`/scrap/${scrapId}/highlight`);

    // 응답 데이터에서 하이라이트 리스트를 추출 (data가 빈 배열일 수 있음)
    const highlights = response.data.data || [];
    
    return highlights;
  } catch (error: any) {
    // 에러 처리
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("General error:", error.message);
    }
    throw error; // 에러를 상위로 전달
  }
};
