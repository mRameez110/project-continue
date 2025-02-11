// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ role, children }) => {
//   const { userRole } = useAuth();

//   if (!userRole) {
//     return <Navigate to="/login" />;
//   }

//   if (userRole !== role) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ role }) => {
//   const { userRole } = useAuth();

//   if (userRole === null) {
//     return <Navigate to="/login" replace />;
//   }

//   if (role && userRole !== role) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

// import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
