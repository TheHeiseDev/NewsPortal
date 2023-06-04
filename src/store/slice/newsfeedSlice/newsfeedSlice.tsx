import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

import { fetchFeedMaxPage, fetchFeedPosts } from "./newsfeedThunk";
import { StatusEnum } from "../postsSlice/postsTypes";
import { NewsfeedSliceType } from "./newsfeedTypes";

const initialState: NewsfeedSliceType = {
  items: {
    data: null,
    status: StatusEnum.loading,
    maxPage: 1,
  },
};
export const newsfeedSlice = createSlice({
  name: "fetchFeedPosts",
  initialState,
  reducers: {
    setMaxPage(state, action: PayloadAction<number>) {
      state.items.maxPage = action.payload;
    },
    removeFeedItems(state) {
      state.items.data = null;
      state.items.maxPage = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedMaxPage.pending, (state, action) => {})
      .addCase(fetchFeedMaxPage.fulfilled, (state, action) => {
        state.items.maxPage = Math.ceil(action.payload / 5) as number;
      })
      .addCase(fetchFeedMaxPage.rejected, (state) => {
        state.items.maxPage = 1;
      })
      .addCase(fetchFeedPosts.pending, (state) => {
        state.items.status = StatusEnum.loading;
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.items.status = StatusEnum.success;

        if (state.items.data !== null) {
          state.items.data = [
            ...new Map(
              [...state.items.data, ...action.payload].map((item) => [item.id, item])
            ).values(),
          ];
        } else {
          state.items.data = action.payload;
        }
      })
      .addCase(fetchFeedPosts.rejected, (state) => {
        state.items.status = StatusEnum.error;
        state.items.data = null;
      });
  },
});
export const { removeFeedItems, setMaxPage } = newsfeedSlice.actions;
export const selectFeedPosts = (state: RootState) => state.newsfeed.items;
export default newsfeedSlice.reducer;
