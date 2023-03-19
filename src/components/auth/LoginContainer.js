import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../../reducers/alert";
import Alert from "../layout/Alert";
import { useDispatch } from "react-redux";
import { login, setUserEmail } from "../../reducers/auth";

const LoginContainer = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const dispatch = useDispatch();
  const { email } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sapientEmailRegex = /^[^\s@]+@publicissapient\.com$/;
    if (email === "" || !emailRegex.test(email)) {
      dispatch(
        setAlert({
          msg: "Please enter a valid email address",
          alertType: "danger",
          timeout: 4000,
        })
      );
    } else if (!sapientEmailRegex.test(email)) {
      dispatch(
        setAlert({
          msg: "Your Email does't belong to Sapient network",
          alertType: "danger",
          timeout: 4000,
        })
      );
    } else {
      dispatch(
        setAlert({
          msg: "logged In check your email for the token",
          alertType: "success",
          timeout: 4000,
        })
      );
      dispatch(login({ email }));
      dispatch(setUserEmail(email));
      navigate("/token");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form bounceInDown" onSubmit={(e) => onSubmit(e)}>
        <div className="login-form-inner">
          <h2>Welcome Back!</h2>
          <p className="login-subtitle">Enter your Sapient email</p>
          <Alert />
          <div className="form-group">
            <div id="email-label">Email &nbsp;</div>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="authForm-btn" value="Login"></input>
          <p className="Auth-Redirect">
            Don't have an account?{" "}
            <Link to="/token">Check how to make one</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginContainer;
