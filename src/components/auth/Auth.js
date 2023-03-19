import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../layout/Navbar";
import LoginContainer from "./LoginContainer";
import "./Styles/Auth.css";
import TokenContainer from "./TokenContainer";
const Auth = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    setToken(token);
  }, [token]);
  useEffect(() => {
    if (token && token !== null) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  if (token) {
    navigate("/dashboard");
  } else {
    return (
      <Fragment>
        <div className="Auth-Form">
          <Navbar />
          {window.location.pathname === "/login" && <LoginContainer />}
          {window.location.pathname === "/token" && <TokenContainer />}
        </div>
      </Fragment>
    );
  }
};

export default Auth;
