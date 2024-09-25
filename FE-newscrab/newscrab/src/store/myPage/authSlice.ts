import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 사용자 정보를 받아오는 비동기 함수 (Thunk)
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];

      const response = await axios.get('https://newscrab.duckdns.org/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;  // 받아온 사용자 정보
    } catch (error: any) {
      return rejectWithValue('프로필 정보를 가져오는 데 실패했습니다.');
    }
  }
);

// 초기 상태 정의
const initialState = {
  userInfo: {
  //   user_id : String,
	// name : String,
	// email : String,
	// birthday : Date,
	// gender : enum,
	// createdAt : Date,
	// newsLikeCount : Int,
	// scrapCount : int,
	// vocaCount : int
  },
  loading: false,
  error: null,
};

// Slice 정의
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      // .addCase(fetchUserProfile.rejected, (state, action) => {
      .addCase(fetchUserProfile.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
