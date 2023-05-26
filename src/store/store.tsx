import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import postsSlice from "./slice/postsSlice/postsSlice";
import newsfeedSlice from "./slice/newsfeedSlice/newsfeedSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    newsfeed: newsfeedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
