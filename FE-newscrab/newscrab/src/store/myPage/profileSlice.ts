import { createAsyncThunk, createSlice  } from '@reduxjs/toolkit';
import { updateUserProfileAPI, fetchUserProfileAPI } from "../../apis/user/user";  // API 경로 맞추기

// 사용자 프로필 가져오기
export const fetchUserProfileThunk = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserProfileAPI();
      return response;  // 성공적으로 사용자 정보를 받아오면 반환
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "프로필 정보를 가져오는 데 실패했습니다.");
    }
  }
);

// 사용자 프로필 수정하기
export const updateUserProfileThunk = createAsyncThunk(
  "profile/updateUserProfile",
  async (updatedProfile: any, { rejectWithValue }) => {
    try {
      const response = await updateUserProfileAPI(updatedProfile);
      return response;  // 성공적으로 사용자 정보를 수정하면 반환
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "프로필 정보를 수정하는 데 실패했습니다.");
    }
  }
);

// 선호 산업 수정하기
// export const updateUserIndustryThunk = createAsyncThunk(
//   "profile/updateUserIndustry",
//   async (updatedIndustry: any, { rejectWithValue }) => {
//     try {
//       const response = await updateUserIndustryAPI(updatedIndustry);
//       return response;  // 성공적으로 사용자 산업을 수정하면 반환
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "선호 산업을 수정하는 데 실패했습니다.");
//     }
//   }
// );

// 초기 상태 정의
const initialState = {
  userInfo: {
    name: "",
    email: "",
    birthday: "",
    gender: "",
    profileImage: "",
  },
  loading: false,
  error: null as string | null,
};

// Slice 정의
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 프로필 가져오기
    builder
      .addCase(fetchUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : "프로필 정보를 가져오는 데 실패했습니다.";
      });
      
    // 프로필 수정하기
    builder
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };  // 성공적으로 수정된 부분만 덮어씌움
        state.loading = false;
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : "프로필 정보를 수정하는 데 실패했습니다.";
      });
  },
});

export default profileSlice.reducer;