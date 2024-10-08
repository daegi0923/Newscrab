import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVocaList, fetchVocaDetail, addVoca, deleteVoca, updateVoca } from "../../apis/voca/voca"; // 비동기 함수들 가져오기

// Voca 리스트 가져오기 비동기 함수
export const fetchVocaListThunk = createAsyncThunk(
  "voca/fetchVocaList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchVocaList();
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

// Voca 추가 비동기 함수 (배열 형태로 vocaAddList 받기)
export const addVocaThunk = createAsyncThunk<
  any, // 성공 시 반환 타입
  { vocaAddList: { newsId: number; vocaName: string; vocaDesc: string; industryId: number }[] }, // 인자 타입
  { rejectValue: string } // 실패 시 반환할 값의 타입을 명시적으로 지정
>(
  "voca/addVoca",
  async (vocaAddList, { rejectWithValue }) => {
    try {
      const response = await addVoca(vocaAddList); // vocaAddList를 배열로 전달
      return response.data;
    } catch (error: any) {
      // 오류 발생 시 rejectWithValue로 문자열을 반환
      return rejectWithValue(error.response?.data || "뉴스에 있는 단어를 입력해주세요🦀");
    }
  }
);

// Voca 수정 비동기 함수
export const updateVocaThunk = createAsyncThunk(
  "voca/updateVoca",
  async ({ vocaId, updatedData }: { vocaId: number; updatedData: any }, { rejectWithValue }) => {
    try {
      const response = await updateVoca(vocaId, updatedData);
      return { vocaId, updatedData: response };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Voca 수정 실패");
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
        // 기존 단어 리스트에 새로 추가된 단어들을 결합
        // state.vocaList = [...state.vocaList, ...action.payload];
      })
      .addCase(addVocaThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Voca 추가에 실패했습니다.";
      });

    builder
      .addCase(updateVocaThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVocaThunk.fulfilled, (state, action) => {
        state.loading = false;
        // vocaList에서 해당 vocaId를 찾아 수정
        const index = state.vocaList.findIndex((voca) => voca && voca.id === action.payload.vocaId);
        if (index !== -1) {
          state.vocaList[index] = { ...state.vocaList[index], ...action.payload.updatedData };
    }
      })
      .addCase(updateVocaThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Voca 수정에 실패했습니다.";
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
