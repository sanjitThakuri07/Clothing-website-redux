import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { CreateAction } from "../../utils/reducer/reducer.utils";

export const setCategories = (categoriesArray) =>
  CreateAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
