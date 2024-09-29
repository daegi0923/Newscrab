import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HighlightState {
  highlights: Array<{ startPos: number; endPos: number; color: string }>;
}

const initialState: HighlightState = {
  highlights: [],
};

const highlightSlice = createSlice({
  name: "highlight",
  initialState,
  reducers: {
    addHighlight: (
      state,
      action: PayloadAction<{ startPos: number; endPos: number; color: string }>
    ) => {
      state.highlights.push(action.payload);
    },
    removeHighlight: (
      state,
      action: PayloadAction<{ startPos: number; endPos: number }>
    ) => {
      state.highlights = state.highlights.filter(
        (highlight) =>
          highlight.startPos !== action.payload.startPos ||
          highlight.endPos !== action.payload.endPos
      );
    },
    clearHighlights(state) {
        state.highlights = []; // 모든 형광펜 데이터를 초기화
    },
  },
});

export const { addHighlight, removeHighlight, clearHighlights } = highlightSlice.actions;
export default highlightSlice.reducer;
