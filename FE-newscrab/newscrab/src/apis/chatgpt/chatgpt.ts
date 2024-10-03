import API from "../apiClient";
import { ChatGptSummaryResponse, ChatGptPredQuestionResponse, ChatGptPredQuestionRequest } from "../../types/chatgptTypes";

// 뉴스 요약본 가져오기 (GET 요청)
export const fetchNewsSummary = async (newsId: number): Promise<string> => {
  try {
    const response = await API.get<ChatGptSummaryResponse>(`/chatgpt/summary/${newsId}`);
    
    if (response.data.statusCode === 200) {
      return response.data.data.summary; // 요약본 반환
    } else {
      throw new Error(response.data.message || "뉴스 요약본 생성에 실패했습니다.");
    }
  } catch (error) {
    console.error(`뉴스 ID ${newsId} 요약본 가져오기 실패:`, error);
    throw error;
  }
};

// 예상 질문 생성하기 (POST 요청)
export const fetchPredQuestions = async (requestData: ChatGptPredQuestionRequest): Promise<string> => {
  try {
    const response = await API.post<ChatGptPredQuestionResponse>(`/chatgpt/pred-question`, requestData);
    
    if (response.data.statusCode === 200) {
      return response.data.data.question; // 예상 질문 반환
    } else {
      throw new Error(response.data.message || "예상 질문 생성에 실패했습니다.");
    }
  } catch (error) {
    console.error("예상 질문 생성 실패:", error);
    throw error;
  }
};
