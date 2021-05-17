import React, { useState } from "react";
import { Button } from "reactstrap";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Authenticate = () => {
  const [logIn, toggleLogIn] = useState(true);

  return (
    <div className="container">
      {console.log({ logIn })}
      {logIn ? (
        <div className="container">
          <h1 style={{ "text-align": "center", "margin-bottom": "20px" }}>
            Sign In
          </h1>
          <SignIn />
          <Button
            style={{ margin: "auto", width: "25%" }}
            size="sm"
            block
            color="primary"
            onClick={() => toggleLogIn(false)}
          >
            Sign Up
          </Button>
        </div>
      ) : (
        <div className="container">
          <h1 style={{ "text-align": "center", margin: "10px 0px 20px 0px" }}>
            Sign Up
          </h1>
          <SignUp />
          <Button
            style={{ margin: "auto", width: "25%" }}
            size="sm"
            block
            color="primary"
            onClick={() => toggleLogIn(true)}
          >
            {" "}
            Log In{" "}
          </Button>
        </div>
      )}
    </div>
  );
};
export default Authenticate;
