import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const socialLogin = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          required
          placeholder="Email"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          required
          placeholder="Password"
          onChange={onChange}
        />
        {error}
        <span onClick={toggleAccount}>
          {newAccount ? "Log In" : "Create Account"}
        </span>
        <button>{newAccount ? "Create Account" : "Log In"}</button>
      </form>
      <button onClick={socialLogin} name="google">
        Continue with Google
      </button>
      <button onClick={socialLogin} name="github">
        Continue with Gitgub
      </button>
    </>
  );
};

export default Auth;
