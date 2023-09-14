import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, query, where } from "firebase/firestore";
import { recipeListRef } from "../../utils/FirebaseConfig";
import { UserPost } from "../../utils/Types";
import { RootState } from "../store";

export const getUserRecipe = createAsyncThunk(
  "recipe/getUserRecipe",
  async (args, { getState }) => {
    try {
      const {
        app: { inforUser },
      } = getState() as RootState;
      if (!inforUser.uid) return;
      const fireStoreQuery = query(
        recipeListRef,
        where("uid", "==", inforUser.uid)
      );
      const fetchRecipe = await getDocs(fireStoreQuery);
      if (fetchRecipe.docs.length) {
        var listRecipe: UserPost[] = [];
        fetchRecipe.forEach(async (recipe) => {
          listRecipe.push({ ...recipe.data().post, fireBaseID: recipe.id });
        });
        return listRecipe;
      }
    } catch (error) {
      console.log("!@3123");
    }
  }
);
