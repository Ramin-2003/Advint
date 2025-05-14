import { useState, useEffect, useCallback } from "react";
import {jwtDecode} from "jwt-decode";
import {
  signIn,
  signUp,
  confirmSignUp,
  resendCode,
  forgotPassword,
  confirmForgotPassword,
  refreshSession,
  logout as cognitoLogout,
} from "./cognito";

// Define the shape of the decoded JWT
interface DecodedToken {
  email?: string;
  sub: string;
  exp: number;
  [key: string]: any;
}

export function useAuth() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  // Load and decode token on first render
  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
      } catch {
        localStorage.removeItem("id_token");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
  const tryRestoreSession = async () => {
    const token = localStorage.getItem("id_token");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const now = Date.now() / 1000;

        // If token is still valid, use it
        if (decoded.exp && decoded.exp > now) {
          setUser(decoded);
        } else {
          // Token expired – try to refresh
          const refreshRes = await refreshSession();
          if (refreshRes.success) {
            const newToken = localStorage.getItem("id_token");
            if (newToken) {
              const newDecoded = jwtDecode<DecodedToken>(newToken);
              setUser(newDecoded);
            }
          } else {
            setUser(null);
            logout(); 
          }
        }
      } 
      catch {
        setUser(null);
        logout(); 
        }
    }

    setLoading(false);
    };

    tryRestoreSession();
  }, []);

    useEffect(() => {
    const interval = setInterval(() => {
        refreshSession();
    }, 50 * 60 * 1000); // every 50 minutes

    return () => clearInterval(interval);
    }, []);

  // Helpers
  const login = async (email: string, password: string) => {
    const res = await signIn(email, password);
    if (res.success) {
      const token = localStorage.getItem("id_token");
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
      }
    }
    if (res.message === "Account not verified. Please check your email.") {
        localStorage.setItem("signup_email", email);
        localStorage.setItem("signup_password", password);
        window.location.href = "/confirm";
    }
    return res;
  };

  const logout = useCallback(() => {
    cognitoLogout();
    setUser(null);
  }, []);

  const signup = (email: string, password: string) => signUp(email, password);
  const confirmSignup = (email: string, code: string) => confirmSignUp(email, code);
  const resendConfirmation = (email: string) => resendCode(email);
  const requestPasswordReset = (email: string) => forgotPassword(email);
  const confirmPasswordReset = (email: string, code: string, newPassword: string) =>
    confirmForgotPassword(email, code, newPassword);

  const refresh = async () => {
    const res = await refreshSession();
    if (res.success) {
      const token = localStorage.getItem("id_token");
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
      }
    }
    return res;
  };

  return {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    logout,
    signup,
    confirmSignup,
    resendConfirmation,
    requestPasswordReset,
    confirmPasswordReset,
    refresh,
  };
}