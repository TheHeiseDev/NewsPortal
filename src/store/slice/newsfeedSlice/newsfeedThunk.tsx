import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { PostType } from "../postsSlice/postsTypes";
import { ParamsType } from "./newsfeedTypes";

export const fetchFeedPosts = createAsyncThunk(
  "newsfeed/fetchFeedPosts",
  async (params: ParamsType) => {
    const { page, limit, category, search, sortBy, order } = params;

    const { data } = await axios<PostType[]>({
      method: "GET",
      url: apiService.baseUrl,
      params: {
        limit: limit,
        page: page,
        category: category === "all" ? "" : category,
        search: search,
        sortBy: sortBy,
        order: order,
      },
    });

    return data;
  }
);
export const fetchFeedMaxPage = createAsyncThunk(
  "newsfeed/fetchFeedMaxPage",
  async (category: string) => {
    const { data } = await axios({
      method: "GET",
      url: apiService.baseUrl,
      params: {
        category: category === "all" ? "" : category,
      },
    });

    return data.length;
  }
);
