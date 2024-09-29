import API from "@apis/apiClient";

// Axios 요청을 통해 특정 뉴스의 상세 정보를 가져오는 함수
export const getNewsDetail = async (newsId: number) => {
  try {
    const response = await API.get(`/news/${newsId}`, {}); // 해당 뉴스 ID로 API 요청

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
        : ["https://picsum.photos/100/80"], // 이미지가 없을 경우 기본 이미지 설정
      relatedNews1: data.relatedNews1
        ? {
            // relatedNews1 데이터가 존재할 경우에만 처리
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
              : ["https://picsum.photos/100/80"], // 사진이 없을 경우 기본 이미지 설정
          }
        : null, // relatedNews1이 없으면 null 반환
      relatedNews2: data.relatedNews2
        ? {
            // relatedNews2 데이터가 존재할 경우에만 처리
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
              : ["https://picsum.photos/100/80"], // 사진이 없을 경우 기본 이미지 설정
          }
        : null, // relatedNews2가 없으면 null 반환
      relatedNews3: data.relatedNews3
        ? {
            // relatedNews3 데이터가 존재할 경우에만 처리
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
              : ["https://picsum.photos/100/80"], // 사진이 없을 경우 기본 이미지 설정
          }
        : null, // relatedNews3가 없으면 null 반환
    };

    return newsDetail;
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
