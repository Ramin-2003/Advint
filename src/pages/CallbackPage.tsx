import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleGoogleCallback } from "../utils/cognito";
import { useAuth } from "../utils/useAuth";

function CallbackPage() {
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Authenticating...");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setMessage("Missing authorization code.");
      return;
    }

    const exchangeCode = async () => {
      const res = await handleGoogleCallback(code);

      if (res.success) {
        navigate("/dashboard");
      } else {
        setMessage("Google login failed. Please try again.");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    exchangeCode();
  }, [searchParams, navigate]);

  return (
    <div className="callback-page">
      <h2>{message}</h2>
    </div>
  );
}

export default CallbackPage;
