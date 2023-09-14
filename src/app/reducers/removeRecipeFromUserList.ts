import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { recipeListRef } from "../../utils/FirebaseConfig";

export const removeRecipeFromUserList = createAsyncThunk(
  "recipe/removeList",
  async (id: string) => {
    try {
      await deleteDoc(doc(recipeListRef, id));
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);
