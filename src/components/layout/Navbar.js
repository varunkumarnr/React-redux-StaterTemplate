import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Styles/Navbar.css";
import "./Scripts/Navbar";
import { Link } from "react-router-dom";
import { logout } from "../../reducers/auth";
const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a className="h" id="AboutNav" href="#about">
          Post
        </a>
      </li>
      <li>
        <a className="h" id="FeaturesNav" href="#features">
          User
        </a>
      </li>
      <li>
        <Link onClick={logout} className="h" id="ContactNav" href="#contact">
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <a className="h" id="AboutNav" href="#about">
          Login
        </a>
      </li>
      <li>
        <a className="h" id="FeaturesNav" href="#features">
          About
        </a>
      </li>
      <li>
        <a className="h" id="ContactNav" href="#contact">
          Contact
        </a>
      </li>
    </ul>
  );

  return (
    <div>
      <header className="header">
        <h1>
          Publicis<span> Sapient</span>
        </h1>
        {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </header>
    </div>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
