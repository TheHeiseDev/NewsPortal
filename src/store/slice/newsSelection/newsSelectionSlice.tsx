import { createSlice } from "@reduxjs/toolkit";
import { NewsSelectionSliceType, StatusEnum } from "./newsSelectionTypes";
import { RootState } from "../../store";
import { fetchNewsSelection } from "./newsSelectionThunk";

const initialState: NewsSelectionSliceType = {
  data: null,
  status: StatusEnum.loading,
};
export const newsSelectionSlice = createSlice({
  name: "newsSelectionSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsSelection.pending, (state) => {
        state.status = StatusEnum.loading;
        state.data = null;
      })
      .addCase(fetchNewsSelection.fulfilled, (state, action) => {
        state.status = StatusEnum.success;
        state.data = action.payload;
      })
      .addCase(fetchNewsSelection.rejected, (state) => {
        state.status = StatusEnum.error;
        state.data = null;
      });
  },
});
// export const {  } = newsSelectionSlice.actions;
export const selectNewsSelectionData = (state: RootState) => state.newsSelection.data;
export const selectNewsSelectionStatus = (state: RootState) => state.newsSelection.status;
export default newsSelectionSlice.reducer;
