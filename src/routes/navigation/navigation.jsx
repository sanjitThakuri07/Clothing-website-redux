import React from "react";
import { Outlet, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { setIsCartOpen } from "../../store/cart/cart.action";

import { selectCurrentUser } from "../../store/user/user.selector";

import CartIcon from "../../components/cart-icon/CartIcon";

import CartDropdown from "../../components/cart-dropdown/CartDropdown";

import { selectIsCartOpen } from "../../store/cart/cart.selector";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Links = [
  {
    id: 1,
    url: "/shop",
    name: "Shop",
  },
  {
    id: 2,
    url: "/contact",
    name: "Contact",
  },
];

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  // const { isCartOpen, setIsCartOpen } = useSelector();
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutHandler = async () => {
    await signOutUser();
    // setCurrentUser(null);
  };
  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          {Links.map((link) => (
            <NavLink to={link.url} key={link.id}>
              {link.name}
            </NavLink>
          ))}
          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
          )}
          <CartIcon
            onClick={() => {
              dispatch(setIsCartOpen(!isCartOpen));
            }}
          ></CartIcon>
        </NavLinks>
        {isCartOpen && <CartDropdown></CartDropdown>}
      </NavigationContainer>
      <Outlet></Outlet>
    </>
  );
};

export default Navigation;
