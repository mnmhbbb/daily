import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    Email: "",
    Name: "",
    Password: "",
    ConfirmPassword: "",
  });

  const { Email, Name, Password, ConfirmPassword } = inputs;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 일치해야 합니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          name="Email" //
          type="email"
          value={Email}
          onChange={onChangeHandler}
        />
        <label>Name</label>
        <input
          name="Name"
          type="text"
          value={Name}
          onChange={onChangeHandler}
        />
        <label>Password</label>
        <input
          name="Password"
          type="password"
          value={Password}
          onChange={onChangeHandler}
        />
        <label>Confirm Password</label>
        <input
          name="ConfirmPassword"
          type="password"
          value={ConfirmPassword}
          onChange={onChangeHandler}
        />
        <br />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
