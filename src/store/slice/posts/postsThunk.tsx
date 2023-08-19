import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { PostType } from "./postsTypes";

type ParamsType = {
  page?: number;
  limit?: number;
  sortBy?: string;
};

export const fetchPosts = createAsyncThunk(
  "posts/fecthPosts",
  async (params: ParamsType) => {
    const { page, limit, sortBy } = params;
    const { data } = await axios({
      method: "GET",
      url: apiService.baseUrl,
      params: {
        page: page,
        limit: limit,
        sortBy: sortBy,
      },
    });

    return data.items as PostType[];
  }
);

export const fetchPages = createAsyncThunk("posts/fetchPages", async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${apiService.baseUrl}?page=1&limit=5`,
    });
    return data.meta.total_pages;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch number of pages.");
  }
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number) => {
    try {
      const { data } = await axios<PostType>({
        method: "GET",
        url: `${apiService.baseUrl}/${id}`,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to retrieve post by id.");
    }
  }
);
export const fetchUpViewCounts = createAsyncThunk(
  "posts/fetchUpViewCounts",
  async (id: number) => {
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
      throw new Error("Failed to credit the viewing.");
    }
  }
);

export const addCommentById = createAsyncThunk(
  "posts/addCommentById",
  async ({ id, post }: { id: number; post: PostType }) => {
    try {
      const { data } = await axios<PostType>({
        method: "PUT",
        url: `${apiService.baseUrl}/${id}`,
        data: post,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to add a comment");
    }
  }
);
export const fetchLikedPost = createAsyncThunk(
  "posts/addCommentById",
  async ({ id, post }: { id: number; post: PostType }) => {
    try {
      const { data } = await axios<PostType>({
        method: "PATCH",
        url: `${apiService.baseUrl}/${id}`,
        data: post,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to liked post");
    }
  }
);
export const fetchDeleteLike = createAsyncThunk(
  "posts/fetchDeleteLike",
  async ({ id, post }: { id: number; post: PostType }) => {
    try {
      const { data } = await axios<PostType>({
        method: "PATCH",
        url: `${apiService.baseUrl}/${id}`,
        data: post,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete like");
    }
  }
);
