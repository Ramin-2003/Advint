import React from "react";
import { useAuth } from "../utils/useAuth";
import "./NavBar.css";

function NavBar() {
  const { isLoggedIn } = useAuth();

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
        {!isLoggedIn && (
          <>
            <a href="/login" className="login-link">
              Login
            </a>
            <a href="#consultation" className="consultation-button">
              Book A Consultation
              <i className="bi bi-arrow-right-circle-fill" id="arrow-right"></i>
            </a>
          </>
        )}

        {isLoggedIn && (
          <>
            <a href="/profile" className="login-link">
              <i className="bi bi-person-circle" id="arrow-right"></i>
            </a>

            <a href="/dashboard" className="consultation-button">
              Dashboard
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
