import React, { useState } from "react";
import { useAuth } from "../utils/useAuth";
import "./AuthFlow.css";

function ForgotPasswordPage() {
  const { requestPasswordReset, confirmPasswordReset } = useAuth();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stage, setStage] = useState<"request" | "confirm">("request");
  const [message, setMessage] = useState("");

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await requestPasswordReset(email);
    if (res.success) {
      setMessage("Recovery email sent. Please check your inbox.");
      setStage("confirm");
    } else {
      setMessage(res.message ?? "");
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await confirmPasswordReset(email, code, newPassword);
    if (res.success) {
      setMessage("Password reset successful. You can now log in.");
    } else {
      setMessage(res.message ?? "");
    }
  };

  return (
    <>
      <div className="page">
        <div className="container">
          <h1>Recover Password</h1>
          {stage === "request" ? (
            <form className="form" onSubmit={handleRequest}>
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

              {message && <div className="error-message">{message}</div>}

              <button type="submit" className="submit-button">
                Send Recovery Email
              </button>
            </form>
          ) : (
            <form className="form" onSubmit={handleConfirm}>
              <div className="form-group floating-label">
                <input
                  type="text"
                  id="code"
                  name="code"
                  placeholder=" "
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <label htmlFor="code">Verification Code</label>
              </div>

              <div className="form-group floating-label">
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder=" "
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="newPassword">New Password</label>
              </div>

              {message && <div className="error-message">{message}</div>}

              <button type="submit" className="submit-button">
                Reset Password
              </button>
            </form>
          )}

          <div className="options">
            <a href="/signup">Create Account</a>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
