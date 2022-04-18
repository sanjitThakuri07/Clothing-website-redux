import React, { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

/* Creating a context object. 
Actual value you want to access
*/
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

/**
 * The UserProvider function is a React component that returns a UserContext.Provider component with
 * the children prop set to the children prop that was passed into the UserProvider function.
 * @returns The UserProvider component is being returned.
 */
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
