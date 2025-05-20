import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { loginWithGoogle } from "../utils/cognito";
import "./AuthFlow.css";

function SignupPage() {
  const { signup } = useAuth();
  const { isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    const result = await signup(email, password);

    if (result.success) {
      localStorage.setItem("signup_email", email);
      localStorage.setItem("signup_password", password);
      setMessage("Account created! Please check your email to confirm.");
      navigate("/confirm");
    } else {
      setMessage(result.message ?? "");
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
      <div className="page">
        <div className="container">
          <h1>Sign up for SynapSocial</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group floating-label">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-group floating-label">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-group floating-label">
              <input
                type="password"
                id="confirm"
                name="confirm"
                placeholder=" "
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <label htmlFor="confirm">Confirm Password</label>
            </div>

            {message && <div className="error-message">{message}</div>}

            <button type="submit" className="submit-button">
              Sign up
            </button>

            <button
              type="button"
              className="Google-button"
              onClick={handleGoogle}
            >
              Continue With Google
            </button>
          </form>

          <div className="options">
            <a href="/forgot">Forgot password?</a>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
