import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../utils/Constants";

export const getRandomHomeFeatureItems = createAsyncThunk(
  "homeFeature/item",
  async ({ number, cuisines }: { number: number; cuisines: string }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}complexSearch?apiKey=${KEY}&cuisine=${cuisines}&number=${number}`
      );
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }
);
