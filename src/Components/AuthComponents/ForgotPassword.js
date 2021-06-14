import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory, Redirect } from "react-router-dom";
import {Button,Form,FormGroup,Label,Input,FormText,Toast,ToastBody,ToastHeader,Modal,ModalBody,ModalHeader,Spinner} from "reactstrap";
import { toast } from "react-toastify";
import awsExports from "../../aws-exports";

const ForgotPassword = (props) => {
  const [isvalid, setIsValid] = useState(true);
  const [mailSent, setMailSent] = useState(false);
  const [pwdUpdated, setpwdUpdate] = useState(false);
  const [loggingIn, toggleLoggingIn] = useState(false);
  const toggle = () => toggleLoggingIn(!loggingIn);
  const [values, setValues] = useState({
    user_email: "",
    code: "",
    confirm_password: "",
    password: "",
  });
  const [visibility, setVisibility] = useState({
    password: false,
    confirm_password: false,
  });
  const toggleVisibility = (field) =>
    setVisibility({ ...visibility, [field]: !visibility[field] });

  const history = useHistory();
  const [errors, setError] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const sendMail = () => {
    const user = values.user_email;
    if (!values.user_email) {
      toast.error("Please enter registered email");
      return;
    }
    Auth.forgotPassword(user)
      .then((data) => {
        toast.info("Mail with verification code sent");
        setMailSent(true);
      })
      .catch((err) => {
        if (err.code === "UserNotFoundException")
          toast.error("User with given email address does not exist");
        else toast.error(err.message);
      });
  };

  const valid = () => {
    let errors = {};
    let valid = true;
    if (!values.code) {
      valid = false;
      errors.code = "enter the verification code";
    } else if (!values.password) {
      valid = false;
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      valid = false;
      errors.password = "Minimum 8 characters required";
    } else if (values.password !== values.confirm_password) {
      valid = false;
      errors.confirm_password = "Password do not match";
    }
    setError(errors);
    setIsValid(valid);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid()) {
      toggle();
      return;
    }
    const user = e.target[0].value;
    const code = e.target[2].value;
    const new_password = e.target[3].value;
    await Auth.forgotPasswordSubmit(user, code, new_password)
      .then((data) => {
        console.log(data);
        toast.success("Password reset successful");
        setpwdUpdate(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
    toggle();
  };

  return (
    <div
      class="d-flex-inline text-center "
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <h1 style={{ "text-align": "center", margin: "10px" }}>
        Update password
      </h1>
      {pwdUpdated ? (
        <>
          <Redirect to="/authenticate" />
          {window.location.reload()}
        </>
      ) : null}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="email"
            name="user_email"
            placeholder="user email"
            value={values.user_email}
            disabled={mailSent}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.user_email && (
            <p style={{ "text-align": "left" }}>{errors.user_email}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Button
            color="primary"
            style={{ "margin-bottom": "10px" }}
            size="sm"
            block
            type="button"
            onClick={() => sendMail()}
            color="primary"
          >
            {" "}
            {mailSent ? "Resend code" : "Get code"}
          </Button>
        </FormGroup>
        {mailSent ? (
          <>
            <FormGroup>
              <Input
                type="text"
                name="code"
                placeholder="verification code"
                disabled={!mailSent}
                value={values.code}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.code && (
                <p style={{ "text-align": "left" }}>{errors.code}</p>
              )}
            </FormGroup>
            <FormGroup>
              <div class="d-flex bd-highlight align-items-center">
                <Input
                  type={visibility.password ? "text" : "password"}
                  name="password"
                  placeholder="new password"
                  value={values.password}
                  disabled={!mailSent}
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
              <div class="d-flex bd-highlight align-items-center">
                <Input
                  type={visibility.confirm_password ? "text" : "password"}
                  name="confirm_password"
                  placeholder="confirm password"
                  value={values.confirm_password}
                  disabled={!mailSent}
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
              color="primary"
              style={{ "margin-bottom": "10px" }}
              size="sm"
              block
              type="submit"
              disabled={!mailSent}
              onClick={() => {
                toggle();
              }}
              color="success"
            >
              {loggingIn ? (
                <div class="container">
                  <Spinner class="align-right" size="sm" color="light" />
                </div>
              ) : (
                "Update password"
              )}
            </Button>
          </>
        ) : null}
        <Button
          color="primary"
          style={{ "margin-bottom": "10px" }}
          size="sm"
          block
          onClick={() => props.login()}
          color="primary"
        >
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
