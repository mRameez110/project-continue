import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getUserRole();
  const dashboardPaths = {
    admin: "/admin-dashboard",
    pharmacist: "/pharmacist-dashboard",
    patient: "/patient-dashboard",
  };

  return <Navigate to={dashboardPaths[role] || "/dashboard"} replace />;
};

export default PrivateRoute;
