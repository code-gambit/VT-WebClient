import React, { useState } from "react";
import {Button,Form,FormGroup,Input} from "reactstrap";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

const ChangePassword=(props)=>{
  const [isValid, setIsValid] = useState(true);
  const [errors, setError] = useState({});
  const [visibility, setVisibility] = useState({
    curr: false,
    pwd: false,
    cpwd: false,
  });
  const toggleVisibility = (field) =>
    setVisibility({ ...visibility, [field]: !visibility[field] });

  const [values, setValues] = useState({
    current_password: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const valid = () => {
    let errors = {};
    let isValid = true;
    if (!values.current_password) {
      isValid = false;
      errors.current_password = "Please provide current password";
    } else if (!values.password) {
      isValid = false;
      errors.password = "Please provide a new password";
    } else if (values.password.length < 8) {
      isValid = false;
      errors.password = "minimum 8 characters required";
    } else if (values.password != values.confirm_password) {
      isValid = false;
      errors.confirm_password = "Password do not match";
    }
    setError(errors);
    setIsValid(isValid);
  };

  const updatePassword = (e) => {
    e.preventDefault();
    const oldPassword = e.target[0].value;
    const newPassword = e.target[1].value;
    if (isValid) {
      Auth.currentAuthenticatedUser()
        .then((user) => {
          return Auth.changePassword(user, oldPassword, newPassword);
        })
        .then((data) => {
          toast.success("Password updated successfully");
          props.toggleMain();
        })
        .catch((err) => {
          if (err.code === "NotAuthorizedException" || err.code==="InvalidParameterException")
            toast.error("Incorrect password");
          else toast.error(err.message);
        });
    }
  };
  return(
    <>
    <Form style={{ "marginTop": "5px" }} onSubmit={updatePassword}>
      <FormGroup>
        <div class="d-flex bd-highlight align-items-center">
          <Input
            type={visibility.curr ? "text" : "password"}
            class="p-2 flex-grow-1 bd-highlight"
            name="current_password"
            id="current_password"
            placeholder="current password"
            value={values.current_password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <span
            onClick={() => {
              toggleVisibility("curr");
            }}
            class={visibility.curr?"fa fa-fw fa-eye-slash field_icon toggle-password m-n4":"fa fa-fw fa-eye field_icon toggle-password m-n4"}
          ></span>
        </div>
        {errors.current_password && (
          <p style={{ "textAlign": "left" }}>
            {errors.current_password}
          </p>
        )}
      </FormGroup>
      <FormGroup>
        <div class="d-flex bd-highlight align-items-center">
          <Input
            type={visibility.pwd ? "text" : "password"}
            name="password"
            id="password"
            placeholder="new password"
            value={values.password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <span
            onClick={() => {
              toggleVisibility("pwd");
            }}
            class={visibility.pwd?"fa fa-fw fa-eye-slash field_icon toggle-password m-n4":"fa fa-fw fa-eye field_icon toggle-password m-n4"}
          ></span>
        </div>
        {errors.password && (
          <p style={{ "textAlign": "left" }}>{errors.password}</p>
        )}
      </FormGroup>
      <FormGroup>
        <div class="d-flex bd-highlight align-items-center">
          <Input
            type={visibility.cpwd ? "text" : "password"}
            name="confirm_password"
            id="confirm_password"
            placeholder="confirm password"
            value={values.confirm_password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <span
            onClick={() => {
              toggleVisibility("cpwd");
            }}
            class={visibility.cpwd?"fa fa-fw fa-eye-slash field_icon toggle-password m-n4":"fa fa-fw fa-eye field_icon toggle-password m-n4"}
          ></span>
        </div>
        {errors.confirm_password && (
          <p style={{ "textAlign": "left" }}>
            {errors.confirm_password}
          </p>
        )}
      </FormGroup>
      <FormGroup>
        <Button
          color="primary"
          type="submit"
          onClick={() => {
            valid();
          }}
        >
          {" "}
          Update password{" "}
        </Button>
      </FormGroup>
    </Form>
    </>
  )
}

export default ChangePassword;
