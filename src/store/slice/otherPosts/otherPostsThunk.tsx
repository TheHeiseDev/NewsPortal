import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../../api/apiService";
import { HTTPMethod, errorHandler } from "../posts/postsThunk";

export const fetchOtherPosts = createAsyncThunk(
  "posts/fetchOtherPosts",
  async (category: string) => {
    try {
      const { data } = await axios({
        method: HTTPMethod.GET,
        url: apiService.posts,
        params: {
          category: category,
          limit: 5,
          sortBy: "-likes"
        },
      });
      return data.items;
    } catch (error) {
      errorHandler("Failed to fetch other posts.", error);
    }
  }
);
