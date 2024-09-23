import { call, put, takeLatest } from "redux-saga/effects"; // 이 부분은 항상 불러올 수 있습니다.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { removeCookie } from "./cookies";

// 초기 상태 정의
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLogin: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isLogin: false,
  loading: false,
  error: null,
};

// Redux slice 정의
const loginSlice = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {
    loginLoading: (state, _action: PayloadAction<{ loginId: string; password: string }>) => {
      state.loading = true;
      state.isLogin = false;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.loading = false;
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isLogin = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLogin = false;
    },
  },
});

export const { loginLoading, loginSuccess, loginFail, logout } = loginSlice.actions;
export default loginSlice.reducer;

// 로그인 사가
function* loginSaga(action: PayloadAction<{ loginId: string; password: string }>): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, "https://newscrab.duckdns.org/api/v1/user/login", {
      loginId: action.payload.loginId,
      password: action.payload.password,
    });

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    // 성공 시 Redux에 저장
    yield put(loginSuccess({ accessToken, refreshToken }));

    // 쿠키에 토큰 저장 (필요할 경우)
    document.cookie = `accessToken=${accessToken}; path=/`;
    document.cookie = `refreshToken=${refreshToken}; path=/`;

    // 메인 페이지로 이동
    window.location.href = "/mainNews";
  } catch (error: any) {
    console.log(error);
    yield put(loginFail("로그인에 실패했습니다."));
  }
}

// 로그아웃 사가 추가
function* logoutSaga(): Generator<any, void, any> {
  try {
    // 로그아웃 API 호출
    yield call(axios.post, "https://newscrab.duckdns.org/api/v1/user/logout");

    // 쿠키에서 토큰 삭제
    removeCookie("accessToken");
    removeCookie("refreshToken");

    // Redux 상태 초기화
    yield put(logout());

    // 로그아웃 후 로그인 페이지로 리다이렉션
    window.location.href = "/login";
  } catch (error: any) {
    console.error("로그아웃에 실패했습니다.", error);
  }
}

// 사가 Watcher
export function* watchLoginSaga() {
  yield takeLatest(loginLoading.type, loginSaga);
  yield takeLatest(logout.type, logoutSaga); // 로그아웃 액션 발생 시 실행
}
