import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { Email, EmailWithoutId } from "./emailTypes";

export const fetchAddSubscriber = createAsyncThunk(
  "email/fetchAddSubscriber",
  async (subscriber: EmailWithoutId) => {
    const { data } = await axios<Email>({
      method: "POST",
      url: apiService.emailUrl,
      data: subscriber,
    });

    return data;
  }
);
