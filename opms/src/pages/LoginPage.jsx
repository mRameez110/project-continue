// // import { useState } from "react";

// // const LoginPage = () => {
// //   const [formData, setFormData] = useState({ email: "", password: "" });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Login Data:", formData);
// //   };

// //   return (
// //     <section className="flex flex-col items-center justify-center h-screen text-center">
// //       <h1 className="text-4xl font-bold mb-6">Login</h1>
// //       <form
// //         onSubmit={handleSubmit}
// //         className="w-96 p-6 bg-white shadow-md rounded"
// //       >
// //         <div className="mb-4">
// //           <label className="block text-left mb-2">Email:</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //             className="w-full px-3 py-2 border rounded"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-left mb-2">Password:</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //             className="w-full px-3 py-2 border rounded"
// //           />
// //         </div>
// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 text-white py-2 rounded"
// //         >
// //           Login
// //         </button>
// //       </form>
// //     </section>
// //   );
// // };

// // export default LoginPage;

// const LoginPage = () => {
//   return (
//     <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
//       <h1 className="text-4xl font-bold mb-6">Login</h1>
//       <form className="w-full max-w-sm bg-white p-6 shadow-md rounded">
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
//           Login
//         </button>
//       </form>
//     </section>
//   );
// };
// export default LoginPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import { useAuth } from "@/context/AuthContext";
// // import { useAuth } from "../../context/AuthContext";

// import { useAuth } from "../context/AuthContext";

// const LoginPage = () => {
//   const [selectedRole, setSelectedRole] = useState("");
//   const { setUserRole } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (selectedRole) {
//       setUserRole(selectedRole);
//       navigate(`/dashboard/${selectedRole}`); // Redirect based on role
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>

//       <select
//         value={selectedRole}
//         onChange={(e) => setSelectedRole(e.target.value)}
//         className="p-2 border rounded mb-4"
//       >
//         <option value="">Select Role</option>
//         <option value="admin">Admin</option>
//         <option value="patient">Patient</option>
//         <option value="pharmacist">Pharmacist</option>
//       </select>

//       <button
//         onClick={handleLogin}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default LoginPage;

// import { useState } from "react";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login Data:", formData);
//     // Perform authentication logic here
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // 🔹 Dummy user data for testing
//     console.log("loged press");
//     const users = {
//       "admin@example.com": "admin",
//       "patient@example.com": "patient",
//       "pharmacist@example.com": "pharmacist",
//     };

//     if (users[email]) {
//       localStorage.setItem("userRole", users[email]); // Save role in localStorage
//       navigate(`/${users[email]}-dashboard`);
//     } else {
//       alert("Invalid email or password!");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

// src/pages/Login.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const response = await fetch("/api/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();

//     if (data.success) {
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("userId", data.userId);

//       // Redirect user based on role
//       if (data.role === "admin") navigate("/admin-dashboard");
//       else if (data.role === "pharmacist") navigate("/pharmacist-dashboard");
//       else navigate("/patient-dashboard");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleLogin} className="p-4 bg-white shadow-md rounded">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded mb-2"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded mb-2"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../utils/auth";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await login({ email, password });
//       console.log("see login response ", response);
//       console.log("see login response ", response.data.token);
//       console.log("see login response ", response.data.user);
//       console.log("see login response ", response.data.user.role);
//       console.log("see login response ", response.data.user._id);

//       // Storing values in localStorage
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("userRole", response.data.user.role);
//       localStorage.setItem("userId", response.data.user._id);
//       localStorage.setItem("userName", response.data.user.userName);

//       console.log(
//         "Token from localStorage:",
//         localStorage.getItem("token"),
//         "Role from localStorage:",
//         localStorage.getItem("userRole"),
//         "User ID from localStorage:",
//         localStorage.getItem("userId"),
//         "User Name from localStorage:",
//         localStorage.getItem("userName")
//       );

//       toast.success("Login successful!");

//       if (response.data.user.role === "patient") {
//         navigate("/patient-dashboard");
//       } else if (response.data.user.role === "pharmacist") {
//         navigate("/pharmacist-dashboard");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Login failed! Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
//           Log In
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
//             >
//               Log In
//             </button>
//           </div>
//         </form>
//         <p className="mt-4 text-center text-gray-600">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-indigo-600 hover:underline">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../utils/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login({ email, password });
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("userRole", response.data.user.role);
//       localStorage.setItem("userId", response.data.user._id);
//       localStorage.setItem("userName", response.data.user.userName);

//       const dashboardRoutes = {
//         admin: "/admin-dashboard",
//         pharmacist: "/pharmacist-dashboard",
//         patient: "/patient-dashboard",
//       };

//       navigate(dashboardRoutes[response.data.user.role] || "/");
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleLogin}
//       className="max-w-md mx-auto bg-white p-6 rounded shadow-md"
//     >
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full p-2 border rounded mb-2"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full p-2 border rounded mb-2"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

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

      navigate(dashboardRoutes[response.data.user.role] || "/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto bg-white p-6 rounded shadow-md"
      autoComplete="on" // Enable browser autofill
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email" // Allow autofill for email field
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password" // Allow autofill for password field
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
