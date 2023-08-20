import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../../api/apiService";
import { PostType } from "../posts/postsTypes";
import { ParamsType } from "./newsfeedTypes";
import { HTTPMethod } from "../posts/postsThunk";

export const fetchFeedPosts = createAsyncThunk(
  "newsfeed/fetchFeedPosts",
  async (params: ParamsType): Promise<PostType[]> => {
    const { page, limit, category, search, sortBy } = params;

    const { data } = await axios({
      method: HTTPMethod.GET,
      url: apiService.posts,
      params: {
        page: page,
        limit: limit,
        category: category === "all" ? "" : category,
        sortBy: sortBy,
        description: search,
      },
    });
    return data.items;
  }
);
export const fetchFeedMaxPage = createAsyncThunk(
  "newsfeed/fetchFeedMaxPage",
  async (category: string): Promise<number> => {
    const { data } = await axios({
      method: HTTPMethod.GET,
      url: apiService.posts,
      params: {
        category: category === "all" ? "" : category,
      },
    });

    return data.items.length;
  }
);
