import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../utils/Constants";

export const getRanDomPost = createAsyncThunk(
  "post/getRandom",
  async (number: number) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}random?apiKey=${KEY}&number=${number}`
      );
      return data.recipes;
    } catch (error) {
      console.log(error);
    }
  }
);
