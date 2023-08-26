import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchDeviceInfo } from "./deviceInfoThunk";
import { initialDeviceInfo } from "./deviceInfoTypes";
import { StatusEnum } from "../posts/postsTypes";

const initialState: initialDeviceInfo = {
  ipAddress: null,
  country: null,
  status: StatusEnum.loading,
};
export const deviceInfoSlice = createSlice({
  name: "deviceInfo",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDeviceInfo.pending, (state) => {
        state.status = StatusEnum.loading;
      })
      .addCase(fetchDeviceInfo.fulfilled, (state, action) => {
        state.ipAddress = action.payload.ipAddress;
        state.country = action.payload.country;
        state.status = StatusEnum.success;
      })
      .addCase(fetchDeviceInfo.rejected, (state) => {
        state.status = StatusEnum.error;
        state.ipAddress = null;
        state.country = null
      });
  },
});
// export const {} = deviceInfoSlice.actions;
export const selectDeviceInfo = (state: RootState) => state.deviceInfo;

export default deviceInfoSlice.reducer;
