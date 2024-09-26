import API from "../apiClient";

// 회원 정보 수정()
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