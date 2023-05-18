import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import postsSlice from "./slice/postsSlice/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
