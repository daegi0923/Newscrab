import API from "@apis/apiClient";

// 특정 게시글에 좋아요 요청을 보내는 함수
export const postLike = async (articleId: number): Promise<void> => {
  try {
    const response = await API.post(
      `/article/like/${articleId}`, // 실제 API URL로 요청
      {} // POST 요청의 body는 비어있음
    );

    console.log(`Article ID: ${articleId}에 좋아요 요청 성공`, response.data);
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error posting like:", error);
    }
    throw error;
  }
};

// 특정 게시글의 좋아요를 삭제하는 함수
export const deleteLike = async (articleId: number): Promise<void> => {
  try {
    const response = await API.delete(
      `/article/like/${articleId}` // 실제 API URL로 요청
    );

    console.log(
      `Article ID: ${articleId}에 대한 좋아요 삭제 요청 성공`,
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
