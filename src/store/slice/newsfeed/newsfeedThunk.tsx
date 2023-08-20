import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../../api/apiService";
import { ParamsType } from "./newsfeedTypes";
import { HTTPMethod } from "../posts/postsThunk";

export const fetchFeedPosts = createAsyncThunk(
  "newsfeed/fetchFeedPosts",
  async (params: ParamsType) => {

    const { data } = await axios({
      method: HTTPMethod.GET,
      url: apiService.posts,
      params,
    });
    return data;
  }
);
