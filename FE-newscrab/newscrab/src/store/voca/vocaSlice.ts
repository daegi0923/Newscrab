import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVocaList, fetchVocaDetail, addVoca, deleteVoca } from "../../apis/voca/voca"; // 비동기 함수들 가져오기

// Voca 리스트 가져오기 비동기 함수
export const fetchVocaListThunk = createAsyncThunk(
  "voca/fetchVocaList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchVocaList();
      // return response;
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Voca 리스트 가져오기 실패");
    }
  }
);

// 특정 Voca 단어 가져오기 비동기 함수
export const fetchVocaDetailThunk = createAsyncThunk(
  "voca/fetchVocaDetail",
  async (vocaId: number, { rejectWithValue }) => {
    try {
      const response = await fetchVocaDetail(vocaId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || `Voca ID ${vocaId} 가져오기 실패`);
    }
  }
);

// Voca 추가 비동기 함수
export const addVocaThunk = createAsyncThunk(
  "voca/addVoca",
  async (vocaId: number, { rejectWithValue }) => {
    try {
      const response = await addVoca(vocaId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Voca 추가 실패");
    }
  }
);

// Voca 삭제 비동기 함수
export const deleteVocaThunk = createAsyncThunk(
  "voca/deleteVoca",
  async (vocaId: number, { rejectWithValue }) => {
    try {
      const response = await deleteVoca(vocaId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Voca 삭제 실패");
    }
  }
);

interface VocaState {
  vocaList: any[]; // API 응답에 따라 정확한 타입 지정 가능
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
    // Voca 리스트 가져오기 비동기 로직 처리
    builder
      .addCase(fetchVocaListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocaListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.vocaList = action.payload.data;
        // state.vocaList = action.payload;
      })
      .addCase(fetchVocaListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Voca 리스트 가져오기에 실패했습니다."; // action.error.message 사용
      });

    builder
      .addCase(fetchVocaDetailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocaDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVoca = action.payload;
      })
      .addCase(fetchVocaDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || `Voca ID ${action.meta.arg} 가져오기에 실패했습니다.`; // action.meta.arg로 vocaId 확인 가능
      });

    builder
      .addCase(addVocaThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVocaThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.vocaList.push(action.payload);
      })
      .addCase(addVocaThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Voca 추가에 실패했습니다."; // action.error.message 사용
      });

    builder
      .addCase(deleteVocaThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVocaThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.vocaList = state.vocaList.filter(voca => voca.vocaId !== action.payload.vocaId);
      })
      .addCase(deleteVocaThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Voca 삭제에 실패했습니다."; // action.error.message 사용
      });
  },
});

export default vocaSlice.reducer;
