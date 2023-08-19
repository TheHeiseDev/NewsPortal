import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommentsType, LikesType, PostsSliceType, StatusEnum } from "./postsTypes";
import { fetchPages, fetchPostById, fetchPosts } from "./postsThunk";
import { RootState } from "../../store";

const initialState: PostsSliceType = {
  items: {
    data: null,
    status: StatusEnum.loading,
    pages: null,
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
    likedPost(state, action) {
      if (state.item.data) {
        state.item.data.likes.push(action.payload);
      }
    },
    deleteLikePost(state, action) {
      if (state.item.data) {
        state.item.data.likes = state.item.data.likes.filter(
          (like: LikesType) => like.ip !== action.payload
        );
      }
    },
    removeItem(state) {
      state.item.data = null;
      state.item.status = StatusEnum.loading;
    },
    addComment(state, action: PayloadAction<CommentsType>) {
      if (state.item.data) {
        state.item.data.comments.push(action.payload);
      }
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
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.items.pages = action.payload;
      });
  },
});
export const { removeItem, addComment, likedPost, deleteLikePost } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts.items;
export const selectPost = (state: RootState) => state.posts.item.data;
export const selectPostStatus = (state: RootState) => state.posts.item.status;
export default postsSlice.reducer;
