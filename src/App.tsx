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
import FaqPage from "./pages/FaqPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isForgotPasswordPage = location.pathname === "/forgot";
  const hideNavBar = isLoginPage || isSignupPage || isForgotPasswordPage;

  return (
    <>
      {!hideNavBar && <NavBar />}
      <main className={hideNavBar ? "content-full" : "content"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/forgot" element={<ForgotPasswordPage />}></Route>
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
