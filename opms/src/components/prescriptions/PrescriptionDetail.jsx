// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// // Placeholder data for a specific prescription
// const dummyPrescriptionDetail = {
//   id: 1,
//   medicine: "Aspirin",
//   dosage: "500mg",
//   frequency: "Twice a day",
//   duration: "7 days",
//   instructions: "Take with food.",
//   doctor: "Dr. John Doe",
//   prescribedDate: "2025-02-01",
// };

// const PrescriptionDetail = () => {
//   const { id } = useParams();
//   const [prescriptionDetail, setPrescriptionDetail] = useState(
//     dummyPrescriptionDetail
//   );

//   // Fetch prescription details from API (placeholder for now)
//   useEffect(() => {
//     // You can replace this with an actual API call to get prescription details by ID
//     // fetch(`YOUR_API_ENDPOINT/${id}`)
//     //   .then((res) => res.json())
//     //   .then((data) => setPrescriptionDetail(data))
//     //   .catch((error) => console.error("Error fetching prescription detail:", error));
//   }, [id]);

//   return (
//     <div className="bg-white p-6 shadow-md rounded-md">
//       <h2 className="text-xl font-semibold mb-4">Prescription Details</h2>
//       <div>
//         <h3 className="text-lg font-semibold">
//           Medicine: {prescriptionDetail.medicine}
//         </h3>
//         <p>
//           <strong>Dosage:</strong> {prescriptionDetail.dosage}
//         </p>
//         <p>
//           <strong>Frequency:</strong> {prescriptionDetail.frequency}
//         </p>
//         <p>
//           <strong>Duration:</strong> {prescriptionDetail.duration}
//         </p>
//         <p>
//           <strong>Instructions:</strong> {prescriptionDetail.instructions}
//         </p>
//         <p>
//           <strong>Doctor:</strong> {prescriptionDetail.doctor}
//         </p>
//         <p>
//           <strong>Prescribed Date:</strong> {prescriptionDetail.prescribedDate}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionDetail;

// import { useParams, Link } from "react-router-dom";

// const PrescriptionDetail = () => {
//   const { id } = useParams();
//   const prescription = {
//     id,
//     doctor: "Dr. Smith",
//     date: "2024-02-12",
//     medicines: ["Paracetamol", "Ibuprofen", "Amoxicillin"],
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>
//       <div className="bg-white p-4 rounded shadow-md">
//         <p>
//           <strong>Doctor:</strong> {prescription.doctor}
//         </p>
//         <p>
//           <strong>Date:</strong> {prescription.date}
//         </p>
//         <h3 className="text-xl font-bold mt-4">Medicines:</h3>
//         <ul className="list-disc ml-6">
//           {prescription.medicines.map((med, index) => (
//             <li key={index}>{med}</li>
//           ))}
//         </ul>
//         <Link
//           to="/patient-dashboard/prescriptions"
//           className="mt-4 inline-block bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
//         >
//           Back to Prescriptions
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionDetail;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const PrescriptionDetail = () => {
//   const { id } = useParams();
//   const [prescription, setPrescription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPrescription = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No authentication token found!");
//         }

//         const response = await axios.get(
//           `${API_BASE_URL}/api/prescriptions/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("Prescription details: ", response.data);
//         setPrescription(response.data.prescription);
//       } catch (err) {
//         console.log("Error fetching prescription:", err);
//         setError("Failed to load prescription details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrescription();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!prescription)
//     return <p className="text-center text-gray-600">No prescription found.</p>;

//   return (
//     <div className="p-4 sm:p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
//         Prescription Details
//       </h2>

//       <div className="border p-4 sm:p-6 rounded-lg shadow-lg bg-white">
//         <p className="text-lg font-semibold text-gray-700">
//           <strong>Patient Name:</strong> {prescription.patientName}
//         </p>

//         <p className="text-gray-600">
//           <strong>Created By:</strong> {prescription.createdBy} (
//           {prescription.createdByRole})
//         </p>

//         <p className="text-gray-600">
//           <strong>Creator email:</strong> {prescription.createdByEmail}
//         </p>

//         <p className="text-gray-500">
//           <strong>Date:</strong>{" "}
//           {new Date(prescription.PrescriptionDate).toLocaleDateString()}
//         </p>

//         <h3 className="text-xl font-bold mt-4">Medicines</h3>

//         {/* Responsive Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full mt-2 border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100 text-sm sm:text-base">
//                 <th className="border border-gray-300 px-2 sm:px-4 py-2">
//                   Medicine Name
//                 </th>
//                 <th className="border border-gray-300 px-2 sm:px-4 py-2">
//                   Dosage
//                 </th>
//                 <th className="border border-gray-300 px-2 sm:px-4 py-2">
//                   Frequency
//                 </th>
//                 <th className="border border-gray-300 px-2 sm:px-4 py-2">
//                   Duration
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {prescription.medicine.map((med, index) => (
//                 <tr key={index} className="text-center text-sm sm:text-base">
//                   <td className="border border-gray-300 px-2 sm:px-4 py-2">
//                     {med.medicineName}
//                   </td>
//                   <td className="border border-gray-300 px-2 sm:px-4 py-2">
//                     {med.dosage}
//                   </td>
//                   <td className="border border-gray-300 px-2 sm:px-4 py-2">
//                     {med.frequency}
//                   </td>
//                   <td className="border border-gray-300 px-2 sm:px-4 py-2">
//                     {med.duration}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionDetail;

// import { useEffect, useState } from "react";
// import { Navigate, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getToken, getUserRole, getUserId } from "../../utils/auth";

// const token = getToken();
// const userRole = getUserRole();
// const userId = getUserId();

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const PrescriptionDetail = () => {
//   const { id } = useParams();
//   const [prescription, setPrescription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updatedData, setUpdatedData] = useState({ medicine: [] });

//   // const [userRole, setUserRole] = useState(null);
//   // const [userId, setUserId] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPrescription = async () => {
//       try {
//         if (!token) {
//           throw new Error("No authentication token found!");
//         }

//         const response = await axios.get(
//           `${API_BASE_URL}/api/prescriptions/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("see response in prescrption detail 2.jsx ", response.data);

//         setPrescription(response.data.prescription);
//       } catch (err) {
//         setError("Failed to load prescription details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrescription();
//   }, [id]);

//   const handleInputChange = (index, field, value) => {
//     const newMedicine = [...updatedData.medicine];
//     newMedicine[index] = { ...newMedicine[index], [field]: value };
//     setUpdatedData({ medicine: newMedicine });
//   };

//   const handleEdit = async (prescriptionId) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         throw new Error("No authentication token found!");
//       }

//       const response = await axios.put(
//         `${API_BASE_URL}/api/prescriptions/${prescriptionId}`,
//         updatedData, // ✅ Now updatedData is passed correctly
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Prescription updated:", response.data);
//     } catch (error) {
//       console.error("Error updating prescription", error);
//     }
//   };

//   const handleDelete = async (prescriptionId) => {
//     try {
//       if (!token) {
//         throw new Error("No authentication token found!");
//       }

//       const response = await axios.delete(
//         `${API_BASE_URL}/api/prescriptions/${prescriptionId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log(
//         "Prescription deleted response in prescriptionDetails.jsx",
//         response
//       );
//       navigate("/pharmacist/prescriptions");

//       // Refresh the UI
//     } catch (error) {
//       console.error("Error deleting prescription", error);
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!prescription)
//     return <p className="text-center text-gray-600">No prescription found.</p>;

//   const canEditOrDelete =
//     userRole === "admin" ||
//     (userRole === "pharmacist" && prescription.createdById === userId);

//   return (
//     <div className="p-4 sm:p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
//         Prescription Details
//       </h2>
//       <div className="border p-4 sm:p-6 rounded-lg shadow-lg bg-white">
//         <p className="text-lg font-semibold text-gray-700">
//           <strong>Patient Name:</strong> {prescription.patientName}
//         </p>
//         <p className="text-gray-600">
//           <strong>Patient Email:</strong> {prescription.patientEmail}
//         </p>
//         <p className="text-gray-600">
//           <strong>Created By:</strong> {prescription.createdBy} (
//           {prescription.createdByRole})
//         </p>
//         <p className="text-gray-500">
//           <strong>Date:</strong>{" "}
//           {new Date(prescription.PrescriptionDate).toLocaleDateString()}
//         </p>
//         <h3 className="text-xl font-bold mt-4">Medicines</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full mt-2 border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100 text-sm sm:text-base">
//                 <th className="border border-gray-300 px-2 sm:px-4 py-2">
//                   Medicine Name
//                 </th>
//                 <th className="border border-gray-300 px-2 sm:px-4 py-2">
//                   Dosage
//                 </th>
//                 <th className="border border-gray-300 px-2 sm:px-4 py-2">
//                   Frequency
//                 </th>
//                 <th className="border border-gray-300 px-2 sm:px-4 py-2">
//                   Duration
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {prescription.medicine.map((med, index) => (
//                 <tr key={index} className="text-center text-sm sm:text-base">
//                   <td className="border border-gray-300 px-2 sm:px-4 py-2">
//                     {med.medicineName}
//                   </td>
//                   <td className="border border-gray-300 px-2 sm:px-4 py-2">
//                     {med.dosage}
//                   </td>
//                   <td className="border border-gray-300 px-2 sm:px-4 py-2">
//                     {med.frequency}
//                   </td>
//                   <td className="border border-gray-300 px-2 sm:px-4 py-2">
//                     {med.duration}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {canEditOrDelete && (
//           <div className="mt-4 flex justify-end space-x-2">
//             <button
//               onClick={() => handleEdit(prescription._id)}
//               className="bg-yellow-500 text-white px-3 py-1 rounded"
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => handleDelete(prescription._id)}
//               className="bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PrescriptionDetail;

import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, getUserRole, getUserId } from "../../utils/auth";

const PrescriptionDetail = () => {
  const token = getToken();
  const userRole = getUserRole();
  const userId = getUserId();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/prescriptions/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(
          "see presction response in prescription details.jsx",
          response
        );
        setPrescription(response.data.prescription);
        setUpdatedData(response.data.prescription);
      } catch (err) {
        setError("Failed to load prescription details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [id]);

  const handleInputChange = (index, field, value) => {
    const newMedicine = [...updatedData.medicine];
    newMedicine[index] = { ...newMedicine[index], [field]: value };
    setUpdatedData({ ...updatedData, medicine: newMedicine });
  };

  const handleEdit = async (prescriptionId) => {
    try {
      if (!token) {
        throw new Error("No authentication token found!");
      }

      const response = await axios.put(
        `${API_BASE_URL}/api/prescriptions/${prescriptionId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Prescription updated:", response.data);
      setPrescription(updatedData);
      navigate("/pharmacist/prescriptions");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating prescription", error);
    }
  };

  const handleDelete = async (prescriptionId) => {
    try {
      if (!token) {
        throw new Error("No authentication token found!");
      }

      await axios.delete(
        `${API_BASE_URL}/api/prescriptions/${prescriptionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/pharmacist/prescriptions");
    } catch (error) {
      console.error("Error deleting prescription", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!prescription)
    return <p className="text-center text-gray-600">No prescription found.</p>;

  const canEditOrDelete =
    userRole === "admin" ||
    (userRole === "pharmacist" && prescription.createdById === userId);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Prescription Details
      </h2>
      <div className="border p-4 sm:p-6 rounded-lg shadow-lg bg-white">
        <p className="text-lg font-semibold text-gray-700">
          <strong>Patient Name:</strong> {prescription.patientName}
        </p>
        <p className="text-gray-600">
          <strong>Patient Email:</strong> {prescription.patientEmail}
        </p>
        <p className="text-gray-600">
          <strong>Created By:</strong> {prescription.createdBy} (
          {prescription.createdByRole})
        </p>
        <p className="text-gray-500">
          <strong>Date:</strong>{" "}
          {new Date(prescription.PrescriptionDate).toLocaleDateString()}
        </p>
        <h3 className="text-xl font-bold mt-4">Medicines</h3>
        <div className="overflow-x-auto">
          <table className="w-full mt-2 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-sm sm:text-base">
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Medicine Name
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Dosage
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Frequency
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {prescription.medicine.map((med, index) => (
                <tr key={index} className="text-center text-sm sm:text-base">
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedData.medicine[index]?.medicineName || ""}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "medicineName",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      med.medicineName
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedData.medicine[index]?.dosage || ""}
                        onChange={(e) =>
                          handleInputChange(index, "dosage", e.target.value)
                        }
                      />
                    ) : (
                      med.dosage
                    )}
                  </td>

                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedData.medicine[index]?.frequency || ""}
                        onChange={(e) =>
                          handleInputChange(index, "frequency", e.target.value)
                        }
                      />
                    ) : (
                      med.frequency
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedData.medicine[index]?.duration || ""}
                        onChange={(e) =>
                          handleInputChange(index, "duration", e.target.value)
                        }
                      />
                    ) : (
                      med.duration
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {canEditOrDelete && (
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
            {isEditing && (
              <button
                onClick={() => handleEdit(prescription._id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={() => handleDelete(prescription._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionDetail;
