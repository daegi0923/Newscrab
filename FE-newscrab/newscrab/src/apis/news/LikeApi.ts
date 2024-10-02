import API from "@apis/apiClient";

// 특정 뉴스의 찜 여부를 조회하는 함수
export const getLike = async (newsId: number): Promise<boolean> => {
  try {
    const response = await API.get(
      `/news/like/${newsId}` // 실제 API URL로 요청
    );

    const { data } = response.data; // API 응답에서 'data' 부분만 추출
    // console.log(`News ID: ${newsId}에 대한 찜 여부 조회 성공:`, data);
    return data; // 찜 여부 반환 (true or false)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error fetching like status:", error);
    }
    throw error;
  }
};

// 특정 뉴스에 좋아요 요청을 보내는 함수
export const postLike = async (newsId: number): Promise<void> => {
  try {
    const response = await API.post(
      `/news/like/${newsId}`, // 실제 API URL로 요청
      {} // POST 요청의 body는 비어있음
    );

    console.log(`News ID: ${newsId}에 좋아요 요청 성공`, response.data);
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error posting like:", error);
    }
    throw error;
  }
};

// 특정 뉴스의 좋아요를 삭제하는 함수
export const deleteLike = async (newsId: number): Promise<void> => {
  try {
    const response = await API.delete(
      `/news/like/${newsId}` // 실제 API URL로 요청
    );

    console.log(
      `News ID: ${newsId}에 대한 좋아요 삭제 요청 성공`,
      response.data
    );
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error deleting like:", error);
    }
    throw error;
  }
};
