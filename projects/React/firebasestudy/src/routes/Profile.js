import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router";

const Profile = () => {
  const history = useHistory();
  const onLogout = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <div>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
