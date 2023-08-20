import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../../api/apiService";
import { HTTPMethod } from "../posts/postsThunk";

type VisitParams = {
  date: string;
  ip: string;
  country: string;
  device: string;
  os: string;
};

export const fetchVisit = createAsyncThunk(
  "visit/fetchVisit",
  
  async (params: VisitParams) => {
    const { data } = await axios({
      method: HTTPMethod.POST,
      url: apiService.visits,
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
      method: HTTPMethod.GET,
      url: apiService.visits,
      params: {
        date: date,
      },
    });
    return data;
  }
);
