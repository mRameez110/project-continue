import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="mt-20">
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto bg-white p-6 rounded shadow-md"
        autoComplete="on"
      >
        <h2 className="flex items-center justify-center text-2xl font-bold mb-8">
          Login to your account
        </h2>

        <label className="block text-gray-700 font-medium my-2">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email@gmail.com"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block text-gray-700 font-medium my-2">Password</label>
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
          className="bg-green-500 mt-4 text-white px-4 py-2 rounded w-full"
        >
          LOGIN
        </button>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don't have account?{" "}
          <Link
            to="/signup"
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-950"
          >
            Create here
          </Link>
        </p>

        <p className="mt-4 text-center text-sm/6 text-gray-500">
          Forgot Password?{" "}
          <Link
            to="/forgot-password"
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-950"
          >
            Click here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
