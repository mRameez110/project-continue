// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { getUserRole } from "../../utils/auth";
// import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const EditPharmacist = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const userRole = getUserRole();

//   const [fullName, setFullName] = useState("");
//   const [age, setAge] = useState("");
//   const [contact, setContact] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPharmacist = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No authentication token found!");
//         }

//         const response = await axios.get(
//           `${API_BASE_URL}/api/pharmacists/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const { fullName, age, contact } = response.data.user;
//         setFullName(fullName || "N/A");
//         setAge(age || "N/A");
//         setContact(contact || "N/A");
//       } catch (err) {
//         console.error("Error fetching pharmacist:", err);
//         setError("Failed to load pharmacist details.");
//         showErrorToast(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPharmacist();
//   }, [id]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     let numericAge = Number(age);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `${API_BASE_URL}/api/pharmacists/${id}`,
//         { fullName, age: numericAge, contact },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       showSuccessToast(response.data.message);
//       navigate(`/${userRole}/pharmacists`);
//     } catch (error) {
//       console.error("Error updating pharmacist:", error);
//       showErrorToast(error);
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Pharmacist</h1>
//       <form
//         className="bg-white shadow-md rounded-lg p-6"
//         onSubmit={handleUpdate}
//       >
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium">Name</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded-md"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />

//           <label className="block text-gray-700 font-medium">Age</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded-md"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />

//           <label className="block text-gray-700 font-medium">Contact</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded-md"
//             value={contact}
//             onChange={(e) => setContact(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPharmacist;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserRole } from "../../utils/auth";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditPharmacist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = getUserRole();

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/pharmacists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { fullName, age, contact } = response.data.user;
        setFullName(fullName || "N/A");
        setAge(age || "N/A");
        setContact(contact || "N/A");
      } catch (err) {
        setError("Failed to load pharmacist details.");
        showErrorToast(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacist();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    let numericAge = age === "" ? "" : Number(age);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/api/pharmacists/${id}`,
        { fullName, age: numericAge, contact },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSuccessToast(response.data.message);
      navigate(`/${userRole}/pharmacists`);
    } catch (error) {
      showErrorToast(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Pharmacist</h1>
      <form
        className="bg-white shadow-md rounded-lg p-6"
        onSubmit={handleUpdate}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label className="block text-gray-700 font-medium">Age</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="block text-gray-700 font-medium">Contact</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Update Pharmacist
        </button>
      </form>
    </div>
  );
};

export default EditPharmacist;
