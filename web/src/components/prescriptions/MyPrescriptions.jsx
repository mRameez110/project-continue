// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { getUserRole } from "../../utils/auth";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const MyPrescriptions = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const userRole = getUserRole();

//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No authentication token found!");
//         }

//         const response = await axios.get(`${API_BASE_URL}/api/prescriptions`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Fetched prescriptions:", response.data.prescriptions);
//         setPrescriptions(response.data.prescriptions);
//       } catch (err) {
//         console.error("Error fetching prescriptions:", err);
//         setError("Failed to load prescriptions. Please check authentication.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrescriptions();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         My Prescriptions
//       </h1>
//       {prescriptions.length === 0 ? (
//         <p className="text-gray-600">No prescriptions found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="py-3 px-6 text-left">#</th>
//                 <th className="py-3 px-6 text-left">Prescription ID</th>
//                 <th className="py-3 px-6 text-left">Created By</th>
//                 <th className="py-3 px-6 text-left">Date</th>
//                 <th className="py-3 px-6 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {prescriptions.reverse().map((prescription, index) => (
//                 <tr
//                   key={prescription._id}
//                   className="border-b hover:bg-gray-100 transition"
//                 >
//                   <td className="py-4 px-6">{index + 1}</td>
//                   <td className="py-4 px-6 text-gray-700 font-medium">
//                     {prescription._id}
//                   </td>
//                   <td className="py-4 px-6 text-gray-600">
//                     {prescription.createdBy
//                       ? prescription.createdBy
//                       : "Unknown"}
//                   </td>
//                   <td className="py-4 px-6 text-gray-500">
//                     {prescription.PrescriptionDate
//                       ? new Date(prescription.PrescriptionDate).toLocaleString()
//                       : "N/A"}
//                   </td>
//                   <td className="py-4 px-6 flex gap-2">
//                     <Link
//                       to={`/${userRole}/prescription/${prescription._id}`}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//                     >
//                       View
//                     </Link>
//                     {userRole === "admin" && (
//                       <button
//                         onClick={async () => {
//                           try {
//                             await axios.delete(
//                               `${API_BASE_URL}/api/prescriptions/${prescription._id}`,
//                               {
//                                 headers: {
//                                   Authorization: `Bearer ${localStorage.getItem(
//                                     "token"
//                                   )}`,
//                                 },
//                               }
//                             );
//                             setPrescriptions((prev) =>
//                               prev.filter((p) => p._id !== prescription._id)
//                             );
//                           } catch (err) {
//                             console.error("Error deleting prescription:", err);
//                           }
//                         }}
//                         className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
//                       >
//                         Delete
//                       </button>
//                     )}
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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserRole } from "../../utils/auth";
import CreatePrescriptionModal from "../prescriptions/CreatePrescriptionModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

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

        console.log("Fetched prescriptions:", response.data.prescriptions);
        setPrescriptions(response.data.prescriptions);
      } catch (err) {
        console.error("Error fetching prescriptions:", err);
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
      <div className="flex justify-between items-center mb-6">
        {userRole && userRole === "admin" ? (
          <h1 className="text-2xl font-bold text-gray-800">
            All Prescriptions
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-800">My Prescriptions</h1>
        )}

        {userRole && userRole !== "patient" && (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsPrescriptionModalOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Create Prescription
              </button>
            </div>

            {isPrescriptionModalOpen && (
              <CreatePrescriptionModal
                isOpen={isPrescriptionModalOpen}
                onClose={() => setIsPrescriptionModalOpen(false)}
              />
            )}
          </>
        )}
      </div>

      {prescriptions.length === 0 ? (
        <p className="text-gray-600">No prescriptions found.</p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left border-b">#</th>
                <th className="py-3 px-6 text-left border-b">
                  Prescription ID
                </th>
                <th className="py-3 px-6 text-left border-b">Created By</th>
                <th className="py-3 px-6 text-left border-b">Date</th>
                <th className="py-3 px-6 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.reverse().map((prescription, index) => (
                <tr
                  key={prescription._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {prescription._id}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {prescription.createdBy
                      ? prescription.createdBy
                      : "Unknown"}
                  </td>
                  <td className="py-4 px-6 text-gray-500">
                    {prescription.PrescriptionDate
                      ? new Date(prescription.PrescriptionDate).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="py-4 px-6 flex gap-2">
                    <Link
                      to={`/${userRole}/prescription/${prescription._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      View
                    </Link>
                    {userRole === "admin" && (
                      <button
                        onClick={async () => {
                          try {
                            await axios.delete(
                              `${API_BASE_URL}/api/prescriptions/${prescription._id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "token"
                                  )}`,
                                },
                              }
                            );
                            setPrescriptions((prev) =>
                              prev.filter((p) => p._id !== prescription._id)
                            );
                          } catch (err) {
                            console.error("Error deleting prescription:", err);
                          }
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    )}
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
