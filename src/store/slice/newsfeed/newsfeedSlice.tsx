import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

import { fetchFeedPosts } from "./newsfeedThunk";
import { StatusEnum } from "../posts/postsTypes";
import { NewsfeedSliceType } from "./newsfeedTypes";

const initialState: NewsfeedSliceType = {
  items: {
    data: null,
    status: StatusEnum.loading,
    totalPages: 1,
    currentPage: 1,
  },
};
export const newsfeedSlice = createSlice({
  name: "newsfeedSlice",
  initialState,
  reducers: {
    removeFeedItems(state) {
      state.items.data = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedPosts.pending, (state) => {
        state.items.status = StatusEnum.loading;
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        const current_page = action.payload?.meta?.current_page;
        const total_pages = action.payload?.meta?.total_pages;

        state.items.status = StatusEnum.success;
        state.items.totalPages = total_pages ? total_pages : state.items.totalPages;
        state.items.currentPage = current_page ? current_page : state.items.currentPage;

        if (state.items.data !== null) {
          state.items.data = [
            ...new Map(
              [...state.items.data, ...action.payload.items].map((item) => [
                item.id,
                item,
              ])
            ).values(),
          ];
        } else {
          if(action.payload.items) {
            state.items.data = action.payload.items;
          }else {
            state.items.data = action.payload;
          }
         

        }
      })
      .addCase(fetchFeedPosts.rejected, (state) => {
        state.items.status = StatusEnum.error;
        state.items.data = null;
      });
  },
});
export const { removeFeedItems } = newsfeedSlice.actions;
export const selectFeedPosts = (state: RootState) => state.newsfeed.items;
export default newsfeedSlice.reducer;
