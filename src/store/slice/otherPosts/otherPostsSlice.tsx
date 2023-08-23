import { createSlice } from "@reduxjs/toolkit";
import { OtherPostsSlice, StatusEnum } from "./otherPostsTypes";
import { RootState } from "../../store";
import { fetchOtherPosts } from "./otherPostsThunk";

const initialState: OtherPostsSlice = {
    data: null,
    status: StatusEnum.loading,
};
export const otherPostsSlice = createSlice({
  name: "otherPosts",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherPosts.pending, (state) => {
        state.status = StatusEnum.loading;
        state.data = null;
      })
      .addCase(fetchOtherPosts.fulfilled, (state, action) => {
        state.status = StatusEnum.success;
        state.data = action.payload;
      })
      .addCase(fetchOtherPosts.rejected, (state) => {
        state.status = StatusEnum.error;
        state.data = null;
      })


  },
});
export const {  } = otherPostsSlice.actions;
export const selectOtherPosts = (state: RootState) => state.otherPosts;

export default otherPostsSlice.reducer;
