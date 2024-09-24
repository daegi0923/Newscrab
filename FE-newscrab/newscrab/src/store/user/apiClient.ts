import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "./cookies";
import { store } from "../index"; 
import { loginSuccess, logout } from "./loginLogout"; 

// Axios 인스턴스 생성
const API = axios.create({
  baseURL: 'https://newscrab.duckdns.org/api/v1/',
  withCredentials: true,
});

// 요청 인터셉터: 모든 요청 전에 액세스 토큰을 헤더에 추가
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie("accessToken"); 
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 새로운 액세스 토큰이 헤더에 있는지 확인하고 갱신
API.interceptors.response.use(
  (response: AxiosResponse) => {
    const newAccessToken = response.headers['authorization']?.substring(7); // 'Bearer ' 이후의 토큰 추출
    if (newAccessToken) {
      setCookie("accessToken", newAccessToken);

      // Redux 상태 업데이트
      store.dispatch(loginSuccess({ accessToken: newAccessToken }));
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout()); // 리프레시 토큰도 만료되면 로그아웃
    }
    return Promise.reject(error);
  }
);

export default API;