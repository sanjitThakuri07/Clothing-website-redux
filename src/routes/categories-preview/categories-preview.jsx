import React, { useContext, Fragment } from "react";

import { useSelector } from "react-redux";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview";

import Spinner from "../../components/Spinner/spiner.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  console.log(isLoading);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const product = categoriesMap[title];
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={product}
            ></CategoryPreview>
          );
        })
      )}
    </>
  );
};

export default CategoriesPreview;
