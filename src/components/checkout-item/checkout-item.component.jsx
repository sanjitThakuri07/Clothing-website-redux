import React, { useContext } from "react";

import "./checkout-item.styles.scss";

import { MdDeleteForever } from "react-icons/md";

import { CartContext } from "../../context/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, decreaseItemCountFromCart, removeItemFromCart } =
    useContext(CartContext);

  const { name, imageUrl, id, quantity, price } = cartItem;

  const addItemToCartHandler = () => addItemToCart(cartItem);
  const decreaseItemToCartHandler = () => decreaseItemCountFromCart(cartItem);
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
        onClick={() => removeItemFromCart(cartItem)}
      >
        {/* <MdDeleteForever /> */}
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
