import React, { useContext } from "react";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import {
  addItemToCart,
  removeItemFromCart,
  decreaseItemCountFromCart,
} from "../../store/cart/cart.action";

import { selectCartItems } from "../../store/cart/cart.selector";

import "./checkout-item.styles.scss";

import { MdDeleteForever } from "react-icons/md";

import { CartContext } from "../../context/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, id, quantity, price } = cartItem;

  const addItemToCartHandler = () =>
    dispatch(addItemToCart(cartItems, cartItem));
  const decreaseItemToCartHandler = () =>
    dispatch(decreaseItemCountFromCart(cartItems, cartItem));
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decreaseItemToCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => dispatch(removeItemFromCart(cartItems, cartItem))}
      >
        {/* <MdDeleteForever /> */}
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
