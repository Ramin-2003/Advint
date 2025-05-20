import React from "react";
import { logout } from "../utils/cognito";
import BackButton from "../components/BackButton";

function ProfilePage() {
  const handleLogout = () => {
    logout(); // clears everything and redirects
  };

  return (
    <>
      <div>Profile Page!</div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default ProfilePage;
