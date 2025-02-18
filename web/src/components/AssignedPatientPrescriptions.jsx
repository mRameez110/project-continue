// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const AssignedPatientPrescriptions = () => {
//   const { patientId } = useParams();
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No authentication token found!");
//         }

//         const response = await axios.get(
//           `${API_BASE_URL}/api/patients/${patientId}/prescriptions`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setPrescriptions(response.data.prescriptions);
//       } catch (err) {
//         setError("Failed to load prescriptions.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrescriptions();
//   }, [patientId]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         All Assigned Prescriptions for Patient {patientId}
//       </h1>
//       {prescriptions.length === 0 ? (
//         <p className="text-gray-600">
//           No prescriptions found for this patient.
//         </p>
//       ) : (
//         <div className="overflow-x-auto mt-6">
//           <table className="min-w-full bg-white shadow-md rounded-lg">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="py-3 px-6 text-left border-b">#</th>
//                 <th className="py-3 px-6 text-left border-b">
//                   Prescription ID
//                 </th>
//                 <th className="py-3 px-6 text-left border-b">
//                   Prescription Date
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {prescriptions.map((prescription, index) => (
//                 <tr
//                   key={prescription._id}
//                   className="border-b hover:bg-gray-100 transition"
//                 >
//                   <td className="py-4 px-6">{index + 1}</td>
//                   <td className="py-4 px-6">{prescription._id}</td>
//                   <td className="py-4 px-6">
//                     {new Date(prescription.PrescriptionDate).toLocaleString()}
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

// export default AssignedPatientPrescriptions;
