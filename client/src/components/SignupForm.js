import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

// import apollo hook
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const SignupForm = () => {
  // set state for the user
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  //  form validation
  const [validated] = useState(false);
  // alert
  const [showAlert, setShowAlert] = useState(false);

  // declared the addUser
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
//submit function
  let handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // use to  addUser function
    try {
      let { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };
//html form alerts
  return (
    <>
     
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
       
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
             YOUR SIGN UP HAS BEEN INTERRUPTED
        </Alert>
      
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
          A Password is needed.
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
//export sign up form to be used for the app
export default SignupForm;
