import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getScrapData } from "../../apis/scrap/scrapApi"; // 비동기 함수들 가져오기

//스크랩 리스트 가져오는 비동기 함수
export const fetchScrapListThunk = createAsyncThunk(
  "voca/fetchScrapData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getScrapData();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Scrap 리스트 가져오기 실패");
    }
  }
);


interface ScrapState {
  scrapList: any[]; // API 응답에 따라 정확한 타입 지정 가능
  loading: boolean;
  error: string | null;
}

const initialState: ScrapState = {
  scrapList: [],
  loading: false,
  error: null,
};

// Redux slice 정의
const scrapSlice = createSlice({
  name: "scrap",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Voca 리스트 가져오기 비동기 로직 처리
    builder
      .addCase(fetchScrapListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScrapListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.scrapList = action.payload.data;
        // state.vocaList = action.payload;
      })
      .addCase(fetchScrapListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "scrap 리스트 가져오기에 실패했습니다."; // action.error.message 사용
      });
  },
});

export default scrapSlice.reducer;
