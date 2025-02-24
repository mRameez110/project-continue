import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../utils/auth";
import { showErrorToast, showSuccessToast } from "../utils/errorHandling";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ userName, email, password, role });
      navigate("/login");
      console.log("See Signup response ", response);
      showSuccessToast(response.data.message);
    } catch (error) {
      console.error("Signup failed:", error);
      showErrorToast(error);
    }
  };

  return (
    <div className="mt-20">
      <form
        className="max-w-md mx-auto bg-white p-6 rounded shadow-md"
        onSubmit={handleSignup}
      >
        <h2 className="text-xl font-bold mb-4">Create an account</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="w-full p-2 border rounded mb-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="patient">Patient</option>
          <option value="pharmacist">Pharmacist</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 mt-4 text-white px-4 py-2 rounded w-full"
        >
          REIGSTER
        </button>
        <p className="mt-2 text-center text-sm/6 text-gray-500">
          Already have account?{" "}
          <Link
            to="/login"
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-950"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
