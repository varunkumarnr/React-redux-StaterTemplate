import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { setAlert } from "../../reducers/alert";
import { tokenValidation } from "../../reducers/auth";
import Alert from "../layout/Alert";
import dashboard from "../../reducers/dashboard";
const TokenContainer = ({ setAlert, tokenValidation, isAuthenticated }) => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [formData, setFormData] = useState({
    email: email,
    token: "",
  });
  const { token } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (token.length !== 6 || isNaN(token)) {
      setAlert({
        msg: "Enter a valid Token",
        alertType: "danger",
        timeout: 4000,
      });
    } else {
      await tokenValidation({ email, token });
      if (isAuthenticated) {
        navigate("dashboard");
      } else {
        setAlert({
          msg: "Enter a valid Token",
          alertType: "danger",
          timeout: 4000,
        });
      }
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="login-container">
      <form className="login-form bounceInDown" onSubmit={(e) => onSubmit(e)}>
        <div className="login-form-inner">
          <h2>Verify Email</h2>
          <p className="login-subtitle">Enter code sent to {email}</p>
          <Alert />
          <div className="form-group">
            <div id="email-label">Token &nbsp;</div>
            <input
              type="text"
              name="token"
              value={token}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="authForm-btn" value="Verify"></input>
          <p className="Auth-Redirect">
            Didn't recieve Token? <Link to="/login">Request Again</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

TokenContainer.propTypes = {
  setAlert: PropTypes.func.isRequired,
  tokenValidation: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setAlert,
  tokenValidation,
})(TokenContainer);
