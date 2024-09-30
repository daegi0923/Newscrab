import API from "@apis/apiClient";

// Axios 요청을 통해 스크랩의 상세 정보를 가져오는 함수
export const getScrapDetail = async (scrapId: number) => {
  try {
    const response = await API.get(`/scrap/${scrapId}`, {}); // scrapId를 사용해 API 요청

    const data = response.data.data; // 응답에서 'data' 객체 추출

    // 상세 스크랩 데이터를 구조화하여 반환
    const scrapDetail = {
      scrapId: data.scrapId,
      newsId: data.newsId,
      newsTitle: data.newsTitle,
      industryId: data.industryId,
      newsContent: data.newsContent,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      newsCompany: data.newsCompany,
      view: data.view,
      scrapCnt: data.scrapCnt,
      scrapSummary: data.scrapSummary,
      comment: data.comment,
      photolist: data.photolist.length
        ? data.photolist
        : ["https://picsum.photos/100/80"], // 이미지가 없을 경우 기본 이미지 설정
      vocalist: data.vocalist || [], // vocalist 배열이 없을 경우 빈 배열로 설정
      highlightList: data.highlightList || [], // highlightList가 없을 경우 빈 배열로 설정
    };

    return scrapDetail;
  } catch (error: any) {
    // 서버로부터의 에러 응답에 대한 처리
    if (error.response) {
      console.error("Error response data:", error.response.data); // 에러 응답 데이터 로그
      console.error("Error response status:", error.response.status); // 에러 상태 코드 로그
      console.error("Error response headers:", error.response.headers); // 에러 응답 헤더 로그
    } else if (error.request) {
      console.error("Error request:", error.request); // 요청이 전송되었으나 응답을 받지 못한 경우 로그
    } else {
      console.error("General error:", error.message); // 기타 에러 메시지 로그
    }
    throw error; // 에러를 호출한 곳으로 전달
  }
};
