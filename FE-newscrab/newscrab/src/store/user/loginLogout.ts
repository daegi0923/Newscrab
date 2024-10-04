import { call, put, takeLatest } from "redux-saga/effects"; // 이 부분은 항상 불러올 수 있습니다.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from 'sweetalert2';
import { setCookie, removeCookie } from "./cookies";

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
    loginSuccess: (state, action: PayloadAction<{ accessToken: string;}>) => {
      state.loading = false;
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
      state.error = null;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isLogin = false;
      state.error = action.payload;
    },
    logout: (state) => {
      // 쿠키에서 accessToken 삭제
      removeCookie("accessToken", { path: "/" });
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

    // console.log("Full Response:", response);
    console.log("Full Response:", response);

    const accessToken = response.headers.authorization.substring(7);
    // console.log("Access Token:", response.headers.authorization);
    
    // 쿠키에 토큰 저장
    setCookie("accessToken", accessToken, { path: "/" });

    // 콘솔에 로그인 성공 메시지 출력
    console.log("로그인 완료: ", { accessToken });

    // 메인 페이지로 이동
      window.location.href = "/mainNews";
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '로그인 오류',
          text: '아이디 또는 비밀번호가 잘못되었습니다. 다시 시도하세요.',
        });
      }
    console.log(error);
    yield put(loginFail("로그인에 실패했습니다."));
  }
}

// 사가 Watcher
export function* watchLoginSaga() {
  yield takeLatest(loginLoading.type, loginSaga);
  // yield takeLatest(logout.type, logoutSaga); // 로그아웃 액션 발생 시 실행
}
