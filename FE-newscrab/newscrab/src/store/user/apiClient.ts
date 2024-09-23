import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "./cookies"; // 쿠키 관리 유틸리티
import { store } from "../index"; // store에서 redux 액션을 불러오기 위해 필요
import { loginSuccess, logout } from "./loginLogout"; // Redux 액션

// Axios 인스턴스 생성
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// 요청 시 액세스 토큰 추가 인터셉터
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      // headers를 명확하게 설정
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답에서 액세스 토큰 만료 처리 인터셉터
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getCookie("refreshToken");

    if (error.response?.status === 401 && error.response.data?.message === "Token is expired" && refreshToken) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/token/refresh`, null, {
          headers: { Authorization: `Bearer ${refreshToken}` },
          withCredentials: true,
        });

        const newAccessToken = res.data.accessToken;
        setCookie("accessToken", newAccessToken);

        // Redux 상태 업데이트
        store.dispatch(loginSuccess({ accessToken: newAccessToken, refreshToken }));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest); // 원래의 요청을 다시 실행
      } catch (refreshError) {
        store.dispatch(logout()); // 리프레시 토큰도 만료되면 로그아웃
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
