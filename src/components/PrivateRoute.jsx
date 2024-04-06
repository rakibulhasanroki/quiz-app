import { UseAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = UseAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}
