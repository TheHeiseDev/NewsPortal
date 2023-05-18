import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../store";
import { PostsSliceType, StatusEnum } from "./postsTypes";
import { fetchPosts } from "./postsThunk";
import { RootState } from "store/store";

const initialState: PostsSliceType = {
  items: {
    data: null,
    status: StatusEnum.loading,
  },
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.items.status = StatusEnum.loading;
        state.items.data = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items.status = StatusEnum.success;
        state.items.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.items.status = StatusEnum.error;
        state.items.data = null;
      });
  },
});
// export const {} = furnitureSlice.actions;
export const selectPosts = (state: RootState) => state.posts.items;
export default postsSlice.reducer;
