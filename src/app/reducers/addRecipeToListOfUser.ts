import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../../utils/Types";
import { setToast } from "../slices/AppSlice";
import { RootState } from "../store";
import { addDoc } from "firebase/firestore";
import { recipeListRef } from "../../utils/FirebaseConfig";
import { getUserRecipe } from "./getUserRecipe";

export const addRecipeToListOfUser = createAsyncThunk(
  "recipe/addRecipe",
  async (post: Post, { getState, dispatch }) => {
    try {
      const {
        app: { inforUser, listRecipeOfUser },
      } = getState() as RootState;

      if (!inforUser.uid) {
        return dispatch(setToast("Please login !!!"));
      }
      const index = listRecipeOfUser
        ? listRecipeOfUser.findIndex((item: Post) => {
            return item.id === post.id;
          })
        : -1;

      if (index < 0) {
        await addDoc(recipeListRef, { post: post, uid: inforUser.uid });
        await dispatch(getUserRecipe());
        return dispatch(setToast(`add ${post.name} to your list success !!!`));
      } else {
        return dispatch(setToast(`${post.name} already your list !!!`));
      }
    } catch (error) {
      console.log(error);
      dispatch(setToast("add recipe to list is fail !!!"));
    }
  }
);
