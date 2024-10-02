import API from "../apiClient";

export const fetchUserViewNews = async (page: number) => {
  try {
    // 페이지 번호를 URL에 포함
    const response = await API.get(`/profile/recent?page=${page}`);
    console.log('처음 불러온 뉴스', response)
    return response.data;
  } catch (error) {
    console.error("최근 본 뉴스 가져오기 실패", error);
    throw error;
  }
};

export const fetchUserLikeNews = async (page: number) => {
  try {
    // 페이지 번호를 URL에 포함
    const response = await API.get(`/profile/like?page=${page}`);
    console.log('찜한 뉴스', response)
    return response.data;
  } catch (error) {
    console.error("찜한 뉴스 가져오기 실패", error);
    throw error;
  }
};