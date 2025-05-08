import React from "react";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  return (
    <>
      <a href="/">
        <i className="bi bi-arrow-left-circle" id="back-arrow"></i>
      </a>
      <div className="forgot-page">
        <div className="forgot-container">
          <h1>Recover Password</h1>
          <form className="forgot-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <button type="submit" className="forgot-button">
              Send Recovery Email
            </button>
          </form>
          <div className="forgot-options">
            <a href="/signup">Create Account</a>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
