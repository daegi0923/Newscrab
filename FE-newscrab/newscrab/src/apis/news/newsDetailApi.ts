import API from "@apis/apiClient";

// Axios 요청을 통해 특정 뉴스의 상세 정보를 가져오는 함수
export const getNewsDetail = async (newsId: number) => {
  try {
    const response = await API.get(
      `/news/${newsId}`, // API URL에 뉴스 ID를 추가하여 요청
      {}
    );

    const data = response.data.data; // 응답에서 'data' 객체 추출

    // 상세 뉴스 데이터를 구조화하여 반환
    const newsDetail = {
      newsId: data.newsId,
      newsTitle: data.newsTitle,
      industryId: data.industryId,
      newsContent: data.newsContent,
      newsPublishedAt: data.newsPublishedAt,
      newsCompany: data.newsCompany,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      newsUrl: data.newsUrl,
      view: data.view,
      scrap: data.scrap,
      newsPhoto: data.newsPhoto.length
        ? data.newsPhoto
        : ["https://picsum.photos/100/80"], // 이미지가 없을 때 기본 이미지 설정
      relatedNews1: {
        newsId: data.relatedNews1.newsId,
        newsTitle: data.relatedNews1.newsTitle,
        industryId: data.relatedNews1.industryId,
        newsContent: data.relatedNews1.newsContent,
        newsPublishedAt: data.relatedNews1.newsPublishedAt,
        newsCompany: data.relatedNews1.newsCompany,
        createdAt: data.relatedNews1.createdAt,
        updatedAt: data.relatedNews1.updatedAt,
        newsUrl: data.relatedNews1.newsUrl,
        view: data.relatedNews1.view,
        scrapCnt: data.relatedNews1.scrap,
        photoUrlList: data.relatedNews1.photoUrlList.length
          ? data.relatedNews1.photoUrlList
          : ["https://picsum.photos/100/80"],
      },
      relatedNews2: {
        newsId: data.relatedNews2.newsId,
        newsTitle: data.relatedNews2.newsTitle,
        industryId: data.relatedNews2.industryId,
        newsContent: data.relatedNews2.newsContent,
        newsPublishedAt: data.relatedNews2.newsPublishedAt,
        newsCompany: data.relatedNews2.newsCompany,
        createdAt: data.relatedNews2.createdAt,
        updatedAt: data.relatedNews2.updatedAt,
        newsUrl: data.relatedNews2.newsUrl,
        view: data.relatedNews2.view,
        scrapCnt: data.relatedNews2.scrap,
        photoUrlList: data.relatedNews2.photoUrlList.length
          ? data.relatedNews2.photoUrlList
          : ["https://picsum.photos/100/80"],
      },
      relatedNews3: {
        newsId: data.relatedNews3.newsId,
        newsTitle: data.relatedNews3.newsTitle,
        industryId: data.relatedNews3.industryId,
        newsContent: data.relatedNews3.newsContent,
        newsPublishedAt: data.relatedNews3.newsPublishedAt,
        newsCompany: data.relatedNews3.newsCompany,
        createdAt: data.relatedNews3.createdAt,
        updatedAt: data.relatedNews3.updatedAt,
        newsUrl: data.relatedNews3.newsUrl,
        view: data.relatedNews3.view,
        scrapCnt: data.relatedNews3.scrap,
        photoUrlList: data.relatedNews3.photoUrlList.length
          ? data.relatedNews3.photoUrlList
          : ["https://picsum.photos/100/80"],
      },
    };

    return newsDetail;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
    } else {
      console.error("Error fetching news detail:", error);
    }
    throw error;
  }
};
