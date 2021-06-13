import React, { useState, useContext, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsExports from "../../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { AuthContext } from "../../Context/Contexts/AuthContext";
import * as AuthActionCreators from "../../Context/ActionCreators/AuthActionCreater";
import { Link } from "react-router-dom";
import {Button,Form,FormGroup,Label,Input,Modal,ModalBody,ModalHeader,Spinner} from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";
Amplify.configure(awsExports);

export const SignIn = (props) => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [errors, setError] = useState({});
  const [visibility, setVisibility] = useState(false);
  const [loggingIn, toggleLoggingIn] = useState(false);
  const toggle = () => toggleLoggingIn(!loggingIn);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function valid() {
    let errors = {};
    let isValid = true;
    if (!values.email) {
      errors.email = "email is required";
      isValid = false;
    }
    if (!values.password) {
      errors.password = "Password is required";
      isValid = false;
    }
    setError(errors);
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!valid()) {
      toggle();
      return;
    }
    try {
      const result = await Auth.signIn(email, password);
      var user = {
        PK: result.attributes.sub,
        SK: "METADATA",
        email: result.attributes.email,
        type: "default",
        storage_used: 0,
      };
      await axios
        .get(
          `${process.env.REACT_APP_BACKENDURL}/user/${result.attributes.sub}`,
          {
            headers: {
              "X-Api-Key": process.env.REACT_APP_APIKEY,
            },
          }
        )
        .then((response) => {
          if (response.data.body) {
            user.storage_used = response.data.body.storage_used;
          }
        });
      localStorage.setItem("auth", JSON.stringify(user));
      await authDispatch(AuthActionCreators.authStateUpdate(user));
      console.log(authState.auth.PK);
      history.push("/dashboard");
      toast.success("successfully logged in");
    } catch (error) {
      console.log("error signing in", error);
      toast.error(error.message);
    }
    toggle();
  }
  return (
    <>
      <div
        className="d-flex-inline"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <h1 style={{ "text-align": "center", "margin-bottom": "20px" }}>
          Sign In
        </h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="userPassword">Email</Label>
            <Input
              type="text"
              name="email"
              id="userEmail"
              placeholder="user email"
              value={values.email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors.email && (
              <p style={{ "text-align": "left" }}>{errors.email}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="userPassword">Password</Label>
            <div class="d-flex bd-highlight align-items-center text-center">
              <Input
                type={visibility ? "text" : "password"}
                name="password"
                id="userPassword"
                value={values.password}
                placeholder="password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <span
                onClick={() => {
                  setVisibility(!visibility);
                }}
                class={
                  visibility
                    ? "fa fa-fw fa-eye-slash field_icon toggle-password m-n4"
                    : "fa fa-fw fa-eye field_icon toggle-password m-n4"
                }
              ></span>
            </div>
            {errors.password && (
              <p style={{ "text-align": "left" }}>{errors.password}</p>
            )}
            <a href="#" onClick={() => props.toggleForgot()}>
              Forgot password?
            </a>
          </FormGroup>

          <Button
            color="primary"
            style={{ "margin-bottom": "10px" }}
            size="sm"
            block
            type="submit"
            onClick={() => {
              toggle();
            }}
            color="success"
          >
            {loggingIn ? (
              <Spinner class="align-right" size="sm" color="light" />
            ) : (
              "Log In"
            )}
          </Button>
          <Button
            style={{ margin: "auto" }}
            size="sm"
            block
            color="primary"
            onClick={() => props.signup()}
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SignIn;
