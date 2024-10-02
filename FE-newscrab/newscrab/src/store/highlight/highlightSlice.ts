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
    updateHighlight: (
      state,
      action: PayloadAction<{ startPos: number; endPos: number; color: string }>
    ) => {
      const existingHighlight = state.highlights.find(
        (highlight) =>
          highlight.startPos === action.payload.startPos &&
          highlight.endPos === action.payload.endPos
      );
      if (existingHighlight) {
        existingHighlight.color = action.payload.color; // 색상 업데이트
      }
    },
    clearHighlights(state) {
        state.highlights = []; // 모든 형광펜 데이터를 초기화
    },
  },
});

export const { addHighlight, removeHighlight, updateHighlight, clearHighlights } = highlightSlice.actions;
export default highlightSlice.reducer;
