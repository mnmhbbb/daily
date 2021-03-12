import React, { useEffect } from "react";
import axios from "axios";

function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };
  return (
    <>
      <h1>hello</h1>
      <button onClick={onClickHandler}>Logout</button>
    </>
  );
}

export default LandingPage;
