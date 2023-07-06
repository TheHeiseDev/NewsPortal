import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchAddSubscriber } from "./emailThunk";
import { EmailInitial } from "./emailTypes";
import { StatusEnum } from "../posts/postsTypes";

const initialState: EmailInitial = {
  email: null,
  status: StatusEnum.success,
};
export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddSubscriber.pending, (state) => {
        state.status = StatusEnum.loading;
      })
      .addCase(fetchAddSubscriber.fulfilled, (state, action) => {
        state.status = StatusEnum.success;
      })
      .addCase(fetchAddSubscriber.rejected, (state) => {
        state.status = StatusEnum.error;
      });
  },
});
export const {} = emailSlice.actions;
export const selectEmail = (state: RootState) => state.email;

export default emailSlice.reducer;
