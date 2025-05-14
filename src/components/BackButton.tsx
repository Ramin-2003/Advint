import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    const referrer = document.referrer;
    const isInternal = referrer && referrer.startsWith(window.location.origin);

    if (isInternal) {
      navigate(-1); // Go back in history
    } else {
      navigate("/"); // Fallback to homepage
    }
  };

  return (
    <button onClick={handleBack} className="back-button" aria-label="Go back">
      <i className="bi bi-arrow-left-circle" id="back-arrow"></i>
    </button>
  );
}

export default BackButton;
