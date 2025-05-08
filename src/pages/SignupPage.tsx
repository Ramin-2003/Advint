import React from "react";
import "./SignupPage.css";

function SignupPage() {
  return (
    <>
      <a href="/">
        <i className="bi bi-arrow-left-circle" id="back-arrow"></i>
      </a>
      <div className="signup-page">
        <div className="signup-container">
          <h1>Create Your Account</h1>
          <form className="signup-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input type="confirm" id="confirm" name="confirm" required />
            </div>
            <button type="submit" className="signup-button">
              Create
            </button>
            <button type="submit" className="Google-button">
              Continue With Google
            </button>
          </form>
          <div className="signup-options">
            <a href="/forgot">Forgot password?</a>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
