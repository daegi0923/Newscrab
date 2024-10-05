// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchUserViewNews, fetchUserLikeNews } from "@apis/user/userNews";

// // 최근 본 뉴스 가져오기
// export const fetchUserViewNewsThunk = createAsyncThunk(
//   "userNews/fetchUserViewNews",
//   async (page: number, { rejectWithValue }) => {
//     try {
//       const response = await fetchUserViewNews(page); // API 호출
//       return response.data; // 성공적으로 받아온 데이터를 반환
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "최근 본 뉴스를 가져오는 데 실패했습니다.");
//     }
//   }
// );

// // 찜한 뉴스 가져오기
// export const fetchUserLikeNewsThunk = createAsyncThunk(
//   "userNews/fetchUserLikeNews",
//   async (page: number, { rejectWithValue }) => {
//     try {
//       const response = await fetchUserLikeNews(page); // API 호출
//       return response.data; // response.data에는 news, currentPage, totalPages, totalItems가 포함됨
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "찜 뉴스를 가져오는 데 실패했습니다.");
//     }
//   }
// );

// interface NewsResponseDto {
//   newsId: number;
//   newsTitle: string;
//   industryId: number;
//   newsContent: string;
//   newsPublishedAt: string;
//   newsCompany: string;
//   createdAt: string;
//   updatedAt: string;
//   newsUrl: string;
//   view: number;
//   scrapCnt: number;
//   photoUrlList: string[];
// }

// interface UserNewsState {
//   newsList: NewsResponseDto[];
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserNewsState = {
//   newsList: [], // 빈 배열로 초기화
//   currentPage: 1,
//   totalPages: 0,
//   totalItems: 0,
//   loading: false,
//   error: null,
// };

// // Slice 정의
// const userNewsSlice = createSlice({
//   name: "userNews",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserViewNewsThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserViewNewsThunk.fulfilled, (state, action) => {
//         // console.log("뉴스 응답 Data: ", action.payload);
//         state.newsList = [...state.newsList,...action.payload.news]; // response에서 news 배열 가져오기
//         state.currentPage = action.payload.currentPage;
//         state.totalPages = action.payload.totalPages;
//         state.totalItems = action.payload.totalItems;
//         state.loading = false;
//       })
//       .addCase(fetchUserViewNewsThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = typeof action.payload === "string" ? action.payload : "최근 본 뉴스를 가져오는 데 실패했습니다.";
//       })
//       // 찜한 뉴스 로드
//       .addCase(fetchUserLikeNewsThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserLikeNewsThunk.fulfilled, (state, action) => {
//         // action.payload에서 news, currentPage, totalPages, totalItems 가져오기
//         const { news, currentPage, totalPages, totalItems } = action.payload;
//         state.newsList = [...state.newsList, ...news]; // 기존 newsList에 찜한 뉴스 추가
//         state.currentPage = currentPage;
//         state.totalPages = totalPages;
//         state.totalItems = totalItems;
//         state.loading = false;
//       })
//       .addCase(fetchUserLikeNewsThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = typeof action.payload === "string" ? action.payload : "찜 뉴스를 가져오는 데 실패했습니다.";
//       });
//   },
// });

// export default userNewsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserViewNews, fetchUserLikeNews } from "@apis/user/userNews";

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

// 찜한 뉴스 가져오기
export const fetchUserLikeNewsThunk = createAsyncThunk(
  "userNews/fetchUserLikeNews",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetchUserLikeNews(page); // API 호출
      return response.data; // 성공적으로 받아온 데이터를 반환
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "찜 뉴스를 가져오는 데 실패했습니다.");
    }
  }
);

interface NewsResponseDto {
  newsId: number;
  newsTitle: string;
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
  recentNewsList: NewsResponseDto[]; // 최근 본 뉴스 리스트
  likedNewsList: NewsResponseDto[]; // 찜한 뉴스 리스트
  recentCurrentPage: number;
  likedCurrentPage: number;
  recentTotalPages: number;
  likedTotalPages: number;
  recentTotalItems: number;
  likedTotalItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserNewsState = {
  recentNewsList: [], // 빈 배열로 초기화
  likedNewsList: [],
  recentCurrentPage: 1,
  likedCurrentPage: 1,
  recentTotalPages: 0,
  likedTotalPages: 0,
  recentTotalItems: 0,
  likedTotalItems: 0,
  loading: false,
  error: null,
};

const userNewsSlice = createSlice({
  name: "userNews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 최근 본 뉴스 처리
      .addCase(fetchUserViewNewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserViewNewsThunk.fulfilled, (state, action) => {
        state.recentNewsList = [...state.recentNewsList, ...action.payload.news];
        state.recentCurrentPage = action.payload.currentPage;
        state.recentTotalPages = action.payload.totalPages;
        state.recentTotalItems = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(fetchUserViewNewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "최근 본 뉴스를 가져오는 데 실패했습니다.";
      })
      // 찜한 뉴스 처리
      .addCase(fetchUserLikeNewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLikeNewsThunk.fulfilled, (state, action) => {
        state.likedNewsList = [...state.likedNewsList, ...action.payload.news];
        state.likedCurrentPage = action.payload.currentPage;
        state.likedTotalPages = action.payload.totalPages;
        state.likedTotalItems = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(fetchUserLikeNewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "찜한 뉴스를 가져오는 데 실패했습니다.";
      });
  },
});

export default userNewsSlice.reducer;
