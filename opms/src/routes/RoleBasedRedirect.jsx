// src/routes/RoleBasedRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  useEffect(() => {
    if (role === "admin") navigate("/admin-dashboard");
    else if (role === "pharmacist") navigate("/pharmacist-dashboard");
    else if (role === "patient") navigate("/patient-dashboard");
    else navigate("/");
  }, [navigate, role]);

  return null;
};

export default RoleBasedRedirect;
