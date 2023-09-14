import { AsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post, PostTypeInitialState } from "../../utils/Types";
import { getRanDomPost } from "../reducers/getRandomPost";
import { convertPostGet } from "../../utils/ConvertPostGet";
import { getRandomHomeFeatureItems } from "../reducers/getRandomHomeFeatureItems";
import { inputSearch } from "../../pages/Recipe";
import { getResultSearch } from "../reducers/getResultSearch";

const initialState: PostTypeInitialState = {
  listPost: [],
  isLoading: false,
  listItemsFeature: [],
  resultFillter: [],
  resultSearch: undefined,
  query: "",
};
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPost: (state) => {
      state.listPost = [];
    },
    clearQuery: (state) => {
      state.query = "";
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    resetresultFillter: (state) => {
      let temp = [...state.listPost!];
      state.resultFillter = temp;
    },
    sortItem: (state, action: { payload: string; type: string }) => {
      if (action.payload === "increase") {
        state.resultFillter?.sort((a, b) => {
          return Number(a.pricePerServing) - Number(b.pricePerServing);
        });
      } else {
        state.resultFillter?.sort((a, b) => {
          return Number(b.pricePerServing) - Number(a.pricePerServing);
        });
      }
    },
    fillterItem: (state, action) => {
      const input: inputSearch = action.payload;
      if (!input.options && !input.optionsType) {
        let temp = [...state.listPost!];
        state.resultFillter = temp;
      } else {
        if (input.options) {
          let temp: Post[] | undefined = state.resultFillter?.filter(
            (item) => item.dishTypes.indexOf(input.options) > -1
          );
          state.resultFillter = temp;
        }
        if (input.optionsType) {
          let temp: Post[] | undefined = state.resultFillter?.filter(
            (item) => item.dishTypes.indexOf(input.optionsType) > -1
          );
          state.resultFillter = temp;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRanDomPost.fulfilled, (state, action) => {
        if (!state.listPost?.length) {
          state.listPost = convertPostGet(action.payload)!;
        } else {
          const parse: Post[] = convertPostGet(action.payload);
          const temp: Post[] = state.listPost.concat(parse);
          state.listPost = temp;
        }
      })
      .addCase(getRandomHomeFeatureItems.fulfilled, (state, action) => {
        state.listItemsFeature = action.payload;
      })
      .addCase(getResultSearch.fulfilled, (state, action) => {
        state.resultSearch = action.payload;
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          if (state.isLoading) {
            state.isLoading = false;
          }
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          if (state.isLoading) {
            state.isLoading = false;
          }
        }
      );
  },
});
export const {
  clearPost,
  fillterItem,
  resetresultFillter,
  sortItem,
  clearQuery,
  setQuery,
} = PostSlice.actions;
