import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { PostsType } from "./postsTypes";

type ParamsType = {
  page: number;
  limit: number;
};

export const fetchPosts = createAsyncThunk(
  "posts/fecthPosts",
  async (params: ParamsType) => {
    const { page, limit } = params;

    const { data } = await axios<PostsType[]>({
      method: "GET",
      url: apiService.baseUrl,
      params: {
        limit: limit,
        page: page,
      },
    });

    return data;
  }
);
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: string) => {
    const { data } = await axios<PostsType>({
      method: "GET",
      url: `${apiService.baseUrl}/${id}`,
    });
    return data;
  }
);
