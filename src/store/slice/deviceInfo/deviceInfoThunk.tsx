import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";

export const fetchDeviceInfo = createAsyncThunk(
  "deviceInfo/fetchDeviceInfo",
  async () => {
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      if (!ipResponse.ok) throw new Error(`Ошибка HTTP: ${ipResponse.status}`);

      const ipData = await ipResponse.json();
      if (!ipData.ip) throw new Error(`Ошибка HTTP`);

      const countryResponse = await fetch(`https://ipapi.co/${ipData.ip}/country_name/`);
      if (!countryResponse.ok) throw new Error(`Ошибка HTTP: ${countryResponse.status}`);

      const country = await countryResponse.text();

      if (!country || country === "Undefined")
        throw new Error(`Что-то не так с ip адресом!`);

      return { ipAddress: ipData.ip, country };
    } catch (error: any) {
      console.error(`Произошла ошибка: ${error.message}`);
      throw error;
    }
  }
);
