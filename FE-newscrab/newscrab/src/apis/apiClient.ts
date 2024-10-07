import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "../store/user/cookies";
import { store } from "../store/index";
import { loginSuccess } from "../store/user/loginLogout";

// JWT를 디코딩하여 만료 시간을 반환하는 함수
const decodeToken = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
};

// 토큰이 만료됐는지 확인하는 함수
const isTokenExpired = (token: string, bufferTime = 120) => {
  const decoded = decodeToken(token);
  if (!decoded.exp) {
    throw new Error("토큰에 만료 시간이 포함되어 있지 않습니다.");
  }
  const currentTime = Math.floor(Date.now() / 1000); // 초 단위
  return currentTime > (decoded.exp - bufferTime);
};

// Axios 인스턴스 생성
const API = axios.create({
  baseURL: "https://newscrab.duckdns.org/api/v1/",
  withCredentials: true,
});

// 요청 인터셉터: 모든 요청 전에 액세스 토큰을 헤더에 추가
API.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // eslint-disable-next-line prefer-const
    let accessToken = getCookie("accessToken");

    // 액세스 토큰이 만료되었는지 확인
    if (accessToken && isTokenExpired(accessToken)) {
      console.log("토큰이 만료되었습니다. 새로운 토큰을 대기 중입니다...");
    }

    // 만료되지 않은 액세스 토큰을 헤더에 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 새로운 액세스 토큰이 헤더에 있는지 확인하고 갱신
API.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(response)
    const newAccessToken = response.headers['authorization']?.substring(7); // 'Bearer ' 이후의 토큰 추출
    if (newAccessToken) {
      setCookie("accessToken", newAccessToken);

      // Redux 상태 업데이트
      store.dispatch(loginSuccess({ accessToken: newAccessToken }));
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log("401 또는 403 오류 발생. 새로운 액세스 토큰을 확인 중입니다...");
      console.log(error)

      const newAccessToken =
        error.response.headers["authorization"]?.substring(7);
      if (newAccessToken) {
        setCookie("accessToken", newAccessToken);
        store.dispatch(loginSuccess({ accessToken: newAccessToken }));

        // 실패한 요청을 새로운 액세스 토큰으로 다시 시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } else {
        // 새로운 액세스 토큰이 없으면 리프레시 토큰도 만료된 것으로 간주, 로그아웃
        // store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default API;
