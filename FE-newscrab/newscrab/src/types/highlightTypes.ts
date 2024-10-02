// 하이라이트 항목을 나타내는 인터페이스
export interface HighlightItem {
    highlightId: number; // 하이라이트 고유 ID
    startPos: number; // 하이라이트 시작 위치
    endPos: number; // 하이라이트 끝 위치
    color: "Y" | "R" | "G" | "B"; // 하이라이트 색상 (Y: Yellow, R: Red, G: Green, B: Blue)
  }
  
// 하이라이트 API의 응답 형식 정의
export interface HighlightResponse {
statusCode: number;
httpStatus: string;
message: string;
data: HighlightItem[]; // 하이라이트 데이터 배열
}
