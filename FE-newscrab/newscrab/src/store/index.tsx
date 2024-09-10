import { configureStore } from "@reduxjs/toolkit";

// 리듀서 import
// 예시 => import uiSlice from "./ui-slice"

export const store = configureStore({
  reducer: {
    // 리듀서 추가
    // 예시 => ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
