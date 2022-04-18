import React, { useContext, Fragment } from "react";

import { CategoriesContext } from "../../context/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

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
