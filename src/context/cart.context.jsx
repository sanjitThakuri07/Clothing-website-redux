import React, { useState, createContext, useEffect } from "react";

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  //total price
  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);
    setCartTotalPrice(newTotalPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  // remove item
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const decreaseItemCountFromCart = (productToRemove) => {
    setCartItems(decreaseCartItemCount(cartItems, productToRemove));
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
