import API from "../apiClient";

// 회원 정보 수정(PUT)
export const updateUserProfileAPI = async (updatedProfile: any) => {
  const response = await API.put('/user/update', updatedProfile);
  return response.data;  // 성공적으로 수정된 사용자 정보
};

// 회원 정보 가져오기(GET)
export const fetchUserProfileAPI = async () => {
  const response = await API.get('/profile');
  return response.data;  // 받아온 사용자 정보
};

// 잔디 정보 정보 가져오기(GET)
export const fetchGrassInfoAPI = async (yearMonth:string) => {
  const response = await API.get(`/profile/grass?ym=${yearMonth}`);
  return response.data.data;  // 받아온 사용자 정보
};


