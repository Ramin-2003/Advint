import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../utils/useAuth";
import { useNavigate } from "react-router-dom";
import "./ConfirmEmailPage.css";

function ConfirmEmailPage() {
  const { confirmSignup, resendConfirmation, login } = useAuth();
  const { isLoggedIn } = useAuth();
  const [code, setCode] = useState("");
  const [email] = useState(() => localStorage.getItem("signup_email") || "");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Missing email. Please sign up again.");
      return;
    }

    const res = await confirmSignup(email, code);

    if (res.success) {
      setMessage("Email confirmed");

      const loginRes = await login(
        email,
        localStorage.getItem("signup_password") || ""
      );
      localStorage.removeItem("signup_password");
      if (loginRes.success) {
        navigate("/dashboard");
      } else {
        setMessage("Email confirmed");
        navigate("/login");
      }
    } else {
      setMessage(res.message ?? "");
    }
  };

  const handleResend = async () => {
    setMessage("");
    if (!email) {
      setMessage("Missing email. Please sign up again.");
      return;
    }

    const res = await resendConfirmation(email);
    setMessage(res.success ? "Confirmation code resent" : res.message ?? "");
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
      <div className="confirmation-page">
        <div className="confirmation-container">
          <h1>Enter confirmation code sent to your {email}</h1>
          <form className="confirmation-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                name="code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            {message && <div className="error-message">{message}</div>}

            <button type="submit" className="confirm-button">
              Confirm
            </button>
            <button type="button" className="resend" onClick={handleResend}>
              Resend confirmation code?
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ConfirmEmailPage;
