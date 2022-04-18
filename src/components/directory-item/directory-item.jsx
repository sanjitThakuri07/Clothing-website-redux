import React from "react";

import { useNavigate } from "react-router-dom";

import {
  BackgroundImage,
  Body,
  CategoriesContainer,
  DirectoryItemContainer,
} from "./directoryitem.styles";

const DirectoryItem = ({ category }) => {
  const { id, title, imageUrl, route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <Body>
        {title && <h2>{title}</h2>}

        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
