import { UseAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PublickRoute() {
  const { currentUser } = UseAuth();

  return !currentUser ? <Outlet /> : <Navigate to="/" replace />;
}
