export interface Post {
  id: string;
  name: string;
  instructions: string;
  urlImage: string;
  sourceName: string;
  pricePerServing: string;
  recipes: string;
  readyInMinutes: string;
  healthScore: string;
  spoonacularScore: number;
  summary: string;
  extendedIngredients: Ingredient[];
  dishTypes: string[];
}
export interface UserPost extends Post {
  fireBaseID: string;
}
export interface AppTypeInitialState {
  toasts: string[];
  inforUser: { email: string; uid: string };
  listRecipeOfUser: UserPost[];
  errorCallAPI: boolean;
}
export interface PostTypeInitialState {
  listPost: Post[] | undefined;
  isLoading: boolean;
  listItemsFeature: ItemFeature[];
  resultFillter: Post[] | undefined;
  resultSearch: ResultSearch | undefined;
  query: string;
}
export interface ItemFeature {
  id: string;
  title: string;
  image: string | undefined;
  imageType: string;
}
export interface Ingredient {
  id: string;
  name: string;
  image: string;
  unit: string;
  amount: number;
}
export interface ResultSearch {
  totalResult: number;
  result: ItemFeature[] | undefined;
}
