import React, { createContext, useReducer } from "react";

import { CreateAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  decreaseItemCountFromCart: () => {},
  cartCount: 0,
  cartTotalPrice: 0,
});

export const CART_ACTION_TYPES = {
  SET_SHOW_CART: "SET_SHOW_CART",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_SHOW_CART:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in user reducer`);
  }
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const [{ isCartOpen, cartCount, cartItems, cartTotalPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const updateCartReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    const newTotalPrice = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);

    dispatch(
      CreateAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotalPrice: newTotalPrice,
        cartCount: newCartCount,
      })
    );
  };

  // show cart dropdown
  const setIsCartOpen = (bool) => {
    dispatch(CreateAction(CART_ACTION_TYPES.SET_SHOW_CART, bool));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartReducer(newCartItems);
  };
  // remove item
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartReducer(newCartItems);
  };

  const decreaseItemCountFromCart = (productToRemove) => {
    const newCartItems = decreaseCartItemCount(cartItems, productToRemove);
    updateCartReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    decreaseItemCountFromCart,
    removeItemFromCart,
    cartItems,
    cartCount,
    cartTotalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
