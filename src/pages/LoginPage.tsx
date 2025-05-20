import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { loginWithGoogle } from "../utils/cognito";
import "./AuthFlow.css";

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
      <div className="page">
        <div className="container">
          <h1>Log in to Your Account</h1>
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

            {message && <div className="error-message">{message}</div>}

            <button type="submit" className="submit-button">
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

          <div className="options">
            <a href="/forgot">Forgot password?</a>
            <a href="/signup">Create an account</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
