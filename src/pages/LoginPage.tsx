import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { loginWithGoogle } from "../utils/cognito";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await login(email, password);

    if (res.success) {
      navigate("/dashboard");
    } else {
      setMessage(res.message ?? "");
    }
  };

  const handleGoogle = () => {
    loginWithGoogle();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <>
      <a href="/">
        <i className="bi bi-arrow-left-circle" id="back-arrow"></i>
      </a>
      <div className="login-page">
        <div className="login-container">
          <h1>Login to Your Account</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message && <div className="error-message">{message}</div>}

            <button type="submit" className="login-button">
              Log In
            </button>

            <button
              type="button"
              className="Google-button"
              onClick={handleGoogle}
            >
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
