import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { dashboard } from "../../reducers/dashboard";
import { connect } from "react-redux";
import { setAlert } from "../../reducers/alert";
import { Navbar } from "../layout/Navbar";

const Dashboard = ({ dashboard, message, setAlert }) => {
  const email = localStorage.getItem("email");
  const setMessage = async () => {
    await dashboard();
    console.log(process.env.REACT_APP_BACKEND_URL);
  };
  useEffect(() => {
    setMessage();
  }, [message]);
  return message == null ? (
    <p>reload if you can see this message</p>
  ) : (
    <div>
      <Navbar />
      Welcome!
      <div>{message}</div>
      <div>{email}</div>
    </div>
  );
};

Dashboard.propTypes = {
  setAlert: PropTypes.func.isRequired,
  dashboard: PropTypes.func.isRequired,
  message: PropTypes.string,
};
const mapStateToProps = (state) => ({
  message: state.dashboard.message,
});

export default connect(mapStateToProps, { setAlert, dashboard })(Dashboard);
