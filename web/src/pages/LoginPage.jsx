import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import { showErrorToast, showSuccessToast } from "../utils/errorHandling";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.user.role);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("userName", response.data.user.userName);

      const dashboardRoutes = {
        admin: "/admin-dashboard",
        pharmacist: "/pharmacist-dashboard",
        patient: "/patient-dashboard",
      };

      showSuccessToast(response.data.message);
      navigate(dashboardRoutes[response.data.user.role] || "/");
    } catch (error) {
      console.error("Login failed:", error);
      showErrorToast(error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto bg-white p-6 rounded shadow-md"
      autoComplete="on"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
