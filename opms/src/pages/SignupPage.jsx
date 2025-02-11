// const SignupPage = () => {
//   return (
//     <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
//       <h1 className="text-4xl font-bold mb-6">Signup</h1>
//       <form className="w-full max-w-sm bg-white p-6 shadow-md rounded">
//         <div className="mb-4">
//           <label className="block text-left mb-2">Name:</label>
//           <input type="text" className="w-full px-3 py-2 border rounded" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-left mb-2">Email:</label>
//           <input type="email" className="w-full px-3 py-2 border rounded" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-left mb-2">Password:</label>
//           <input type="password" className="w-full px-3 py-2 border rounded" />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded"
//         >
//           Signup
//         </button>
//       </form>
//     </section>
//   );
// };
// export default SignupPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await signup({ userName, email, password, role });
      console.log("see register response ", response);

      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", response.userId);

      toast.success("Registration successful! Please log in.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Signup failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              userName
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="patient">Patient</option>
              <option value="pharmacist">Pharmacist</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
