import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="left">
        <a href="/">
          <div className="logo-placeholder"></div>
        </a>
        <ul className="nav-links">
          <li>
            <a href="/features" className="nav-link">
              Features
            </a>
          </li>
          <li>
            <a href="/pricing" className="nav-link">
              Pricing
            </a>
          </li>
          <li>
            <a href="/blog" className="nav-link">
              Blog
            </a>
          </li>
          <li>
            <a href="/faq" className="nav-link">
              FAQ
            </a>
          </li>
        </ul>
      </div>
      <div className="auth-container">
        <a href="/login" className="login-link">
          Login
        </a>
        <a href="#consultation" className="consultation-button">
          Book A Consultation
          <i className="bi bi-arrow-right-circle-fill" id="arrow-right"></i>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
