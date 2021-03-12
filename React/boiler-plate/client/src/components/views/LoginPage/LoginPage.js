import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

function LoginPage(props) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs({
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
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
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChangeHandler}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
