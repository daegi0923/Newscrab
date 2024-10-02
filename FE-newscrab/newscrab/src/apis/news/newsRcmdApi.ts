import API from "@apis/apiClient";
import { RcmdNewsItem } from "../../types/newsTypes"; // RcmdNewsItem을 import

export const getRcmdNews = async (): Promise<RcmdNewsItem[]> => {
  try {
    const response = await API.get("/news/recommend/list");

    const { data } = response.data; // API 응답 데이터 추출

    // userBase, itemBase, latest 데이터를 합친 리스트 생성 및 중복 제거
    const mergedRcmdNews: RcmdNewsItem[] = [
      ...data.userBase,
      ...data.itemBase,
      ...data.latest,
    ].filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.newsId === item.newsId)
    );

    // mergedRcmdNewsData 반환
    return mergedRcmdNews; // 합쳐진 뉴스 리스트 반환
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error fetching recommended news:", error);
    }
    throw error;
  }
};

// 사용자 이름을 가져오는 함수
export const getUsername = async (): Promise<string> => {
  try {
    const response = await API.get("/user/name");

    const { data } = response.data; // API 응답 데이터 추출
    const username = data.name; // 응답 데이터에서 사용자 이름 추출

    return username; // 사용자 이름 반환
  } catch (error: any) {
    console.error("Error fetching username:", error);
    throw error;
  }
};
