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

interface VocaData {
  newsId: number;
  vocaName: string;
  vocaDesc: string;
  industryId: number;
}

// 새로운 Voca 추가하기 (POST 요청)
export const addVoca = async (vocaAddList: { vocaAddList: VocaData[] }) => {
  try {
    const response = await API.post('/voca', vocaAddList); // vocaAddList를 API에 전달
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

// Voca 단어 수정 (PUT 요청)
export const updateVoca = async (vocaId: number, updatedData: any) => {
  try {
    const response = await API.put(`/voca/${vocaId}`, updatedData);
    return response.data; // 성공적으로 수정한 경우
  } catch (error) {
    console.error(`Voca ID ${vocaId} 수정 실패:`, error);
    throw error;
  }
};