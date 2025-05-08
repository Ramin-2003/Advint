import React from "react";
import "./LoginPage.css";

function LoginPage() {
  return (
    <>
      <a href="/">
        <i className="bi bi-arrow-left-circle" id="back-arrow"></i>
      </a>
      <div className="login-page">
        <div className="login-container">
          <h1>Login to Your Account</h1>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
            <button type="submit" className="Google-button">
              Continue With Google
            </button>
          </form>
          <div className="login-options">
            <a href="/forgot">Forgot password?</a>
            <a href="/signup">Create an account</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
