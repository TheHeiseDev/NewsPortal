import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { PostType } from "./postsTypes";

type ParamsType = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
};

export const fetchPosts = createAsyncThunk(
  "posts/fecthPosts",
  async (params: ParamsType) => {
    const { page, limit, sortBy, order } = params;
    const { data } = await axios<PostType[]>({
      method: "GET",
      url: apiService.baseUrl,
      params: {
        page: page,
        limit: limit,
        sortBy: sortBy,
        order: order,
      },
    });
    return data;
  }
);

export const fetchNumberOfPages = createAsyncThunk(
  "posts/fetchNumberOfPages",
  async () => {
    const { data } = await axios({
      method: "GET",
      url: apiService.baseUrl,
    });
    return Math.ceil(data.length / 5);
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
    try {
      const { data } = await axios<PostType>({
        method: "PUT",
        url: `${apiService.baseUrl}/${id}`,
        data: post,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchLikedPost = createAsyncThunk(
  "posts/addCommentById",
  async ({ id, post }: { id: string; post: PostType }) => {
    try {
      const { data } = await axios<PostType>({
        method: "PUT",
        url: `${apiService.baseUrl}/${id}`,
        data: post,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchDeleteLike = createAsyncThunk(
  "posts/fetchDeleteLike",
  async ({ id, post }: { id: string; post: PostType }) => {
    const { data } = await axios<PostType>({
      method: "PUT",
      url: `${apiService.baseUrl}/${id}`,
      data: post,
    });
    return data;
  }
);
