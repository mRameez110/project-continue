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

export const signup = async ({ userName, email, password, role }) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      {
        userName,
        email,
        password,
        role,
      }
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
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const isAuthenticated = () => !!localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("userRole");
export const getUserId = () => localStorage.getItem("userId");
export const getUserName = () => localStorage.getItem("userName");

export const logout = () => localStorage.clear();
