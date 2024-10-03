// 뉴스 요약 API의 응답 형식 정의
export interface ChatGptSummaryResponse {
    statusCode: number; // 상태 코드 (예: 200)
    httpStatus: string; // HTTP 상태 (예: OK)
    message: string; // 응답 메시지 (예: "뉴스 요약본 생성 완료")
    data: {
      summary: string; // 뉴스 요약본
    };
  }
  
// 예상 질문 생성 API의 응답 형식 정의
export interface ChatGptPredQuestionResponse {
    statusCode: number; // 상태 코드 (예: 200)
    httpStatus: string; // HTTP 상태 (예: OK)
    message: string; // 응답 메시지 (예: "예상질문 생성 완료")
    data: {
      question: string; // 예상 질문 목록
    };
  }
  
// 예상 질문 생성 API의 요청 형식 정의
export interface ChatGptPredQuestionRequest {
    text: string; // 입력 텍스트
    newsId: number; // 뉴스 ID
}