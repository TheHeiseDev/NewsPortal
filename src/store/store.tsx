import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import postsSlice from "./slice/posts/postsSlice";
import newsfeedSlice from "./slice/newsfeed/newsfeedSlice";
import visitSlice from "./slice/visit/visitSlice";
import emailSlice from "./slice/email/emailSlice";
import deviceInfoSlice from "./slice/deviceInfo/deviceInfoSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    newsfeed: newsfeedSlice,
    visit: visitSlice,
    email: emailSlice,
    deviceInfo: deviceInfoSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
