// import axios from "axios";

// export const signup = async ({ userName, email, password, role }) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:8000/api/auth/register",
//       {
//         userName,
//         email,
//         password,
//         role,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Signup error:", error);
//     throw error;
//   }
// };

// export const login = async ({ email, password }) => {
//   try {
//     const response = await axios.post("http://localhost:8000/api/auth/login", {
//       email,
//       password,
//     });
//     return response;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };

// export const isAuthenticated = () => !!localStorage.getItem("token");
// export const getUserRole = () => localStorage.getItem("userRole");
// export const getUserId = () => localStorage.getItem("userId");
// export const getUserName = () => localStorage.getItem("userName");

// export const logout = () => localStorage.clear();

import axios from "axios";

let token = null; // ✅ Store token in memory

export const signup = async ({ userName, email, password, role }) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      { userName, email, password, role }
    );
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post("http://localhost:8000/api/auth/login", {
      email,
      password,
    });

    token = response.data.token; // ✅ Store in memory
    localStorage.setItem("token", token);
    localStorage.setItem("userId", response.data.user._id);
    localStorage.setItem("userRole", response.data.user.role);
    localStorage.setItem("userName", response.data.user.userName);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// ✅ Optimized token retrieval
export const getToken = () => {
  if (!token) token = localStorage.getItem("token");
  return token;
};

export const isAuthenticated = () => !!getToken();
export const getUserRole = () => localStorage.getItem("userRole");
export const getUserId = () => localStorage.getItem("userId");
export const getUserName = () => localStorage.getItem("userName");

export const logout = () => {
  token = null; // ✅ Clear token from memory
  localStorage.clear();
};
