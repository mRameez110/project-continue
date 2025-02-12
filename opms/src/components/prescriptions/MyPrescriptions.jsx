// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Placeholder data for prescriptions
// const dummyPrescriptions = [
//   { id: 1, medicine: "Aspirin", date: "2025-02-01", doctor: "Dr. John Doe" },
//   {
//     id: 2,
//     medicine: "Ibuprofen",
//     date: "2025-01-15",
//     doctor: "Dr. Jane Smith",
//   },
//   {
//     id: 3,
//     medicine: "Paracetamol",
//     date: "2025-01-20",
//     doctor: "Dr. Mark Lee",
//   },
//   // Add more dummy data if needed
// ];

// const MyPrescriptions = () => {
//   const [prescriptions, setPrescriptions] = useState(dummyPrescriptions);
//   const navigate = useNavigate();

//   // Fetch prescriptions from API (placeholder for now)
//   useEffect(() => {
//     // You can replace this with an actual API call later
//     // fetch("YOUR_API_ENDPOINT")
//     //   .then((res) => res.json())
//     //   .then((data) => setPrescriptions(data))
//     //   .catch((error) => console.error("Error fetching prescriptions:", error));
//   }, []);

//   // Handle row click to navigate to prescription detail page
//   const handlePrescriptionClick = (id) => {
//     navigate(`/patient/prescriptions/${id}`); // Navigate to detail page
//   };

//   return (
//     <div className="bg-white p-6 shadow-md rounded-md">
//       <h2 className="text-xl font-semibold mb-4">My Prescriptions</h2>
//       <table className="min-w-full table-auto border-collapse">
//         <thead>
//           <tr>
//             <th className="border-b p-2">Medicine</th>
//             <th className="border-b p-2">Date</th>
//             <th className="border-b p-2">Doctor</th>
//           </tr>
//         </thead>
//         <tbody>
//           {prescriptions.map((prescription) => (
//             <tr
//               key={prescription.id}
//               className="hover:bg-gray-100 cursor-pointer"
//               onClick={() => handlePrescriptionClick(prescription.id)}
//             >
//               <td className="border-b p-2">{prescription.medicine}</td>
//               <td className="border-b p-2">{prescription.date}</td>
//               <td className="border-b p-2">{prescription.doctor}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyPrescriptions;

//
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getUserRole, getUserId } from "../../utils/auth";

// const prescriptions = [
//   {
//     id: "p1",
//     patientId: "user123",
//     pharmacistId: "pharma567",
//     creator: "Dr. Ahmed",
//     date: "2024-02-12",
//   },
//   {
//     id: "p2",
//     patientId: "user456",
//     pharmacistId: "pharma789",
//     creator: "Dr. Sarah",
//     date: "2024-02-11",
//   },
// ];

// const MyPrescriptions = () => {
//   const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
//   const role = getUserRole();
//   const userId = getUserId();

//   useEffect(() => {
//     if (role === "patient") {
//       setFilteredPrescriptions(prescriptions.filter((p) => p));
//     } else if (role === "pharmacist") {
//       setFilteredPrescriptions(
//         prescriptions.filter((p) => p.pharmacistId === userId)
//       );
//     } else if (role === "admin") {
//       setFilteredPrescriptions(prescriptions);
//     }
//   }, [role, userId]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Prescriptions</h2>
//       {filteredPrescriptions.length === 0 ? (
//         <p>No prescriptions found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-200">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">Prescription Creator</th>
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPrescriptions.map((prescription) => (
//                 <tr key={prescription.id} className="text-center">
//                   <td className="border p-2">{prescription.creator}</td>
//                   <td className="border p-2">{prescription.date}</td>
//                   <td className="border p-2">
//                     <Link
//                       to={`/patient/prescriptions/${prescription.id}`}
//                       className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
//                     >
//                       View
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyPrescriptions;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const MyPrescriptions = ({ role, userId }) => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         let endpoint = "/api/prescriptions";
//         if (role === "patient") {
//           endpoint += `?patientId=${userId}`;
//         } else if (role === "pharmacist") {
//           endpoint += `?pharmacistId=${userId}`;
//         }
//         // Admin gets all prescriptions by default
//         const response = await fetch(endpoint);
//         const data = await response.json();
//         setPrescriptions(data);
//       } catch (error) {
//         console.error("Error fetching prescriptions:", error);
//       }
//     };

//     fetchPrescriptions();
//   }, [role, userId]);

//   return (
//     <div>
//       <h2>My Prescriptions</h2>
//       <ul>
//         {prescriptions.map((prescription) => (
//           <li key={prescription.id}>
//             <span>{prescription.date}</span>
//             <button
//               onClick={() => navigate(`/prescription/${prescription.id}`)}
//             >
//               View
//             </button>
//             {role !== "patient" && (
//               <>
//                 <button
//                   onClick={() =>
//                     navigate(`/edit-prescription/${prescription.id}`)
//                   }
//                 >
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(prescription.id)}>
//                   Delete
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const handleDelete = async (id) => {
//   try {
//     await fetch(`/api/prescriptions/${id}`, { method: "DELETE" });
//     window.location.reload(); // Refresh list after deletion
//   } catch (error) {
//     console.error("Error deleting prescription:", error);
//   }
// };

// export default MyPrescriptions;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserRole } from "../../utils/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userRole = getUserRole();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(`${API_BASE_URL}/api/prescriptions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("see prescriptions res ", response.data.prescriptions);
        setPrescriptions(response.data.prescriptions);
      } catch (err) {
        console.log("see error in getting prescriptions ", err);
        setError("Failed to load prescriptions. Please check authentication.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        My Prescriptions
      </h1>
      {prescriptions.length === 0 ? (
        <p className="text-gray-600">No prescriptions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Prescription ID</th>
                <th className="py-3 px-6 text-left">Created By</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription, index) => (
                <tr
                  key={prescription._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {prescription._id}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {prescription.createdBy}
                  </td>
                  <td className="py-4 px-6 text-gray-500">
                    {new Date(
                      prescription.PrescriptionDate
                    ).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/${userRole}/prescription/${prescription._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPrescriptions;
