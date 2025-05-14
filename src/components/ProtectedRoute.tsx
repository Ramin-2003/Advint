import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) return null;

  const isConfirmed = user?.email_verified;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isConfirmed) {
    return <Navigate to="/confirm" />;
  }

  return <>{children}</>;
}
