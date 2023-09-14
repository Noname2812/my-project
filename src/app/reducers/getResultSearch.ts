import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../utils/Constants";

export const getResultSearch = createAsyncThunk(
  "search/searchResult",
  async ({ query, offset }: { query: string; offset: number }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}complexSearch?apiKey=${KEY}&query=${query}&offset=${offset}`
      );
      return {
        totalResult: data.totalResults,
        result: data.results,
      };
    } catch (error) {
      console.log(error);
    }
  }
);
