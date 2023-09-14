import { Ingredient, Post } from "./Types";

export const convertPostGet = (listPost: any) => {
  const result: Post[] = [];
  if (listPost) {
    listPost.map((item: any) => {
      const listIngredients = item.extendedIngredients!;
      const extendedIngredients: Ingredient[] = new Array();
      listIngredients.forEach((ingredients: any) => {
        let ingredientsTemp: Ingredient = {
          id: ingredients.id,
          name: ingredients.name,
          image: ingredients.image,
          unit: ingredients.unit,
          amount: ingredients.amount,
        };
        extendedIngredients.push(ingredientsTemp);
      });
      const temp: Post = {
        id: item.id,
        name: item.title,
        urlImage: item.image,
        sourceName: item.sourceName,
        pricePerServing: item.pricePerServing,
        recipes: item.sourceUrl,
        readyInMinutes: item.readyInMinutes,
        healthScore: item.healthScore,
        spoonacularScore: item.weightWatcherSmartPoints,
        instructions: item.instructions,
        summary: item.summary,
        extendedIngredients: extendedIngredients,
        dishTypes: item.dishTypes,
      };
      result.push(temp);
    });
  }
  return result;
};
