import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";

type ParamsType = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
};

// export const fetchVisit = createAsyncThunk(
//   "posts/fecthPosts",
//   async (params: ParamsType) => {
//     const { page, limit, sortBy, order } = params;

//     const { data } = await axios({
//       method: "GET",
//       url: apiService.baseUrl,
//       params: {
//         page: page,
//         limit: limit,
//         sortBy: sortBy,
//         order: order,
//       },
//     });

//     return data;
//   }
// );
