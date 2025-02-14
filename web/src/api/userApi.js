// import axios from "axios";
// import { getToken, getUserId, getUserRole } from "../utils/auth";

// const API_BASE_URL = "http://localhost:8000/api"; // Change as needed

// export const fetchProfile = async () => {
//   try {
//     const token = getToken();
//     if (!token) throw new Error("No authentication token found!");

//     const userId = getUserId();
//     const role = getUserRole();

//     let endpoint;
//     if (role === "patient") {
//       endpoint = `${API_BASE_URL}/patients/${userId}`;
//     } else if (role === "pharmacist") {
//       endpoint = `${API_BASE_URL}/pharmacists/${userId}`;
//     } else {
//       throw new Error("Invalid user role");
//     }

//     const response = await axios.get(endpoint, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response;
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     throw error;
//   }
// };
