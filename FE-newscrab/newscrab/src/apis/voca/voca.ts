import API from "../apiClient";

// Voca 리스트 가져오기 (GET 요청)
export const fetchVocaList = async () => {
  try {
    const response = await API.get("/voca");
    return response.data; // 성공적으로 데이터를 가져왔을 경우
  } catch (error) {
    console.error("Voca 리스트 가져오기 실패:", error);
    console.log(error);
    throw error;
  }
};
// {
// 	totalItems : int,  // 총 단어 개수
// 	data: List<VocaResponseDto>
// }

// 특정 Voca 단어 가져오기 (GET 요청)
export const fetchVocaDetail = async (vocaId: number) => {
  try {
    const response = await API.get(`/voca/${vocaId}`);
    return response.data; // 성공적으로 데이터를 가져왔을 경우
  } catch (error) {
    console.error(`Voca ID ${vocaId} 가져오기 실패:`, error);
    throw error;
  }
};

// {
// 	vocaId: Int,
// 	industryId: int,
// 	vacaName: String,
// 	vocaDesc: String,
// 	originNewsId: int,
// 	sentence: String,
// 	createdAt: LocalDateTime,
// 	updatedAt: LocalDateTime,
// 	related_news_id1: int, 
// 	related_news_id2: int,
// 	related_news_id2: int,
// }

// 새로운 Voca 추가하기 (POST 요청)
export const addVoca = async (vocaId: number) => {
  try {
    const response = await API.post(`/voca/${vocaId}`);
    return response.data; // 성공적으로 추가한 경우
  } catch (error) {
    console.error("Voca 추가 실패:", error);
    throw error;
  }
};

// Voca 삭제
export const deleteVoca = async (vocaId: number) => {
  try {
    const response = await API.delete(`/voca/${vocaId}`);
    return response.data; // 성공적으로 추가한 경우
  } catch (error) {
    console.error("Voca 추가 실패:", error);
    throw error;
  }
};