import API from "../apiClient";

// 회원 정보 수정(PUT)
export const fetchVocaList = async () => {
  try {
    const response = await API.put("/update");
    return response.data; // 성공적으로 데이터를 가져왔을 경우
  } catch (error) {
    console.error("회원 정보 변경 실패:", error);
    console.log(error);
    throw error;
  }
};