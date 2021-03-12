import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const { email, password, name, confirmPassword } = inputs;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs({
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
      name,
      confirmPassword,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={onChangeHandler}
        />
        <label>Name</label>
        <input
          name="name"
          type="name"
          value={name}
          onChange={onChangeHandler}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChangeHandler}
        />
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChangeHandler}
        />
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
