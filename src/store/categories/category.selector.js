import { createSelector } from "reselect";

// export const selectCategoriesMap = (state) => {
//   console.log("selector fired");
//   const transformedObject = state.categories.categories.reduce(
//     (acc, category) => {
//       const { title, items } = category;
//       acc[title.toLowerCase()] = items;
//       return acc;
//     },
//     {}
//   );

//   //   console.log(transformedObject, "final object");
//   return transformedObject;
// };

const selectCategoriesReducer = (state) => state.categories;

const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => {
    return categoriesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  // [selectCategories],
  (state) => state.categories.categories,
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => {
    return categoriesSlice.isLoading;
  }
);
