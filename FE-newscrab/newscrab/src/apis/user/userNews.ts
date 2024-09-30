import API from "../apiClient";

export const fetchUserViewNews = async (page: number) => {
  try {
    // 페이지 번호를 URL에 포함
    const response = await API.get(`/profile/recent?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("최근 본 뉴스 가져오기 실패", error);
    throw error;
  }
};