import React, { useState } from "react";
import SignUp from "../AuthComponents/SignUp";
import SignIn from "../AuthComponents/SignIn";
import Amplify from "aws-amplify";
import awsExports from "../../aws-exports";
import ForgotPassword from "../AuthComponents/ForgotPassword";
Amplify.configure(awsExports);

const Authenticate = () => {
  const [logIn, toggleLogIn] = useState(true);
  const [renderForgot, setRenderForgot] = useState(false);

  return (
    <>
      {renderForgot ? (
        <div className="container">
          <ForgotPassword
            login={() => {
              toggleLogIn(true);
              setRenderForgot(false);
            }}
          />
        </div>
      ) : null}
      {logIn && !renderForgot ? (
        <>
          <SignIn
            signup={() => toggleLogIn(!logIn)}
            toggleForgot={() => setRenderForgot(true)}
          />
        </>
      ) : null}
      {!logIn && !renderForgot ? (
        <div className="container">
          <SignUp login={() => toggleLogIn(!logIn)} />
        </div>
      ) : null}
    </>
  );
};
export default Authenticate;
