import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { CommentsType, PostType } from "./postsTypes";

type ParamsType = {
  page: number;
  limit: number;
};

export const fetchPosts = createAsyncThunk(
  "posts/fecthPosts",
  async (params: ParamsType) => {
    const { page, limit } = params;

    const { data } = await axios<PostType[]>({
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
    const { data } = await axios<PostType>({
      method: "GET",
      url: `${apiService.baseUrl}/${id}`,
    });
    return data;
  }
);
export const fetchUpViewCounts = createAsyncThunk(
  "posts/fetchUpViewCounts",
  async (id: string) => {
    try {
      const { data } = await axios.get(
        `https://6440faa3792fe886a89abbd7.mockapi.io/posts/${id}`
      );
      const updatePost = {
        ...data,
        views: data.views + 1,
      };
      await axios.put(
        `https://6440faa3792fe886a89abbd7.mockapi.io/posts/${id}`,
        updatePost
      );
    } catch (error) {
      console.error(error);
    }
  }
);

export const addCommentById = createAsyncThunk(
  "posts/addCommentById",
  async ({ id, post }: { id: string; post: PostType }) => {
    const { data } = await axios<PostType>({
      method: "PUT",
      url: `${apiService.baseUrl}/${id}`,
      data: post,
    });
    return data;
  }
);
