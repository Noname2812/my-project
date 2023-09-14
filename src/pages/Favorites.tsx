import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Login from "../components/Login";
import ListRecipeOfUser from "../components/ListRecipeOfUser";
import { getUserRecipe } from "../app/reducers/getUserRecipe";

const Favorites = () => {
  const { inforUser } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserRecipe());
  }, [inforUser]);
  return (
    <div>
      {!inforUser.uid && <Login />}
      {inforUser.uid && <ListRecipeOfUser />}
    </div>
  );
};

export default Favorites;
