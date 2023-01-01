import { CART_ACTION_TYPES } from "./cart.types";

import { CreateAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems = [], productToAdd) => {
  // if car items contain product to add
  const presentItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (presentItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [
    ...cartItems,
    {
      ...productToAdd,
      quantity: 1,
    },
  ];
};

// remove cart item -> permanently remove from cart
const removeCartItem = (cartItems = [], productToRemove) => {
  const presentItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (presentItem) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }
};

// decrease the number individual products from the
// Do not decrease below -> 1
const decreaseCartItemCount = (cartItems = [], productToRemove) => {
  const presentItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  let newItems = [];
  if (presentItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToRemove.id
        ? productToRemove.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : { ...cartItem, quantity: 1 }
        : { ...cartItem };
      // if (cartItem.id === productToRemove.id) {
      //   let quantity = cartItem.quantity - 1;
      //   if (quantity > 0) {
      //     return { ...cartItem, quantity: cartItem.quantity - 1 };
      //   } else {
      //     alert("You must have atleast one item in the cart");
      //     return { ...cartItem, quantity: 1 };
      //   }
      // }
    });
  }

  // // // if length === 1 do not let it decrease
  // if (presentItem.quantity < 1) {
  //   return alert("You must have atleast one item in the cart to");
  // }
};

// show cart dropdown
export const setIsCartOpen = (bool) => {
  return CreateAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return CreateAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
// remove item
export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return CreateAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decreaseItemCountFromCart = (cartItems, productToRemove) => {
  const newCartItems = decreaseCartItemCount(cartItems, productToRemove);
  return CreateAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
