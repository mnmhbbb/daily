import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React from "react";

const Auth = () => {
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
      <AuthForm />
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
