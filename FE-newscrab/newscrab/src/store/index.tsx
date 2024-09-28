import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginReducer, { watchLoginSaga } from "./user/loginLogout"
import vocaReducer from "./voca/vocaSlice";
import scrapReducer from "./scrap/scrapSlice";
import myPageReducer from './myPage/profileSlice';

// 리듀서 import
// 예시 => import uiSlice from "./ui-slice"
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    // 리듀서 추가
    // 예시 => ui: uiSlice.reducer,
    login: loginReducer,
    voca: vocaReducer,
    mypage: myPageReducer,
    scrap: scrapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), // 기본 미들웨어에 sagaMiddleware 추가
});

sagaMiddleware.run(watchLoginSaga); // 사가 실행

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;