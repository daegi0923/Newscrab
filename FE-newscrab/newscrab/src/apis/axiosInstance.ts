import axios from 'axios';
import { getCookie } from '../store/user/cookies'; // 쿠키에서 accessToken 가져오기

const axiosInstance = axios.create({
  baseURL: 'https://newscrab.duckdns.org/', // 환경 변수로 서버 URL 관리
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정 (accessToken 자동 삽입)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
