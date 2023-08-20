import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../../api/apiService";
import { PostType } from "./postsTypes";

export type UrlParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
};
export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
}
type FetchParams = {
  id: number;
  post: PostType;
};

const URLPath = (id: number) => `${apiService.posts}/${id}`;

const errorHandler = (message: string, error: unknown) => {
  console.log(error);
  throw new Error(message);
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params: UrlParams) => {
    try {
      const { data } = await axios({
        method: HTTPMethod.GET,
        url: apiService.posts,
        params,
      });

      return data.items;
    } catch (error) {
      errorHandler("Failed to fetch posts.", error);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number) => {
    try {
      const { data } = await axios<PostType>({
        method: HTTPMethod.GET,
        url: URLPath(id),
      });
      return data;
    } catch (error) {
      errorHandler("Failed to retrieve post by id.", error);
    }
    return null;
  }
);

export const fetchPages = createAsyncThunk("posts/fetchPages", async () => {
  try {
    const { data } = await axios({
      method: HTTPMethod.GET,
      url: `${apiService.posts}?page=1&limit=5`,
    });
    return data.meta.total_pages;
  } catch (error) {
    errorHandler("Failed to fetch number of pages.", error);
  }
});
export const fetchUpViewCounts = createAsyncThunk(
  "posts/fetchUpViewCounts",
  async (id: number) => {
    try {
      const { data } = await axios({
        method: HTTPMethod.GET,
        url: URLPath(id),
      });

      const updatePost = {
        ...data,
        views: data.views + 1,
      };
      await axios({
        method: HTTPMethod.PATCH,
        url: URLPath(id),
        data: updatePost,
      });
    } catch (error) {
      errorHandler("Failed to credit the viewing.", error);
    }
  }
);

export const addCommentById = createAsyncThunk(
  "posts/addCommentById",

  async ({ id, post }: FetchParams) => {
    try {
      const { data } = await axios<PostType>({
        method: HTTPMethod.PATCH,
        url: URLPath(id),
        data: post,
      });
      return data;
    } catch (error) {
      errorHandler("Failed to add a comment.", error);
    }
  }
);
export const fetchLikedPost = createAsyncThunk(
  "posts/fetchLikedPost",
  async ({ id, post }: FetchParams) => {
    try {
      const { data } = await axios<PostType>({
        method: HTTPMethod.PATCH,
        url: URLPath(id),
        data: post,
      });
      return data;
    } catch (error) {
      errorHandler("Failed to liked post.", error);
    }
  }
);
export const fetchDeleteLike = createAsyncThunk(
  "posts/fetchDeleteLike",
  async ({ id, post }: FetchParams) => {
    try {
      const { data } = await axios<PostType>({
        method: HTTPMethod.PATCH,
        url: URLPath(id),
        data: post,
      });
      return data;
    } catch (error) {
      errorHandler("Failed to delete like.", error);
    }
  }
);
