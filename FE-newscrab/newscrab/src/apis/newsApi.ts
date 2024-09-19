import { MockData } from "../types/newsTypes";

// Mock 데이터를 가져오는 함수
export const getMockNews = async (page: number): Promise<MockData> => {
  const itemsPerPage = 10; // 한 페이지당 10개의 뉴스
  const totalItems = 200; // 총 200개의 뉴스
  const totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수

  // 페이지에 따라 보여줄 뉴스 범위를 계산
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  // 목업 데이터 생성 함수
  const generateMockNews = async (id: number) => {
    const randomImageId = Math.floor(Math.random() * 1000); // 1~1000 사이의 랜덤 이미지 ID 생성
    const photoUrl = `https://picsum.photos/id/${randomImageId}/100/80`; // Lorem Picsum에서 랜덤 이미지
    const defaultImageUrl = "https://picsum.photos/100/80"; // 고정된 크기의 랜덤 이미지

    return {
      newsId: id,
      newsTitle: `Breaking News ${id}: Major Event Happens`,
      industryId: 0 + (id % 16), // 실제 데이터와 일치하도록 수정
      newsContent: `This is the content for news item ${id}...`,
      newsPublishedAt: `2024-09-${String(3 + (id % 10)).padStart(
        2,
        "0"
      )}T14:30:00`,
      newsCompany: `Global News Network ${id % 5}`, // 5개의 다른 회사 이름
      createdAt: `2024-09-${String(3 + (id % 10)).padStart(2, "0")}T14:00:00`,
      updatedAt: `2024-09-${String(3 + (id % 10)).padStart(2, "0")}T14:00:00`,
      newsUrl: `https://news.example.com/article/${id}`,
      view: Math.floor(Math.random() * 10000), // 0~9999까지 랜덤 조회수
      scrapCnt: Math.floor(Math.random() * 1000), // 0~999까지 랜덤 스크랩 수
      photoUrlList: photoUrl ? [photoUrl] : [defaultImageUrl], // 이미지 URL 리스트
    };
  };

  // 200개의 뉴스 데이터 비동기 생성 (각 뉴스 항목에 랜덤 이미지를 포함)
  const mockNewsPromises = Array.from({ length: totalItems }, (_, index) =>
    generateMockNews(index + 1)
  );
  const mockNews = await Promise.all(mockNewsPromises); // 모든 뉴스 생성 완료를 기다림

  // 현재 페이지에 해당하는 뉴스만 잘라서 반환
  const paginatedNews = mockNews.slice(startIdx, endIdx);

  const mockData: MockData = {
    news: paginatedNews,
    currentPage: page,
    totalPages,
    totalItems,
  };

  return mockData;
};

// export const getMockNews = async (page: number) => {
//   // 목업 데이터
//   const mockData = {
//     news: [
//       {
//         newsId: 1,
//         newsTitle: "Breaking News: Major Event Happens",
//         industryId: 101,
//         newsContent: "Details about the major event that has just occurred...",
//         newsPublishedAt: "2024-09-03T14:30:00",
//         newsCompany: "Global News Network",
//         createdAt: "2024-09-03T14:00:00",
//         updatedAt: "2024-09-03T14:00:00",
//         newsUrl: "https://www.moneys.co.kr/article/2024090410545378151",
//         view: 523,
//         scrapCnt: 10,
//         photoUrlList: null,
//       },
//       {
//         newsId: 2,
//         newsTitle: "Another Important News",
//         industryId: 102,
//         newsContent: "This is more information about another news story...",
//         newsPublishedAt: "2024-09-03T15:00:00",
//         newsCompany: "Local News Agency",
//         createdAt: "2024-09-03T14:45:00",
//         updatedAt: "2024-09-03T14:00:00",
//         newsUrl: "https://www.moneys.co.kr/article/2024090410545378151",
//         view: 789,
//         scrapCnt: 12,
//         photoUrlList: [
//           "https://www.moneys.co.kr/article/2024090410545378151",
//           "https://www.moneys.co.kr/article/2024090410545378151",
//         ],
//       },
//     ],
//     currentPage: page,
//     totalPages: 20,
//     totalItems: 200,
//   };

//   return new Promise((resolve) => {
//     setTimeout(() => resolve(mockData), 500); // 백엔드 응답 대기 시간을 시뮬레이션
//   });
// };
