import React, { useState, useContext, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsExports from "../../aws-exports";
import axios from "axios";
import { AuthContext } from "../../Context/Contexts/AuthContext";
import * as AuthActionCreators from "../../Context/ActionCreators/AuthActionCreater";
import {Button,Form,FormGroup,Label,Input,Spinner} from "reactstrap";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
Amplify.configure(awsExports);

export const SignUp = (props) => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setError] = useState({});
  const [hasError, setHasError] = useState(false);
  const [activeSpinner, setSpinner] = useState(false);
  const [visibility, setVisibility] = useState({
    password: false,
    confirm_password: false,
  });
  const toggleVisibility = (field) =>
    setVisibility({ ...visibility, [field]: !visibility[field] });

  const [cognitoInfo, setCognitoInfo] = useState({
    userConfirmed: "",
    mailSent: false,
  });
  const [cognitoUser, setCognitoUser] = useState({
    PK: "",
    SK: "METADATA",
    email: "",
    type: "default",
    storage_used: 0,
  });
  const history = useHistory();

  async function confirmSignUp(e) {
    e.preventDefault();
    setSpinner(true);
    const verificationcode = e.target[0].value;
    try {
      await Auth.confirmSignUp(values.email, verificationcode);
      localStorage.setItem("auth", JSON.stringify(cognitoUser));
      authDispatch(AuthActionCreators.authStateUpdate(cognitoUser));
      setCognitoInfo({ ...cognitoUser, userConfirmed: true });
      history.push("/dashboard");
      toast.success("Email confirmed");
    } catch (error) {
      setSpinner(false);
      toast.error(error.message);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasError) {
      setSpinner(true);
      const name = e.target[0].value;
      const username = e.target[1].value;
      const password = e.target[2].value;
      try {
        const result = await Auth.signUp({
          username,
          password,
          attributes: {
            name,
          },
        });
        setCognitoUser({
          ...cognitoUser,
          PK: result.userSub,
          email: result.user.username,
        });
        if (result.user.client) {
          setSpinner(false);
          setCognitoInfo({
            userConfirmed: false,
            mailSent: true,
          });
          toast.info(
            "A verification code is sent on your mail. Please verify.",
            {
              autoClose: 8000,
            }
          );
        }
      } catch (error) {
        toast.error(error.message);
        setSpinner(false);
      }
    }
  };
  const valid = () => {
    let errors = {};
    var isValid = true;
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!values.username) {
      isValid = false;
      errors.username = "Username required";
    }
    if (!values.email) {
      errors.email = "email is required";
      isValid = false;
    } else if (!pattern.test(values.email)) {
      isValid = false;
      errors.email = "Please enter a valid email";
    }

    if (!values.password) {
      isValid = false;
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      isValid = false;
      errors.password = "Minimum length is of 8 characters";
    }
    if (!values.confirm_password) {
      isValid = false;
      errors.confirm_password = "Password is required";
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Passwords do not match";
      isValid = false;
    }
    setError(errors);
    setHasError(!isValid);
  };
  return (
    <>
      {cognitoInfo.mailSent === true ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Form onSubmit={confirmSignUp}>
            <FormGroup>
              <Label for="confirmCode">Verification code</Label>
              <Input
                type="text"
                name="confirmCode"
                id="username"
                placeholder="code"
              />
            </FormGroup>
            <Button color="success" size="sm" block type="submit">
              {activeSpinner ? (
                <Spinner class="align-right" size="sm" color="light" />
              ) : (
                "Submit code"
              )}
            </Button>
            <Button
              size="sm"
              block
              color="primary"
              onClick={() => props.login()}
            >
              {" "}
              Log In{" "}
            </Button>
          </Form>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <h1 style={{ "text-align": "center" }}>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">User name</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={values.username}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.username && (
                <p style={{ "text-align": "left" }}>{errors.username}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="userEmail"
                placeholder="userEmail"
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
              <Label for="password">Password</Label>
              <div class="d-flex bd-highlight align-items-center">
                <Input
                  type={visibility.password ? "text" : "password"}
                  name="password"
                  value={values.password}
                  id="userPassword"
                  placeholder="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <span
                  onClick={() => {
                    toggleVisibility("password");
                  }}
                  class={
                    visibility.password
                      ? "fa fa-fw fa-eye-slash field_icon toggle-password m-n4"
                      : "fa fa-fw fa-eye field_icon toggle-password m-n4"
                  }
                ></span>
              </div>
              {errors.password && (
                <p style={{ "text-align": "left" }}>{errors.password}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="confirm_password"> Confirm Password</Label>
              <div class="d-flex bd-highlight align-items-center">
                <Input
                  type={visibility.confirm_password ? "text" : "password"}
                  name="confirm_password"
                  id="confPassword"
                  placeholder="confirm password"
                  value={values.confirm_password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <span
                  onClick={() => {
                    toggleVisibility("confirm_password");
                  }}
                  class={
                    visibility.confirm_password
                      ? "fa fa-fw fa-eye-slash field_icon toggle-password m-n4"
                      : "fa fa-fw fa-eye field_icon toggle-password m-n4"
                  }
                ></span>
              </div>
              {errors.confirm_password && (
                <p style={{ "text-align": "left" }}>
                  {errors.confirm_password}
                </p>
              )}
            </FormGroup>
            <Button
              style={{ "margin-bottom": "10px" }}
              id="submitButton"
              color="success"
              size="sm"
              block
              type="submit"
              onClick={() => {
                valid();
              }}
            >
              {activeSpinner ? (
                <Spinner class="align-right" size="sm" color="light" />
              ) : (
                "Sign Up"
              )}
            </Button>
            <Button
              size="sm"
              block
              color="primary"
              onClick={() => props.login()}
            >
              {" "}
              Log In{" "}
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default SignUp;
