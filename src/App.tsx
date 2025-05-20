import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar.tsx";
import HomePage from "./pages/HomePage.tsx";
import FeaturesPage from "./pages/FeaturesPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import ConfirmEmailPage from "./pages/ConfirmEmailPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import CallbackPage from "./pages/CallbackPage.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import BackButton from "./components/BackButton.tsx";

function AppLayout() {
  const location = useLocation();
  const pathsWithoutNavBar = [
    "/login",
    "/signup",
    "/forgot",
    "/confirm",
    "/profile",
  ];
  const hideNavBar = pathsWithoutNavBar.includes(location.pathname);

  return (
    <>
      {hideNavBar ? <BackButton /> : <NavBar />}
      <main className={hideNavBar ? "content-full" : "content"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/forgot" element={<ForgotPasswordPage />}></Route>
          <Route path="/confirm" element={<ConfirmEmailPage />}></Route>
          <Route path="/callback" element={<CallbackPage />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <div className="app">
      <Router>
        <AppLayout />
      </Router>
    </div>
  );
}

export default App;
