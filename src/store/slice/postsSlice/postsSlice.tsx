import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../store";
import { PostsSliceType, StatusEnum } from "./postsTypes";
import { fetchPostById, fetchPosts } from "./postsThunk";
import { RootState } from "../../store";

const initialState: PostsSliceType = {
  items: {
    data: null,
    status: StatusEnum.loading,
  },
  item: {
    data: null,
    status: StatusEnum.loading,
  },
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    removeItem(state, action) {
      state.item.data = null;
      state.item.status = StatusEnum.loading;
    },
  },

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
      })

      .addCase(fetchPostById.pending, (state) => {
        state.items.status = StatusEnum.loading;
        state.items.data = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.item.status = StatusEnum.success;
        state.item.data = action.payload;
      })
      .addCase(fetchPostById.rejected, (state) => {
        state.item.status = StatusEnum.error;
        state.item.data = null;
      });
  },
});
export const { removeItem } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts.items;
export const selectPost = (state: RootState) => state.posts.item.data;
export const selectPostStatus = (state: RootState) => state.posts.item.status;
export default postsSlice.reducer;
