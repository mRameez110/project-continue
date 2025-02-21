import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getToken } from "../utils/auth";

const ProtectedRoute = () => {
  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
