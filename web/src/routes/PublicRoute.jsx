import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

const PublicRoute = () => {
  if (isAuthenticated()) {
    const role = getUserRole();
    const dashboardPaths = {
      admin: "/admin-dashboard",
      pharmacist: "/pharmacist-dashboard",
      patient: "/patient-dashboard",
    };

    return <Navigate to={dashboardPaths[role] || "/dashboard"} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
