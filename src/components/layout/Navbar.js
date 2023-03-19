import React from "react";
import "./Styles/Navbar.css";
import "./Scripts/Navbar";
export const Navbar = () => {
  return (
    <div>
      <header className="header">
        <h1>
          Publicis<span> Sapient</span>
        </h1>
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
      </header>
    </div>
  );
};
