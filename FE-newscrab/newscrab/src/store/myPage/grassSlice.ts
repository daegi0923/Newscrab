import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGrassInfoAPI } from "../../apis/user/user";  // API 경로 맞추기



interface GrassInfo {
  date: string;
  count: number;
}

// grass 정보를 월별로 가져오기
export const fetchGrassInfoThunk = createAsyncThunk(
  "grass/fetchGrassInfo",
  async (yearMonth: string, { rejectWithValue }) => {
    try {
      const response = await fetchGrassInfoAPI(yearMonth) as { data: GrassInfo[]};  // API 호출
      const activityInfo: Record<string, number> = {};
      response.data.forEach((e) => {
        console.log(e)
        activityInfo[parseInt(e.date.split('-')[2], 10)] = e.count;
      })
      return { yearMonth, data: activityInfo };  // yyyy-mm을 key로 설정
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Grass 정보를 가져오는 데 실패했습니다.");
    }
  }
);

// 초기 상태 정의
const initialState = {
  grassInfo: {} as Record<string, any>,  // yyyy-mm을 key로 한 grass 정보 관리
  loading: false,
  error: null as string | null,
};

// Slice 정의
const grassSlice = createSlice({
  name: "grass",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // grass 정보 가져오기
    builder
      .addCase(fetchGrassInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrassInfoThunk.fulfilled, (state, action) => {
        state.grassInfo[action.payload.yearMonth] = action.payload.data;  // 월별로 grass 정보 저장
        state.loading = false;
      })
      .addCase(fetchGrassInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : "Grass 정보를 가져오는 데 실패했습니다.";
      });
  },
});

export default grassSlice.reducer;
