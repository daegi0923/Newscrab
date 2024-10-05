import API from "@apis/apiClient";
import { RcmdNewsItem } from "../../types/newsTypes"; // RcmdNewsItem을 import

export const getRcmdNews = async (): Promise<RcmdNewsItem[]> => {
  try {
    const response = await API.get("/news/recommend/list");

    const { data } = response.data; // API 응답 데이터 추출

    // 각각의 리스트에서 rcmd 필드를 추가하여 리스트 생성
    const userBaseWithRcmd = data.userBase.map((item: RcmdNewsItem) => ({
      ...item,
      rcmd: "userBase",
    }));

    const itemBaseWithRcmd = data.itemBase.map((item: RcmdNewsItem) => ({
      ...item,
      rcmd: "itemBase",
    }));

    const latestWithRcmd = data.latest.map((item: RcmdNewsItem) => ({
      ...item,
      rcmd: "latest",
    }));

    // 가장 긴 리스트의 길이 계산
    const maxLength = Math.max(
      userBaseWithRcmd.length,
      itemBaseWithRcmd.length,
      latestWithRcmd.length
    );

    const mergedRcmdNews: RcmdNewsItem[] = [];

    // 각 리스트에서 순차적으로 하나씩 데이터를 추가
    for (let i = 0; i < maxLength; i++) {
      if (i < userBaseWithRcmd.length) {
        mergedRcmdNews.push(userBaseWithRcmd[i]);
      }
      if (i < itemBaseWithRcmd.length) {
        mergedRcmdNews.push(itemBaseWithRcmd[i]);
      }
      if (i < latestWithRcmd.length) {
        mergedRcmdNews.push(latestWithRcmd[i]);
      }
    }

    // 중복을 제거 (newsId 기준)
    const uniqueMergedRcmdNews = mergedRcmdNews.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.newsId === item.newsId)
    );

    // 합쳐진 뉴스 리스트 반환
    return uniqueMergedRcmdNews;
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
