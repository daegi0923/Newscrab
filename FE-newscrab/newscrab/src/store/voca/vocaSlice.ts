import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosInstance";

// Voca 리스트 가져오기 비동기 함수
export const fetchVocaList = createAsyncThunk(
  "voca/fetchVocaList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/voca");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 특정 Voca 단어 가져오기 비동기 함수
export const fetchVocaDetail = createAsyncThunk(
  "voca/fetchVocaDetail",
  async (vocaId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/voca/${vocaId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 초기 상태 정의
interface VocaState {
  vocaList: any[]; // Voca 리스트
  selectedVoca: any | null; // 선택된 Voca 단어 정보
  loading: boolean;
  error: string | null;
}

const initialState: VocaState = {
  vocaList: [],
  selectedVoca: null,
  loading: false,
  error: null,
};

// Redux slice 정의
const vocaSlice = createSlice({
  name: "voca",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchVocaList 비동기 로직 처리
    builder
      .addCase(fetchVocaList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocaList.fulfilled, (state, action) => {
        state.loading = false;
        state.vocaList = action.payload;
      })
      .addCase(fetchVocaList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchVocaDetail 비동기 로직 처리
    builder
      .addCase(fetchVocaDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocaDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVoca = action.payload;
      })
      .addCase(fetchVocaDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default vocaSlice.reducer;
