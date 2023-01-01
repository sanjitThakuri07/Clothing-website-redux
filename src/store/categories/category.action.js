import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { CreateAction } from "../../utils/reducer/reducer.utils";

import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../../utils/firebase/firebase.utils";

export const setCategories = (categoriesArray) =>
  CreateAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export const fetchCategoriesStart = () =>
  CreateAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  CreateAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  CreateAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// creating a thunk action

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categoriesArray = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
};
