// // src/routes/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const userRole = localStorage.getItem("role");

//   if (!userRole || !allowedRoles.includes(userRole)) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" />;
//   if (!allowedRoles.includes(user.role)) return <Navigate to="/home" />;

//   return children;
// };

// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const { user } = useContext(AuthContext);

//   if (!user || !allowedRoles.includes(user.role)) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // ✅ Correct import

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { userRole } = useAuth(); // ✅ Get userRole from useAuth

//   if (!userRole) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(userRole)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

// import { Navigate, Outlet } from "react-router-dom";
// import { isAuthenticated, getUserRole } from "../utils/auth";

// const ProtectedRoute = ({ allowedRoles }) => {
//   if (!isAuthenticated()) return <Navigate to="/login" />;
//   if (!allowedRoles.includes(getUserRole()))
//     return <Navigate to="/unauthorized" />;
//   return <Outlet />;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth"; // Adjust the import path as needed

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = getUserRole();
  const token = isAuthenticated();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
