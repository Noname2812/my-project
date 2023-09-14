import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/Types";
import { getUserRecipe } from "../reducers/getUserRecipe";
import { removeRecipeFromUserList } from "../reducers/removeRecipeFromUserList";

const initialState: AppTypeInitialState = {
  toasts: [],
  inforUser: { email: "", uid: "" },
  listRecipeOfUser: [],
  errorCallAPI: false,
};
export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToast: (state, action) => {
      const toasts = [...state.toasts];
      toasts.push(action.payload);
      state.toasts = toasts;
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    setEmailUser: (state, action) => {
      state.inforUser = action.payload;
    },
    setError: (state, action) => {
      state.errorCallAPI = action.payload;
    },
    setListRecipeOfUser: (state, action) => {
      state.listRecipeOfUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserRecipe.fulfilled, (state, action) => {
      state.listRecipeOfUser = action.payload!;
    });
    builder.addCase(removeRecipeFromUserList.fulfilled, (state, action) => {
      let temp = state.listRecipeOfUser.filter(
        (item) => item.fireBaseID !== action.payload
      );
      state.listRecipeOfUser = temp;
    });
  },
});
export const {
  clearToasts,
  setToast,
  setEmailUser,
  setError,
  setListRecipeOfUser,
} = AppSlice.actions;
