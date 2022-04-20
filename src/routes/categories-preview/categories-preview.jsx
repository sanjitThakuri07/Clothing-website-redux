import React, { useContext, Fragment } from "react";

import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const product = categoriesMap[title];
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={product}
          ></CategoryPreview>
        );
      })}
    </>
  );
};

export default CategoriesPreview;
