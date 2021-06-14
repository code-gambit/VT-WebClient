import React, { useState } from "react";
import {Button,Form,FormGroup,Input} from "reactstrap";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

const ChangeName=(props)=>{
  const [values, setValues] = useState({
    new_username:""
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const updateUsername = async (e) => {
    e.preventDefault();
    if(!values.new_username){
      toast.error("Please provide a username")
      return;
    }
    const user = await Auth.currentAuthenticatedUser();
    const newName = e.target[0].value;
    Auth.updateUserAttributes(user, {
      name: newName,
    })
      .then((res) => {
        toast.success("User name updated successfully");
        props.toggleMain();
      })
      .catch((err) => toast.error(err.message));
  };

  return(
    <>
    <Form style={{ "marginTop": "5px" }} onSubmit={updateUsername}>
      <FormGroup>
        <Input
          type="text"
          name="new_username"
          id="new_username"
          placeholder="new username"
          value={values.new_username}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Button type="submit" color="primary">
          Update username
        </Button>
      </FormGroup>
    </Form>
    </>
  )
}

export default ChangeName
