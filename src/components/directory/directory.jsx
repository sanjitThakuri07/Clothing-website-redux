import React, { useEffect } from "react";

import { CategoriesContainer } from "../directory-item/directoryitem.styles";

import DirectoryItem from "../directory-item/directory-item";

import categories from "../../Raw/categories.json";

const Directory = () => {
  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoryMap = await getCategoriesAndDocuments();
  //     setCategoriesMap(categoryMap);
  //   };

  //   getCategoriesMap();
  // }, []);
  return (
    <CategoriesContainer>
      {categories.map((category) => {
        return (
          <DirectoryItem key={category.id} category={category}></DirectoryItem>
        );
      })}
    </CategoriesContainer>
  );
};

export default Directory;
