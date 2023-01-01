import React from "react";
// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { useSelector } from "react-redux";

import { selectCartCount } from "../../store/cart/cart.selector";

import { CartContext } from "../../context/cart.context";

import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = ({ ...additionalAttr }) => {
  const cartCount = useSelector(selectCartCount);
  return (
    <CartIconContainer {...additionalAttr}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
