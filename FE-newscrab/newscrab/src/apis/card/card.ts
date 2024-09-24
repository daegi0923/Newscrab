import axiosInstance from '../axiosInstance';

// Voca 목록 가져오기
export const fetchVocaList = async () => {
  const response = await axiosInstance.get(`/api/v1/voca`);
  return response.data; // VocaListResponseDto
};

// 특정 Voca 단어 정보 가져오기
export const fetchVocaDetail = async (vocaId: number) => {
  const response = await axiosInstance.get(`/api/v1/voca/${vocaId}`);
  return response.data; // VocaResponseDto
};
