import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";

const initialState = {

};
export const visitSlice = createSlice({
  name: "visit",
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
  }

});
export const {  } = visitSlice.actions;
// export const selectVisit = (state: RootState) => state.visit;

export default visitSlice.reducer;
