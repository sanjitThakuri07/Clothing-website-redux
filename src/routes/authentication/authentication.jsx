import React, { useEffect } from "react";

import SignUp from "../../components/sign-up/sign-up";

import SignIn from "../../components/sign-in/sign-in";

import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignIn></SignIn>
      <SignUp></SignUp>
    </div>
  );
};

export default Authentication;
