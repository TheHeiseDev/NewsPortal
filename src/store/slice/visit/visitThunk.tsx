import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";

type ParamsType = {
  date: string;
  ip: string;
  country: string;
  device: string;
  os: string;
};

export const fetchVisit = createAsyncThunk(
  "visit/fetchVisit",
  async (params: ParamsType) => {
    const { date, country, device, os,ip } = params;

    const { data } = await axios({
      method: "POST",
      url: apiService.visitUrl,
      params: {},
      data: params,
    });

    return data;
  }
);
export const fetchAllVisitByDate = createAsyncThunk(
  "visit/fetchAllVisitByDate",
  async (date: string) => {

    const { data } = await axios({
      method: "GET",
      url: apiService.visitUrl,
      params: {
        date: date
      },
    });

    return data;
  }
);
