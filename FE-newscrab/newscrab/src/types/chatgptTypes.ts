// 뉴스 요약 API의 응답 형식 정의
export interface ChatGptSummaryResponse {
    statusCode: number; // 상태 코드 (예: 200)
    httpStatus: string; // HTTP 상태 (예: OK)
    message: string; // 응답 메시지 (예: "뉴스 요약본 생성 완료")
    data: {
      summary: string; // 뉴스 요약본
    };
  }
  