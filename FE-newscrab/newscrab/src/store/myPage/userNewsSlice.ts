import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserViewNews } from "@apis/user/userNews";

// 최근 본 뉴스 가져오기
export const fetchUserViewNewsThunk = createAsyncThunk(
  "userNews/fetchUserViewNews",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetchUserViewNews(page); // API 호출
      return response.data; // 성공적으로 받아온 데이터를 반환
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "최근 본 뉴스를 가져오는 데 실패했습니다.");
    }
  }
);

interface NewsResponseDto {
  newsId: number;
  newsTitle: string;
  industryId: number;
  newsContent: string;
  newsPublishedAt: string;
  newsCompany: string;
  createdAt: string;
  updatedAt: string;
  newsUrl: string;
  view: number;
  scrapCnt: number;
  photoUrlList: string[];
}

interface UserNewsState {
  newsList: NewsResponseDto[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserNewsState = {
  newsList: [], // 빈 배열로 초기화
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  loading: false,
  error: null,
};

// Slice 정의
const userNewsSlice = createSlice({
  name: "userNews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserViewNewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserViewNewsThunk.fulfilled, (state, action) => {
        // console.log("뉴스 응답 Data: ", action.payload);
        state.newsList = [...state.newsList,...action.payload.news]; // response에서 news 배열 가져오기
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(fetchUserViewNewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "최근 본 뉴스를 가져오는 데 실패했습니다.";
      });
  },
});

export default userNewsSlice.reducer;
