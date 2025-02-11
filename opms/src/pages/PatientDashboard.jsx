// import React from "react";

// const PatientDashboard = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <h1 className="text-3xl font-bold">Patient Dashboard</h1>
//     </div>
//   );
// };

// export default PatientDashboard;

// src/pages/PatientDashboard.jsx
// import { useEffect, useState } from "react";
// // import Sidebar from "../components/Sidebar";

// const PatientDashboard = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     fetch(`/api/prescriptions?userId=${userId}`)
//       .then((res) => res.json())
//       .then((data) => setPrescriptions(data));
//   }, [userId]);

//   return (
//     <div className="flex">
//       {/* <Sidebar role="patient" /> */}
//       <div className="p-4 w-full">
//         <h1 className="text-2xl font-bold">Patient Dashboard</h1>
//         <h2 className="mt-4 font-semibold">My Prescriptions</h2>
//         <ul>
//           {prescriptions.map((prescription) => (
//             <li key={prescription.id}>{prescription.medicine}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;

// import DashboardLayout from "../components/DashboardLayout";

// const PatientDashboard = () => {
//   return (
//     // <DashboardLayout>
//       <h2>Welcome to the Patient Dashboard</h2>
//     // </DashboardLayout>
//   );
// };

// export default PatientDashboard;

// import { useEffect, useState } from "react";
// import axios from "axios"; // If using Axios
// import DashboardLayout from "../components/DashboardLayout";

// const PatientDashboard = () => {
//   const [patientData, setPatientData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/patients", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         console.log("see pat req");
//         setPatientData(response.data);
//       } catch (err) {
//         console.error("Error fetching patient data:", err);
//         setError("Failed to load patient data");
//       }
//     };

//     fetchPatientData();
//   }, []);

//   return (
//     <DashboardLayout>
//       <h2>Patient Dashboard</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {patientData ? (
//         <div>
//           <p>Name: {patientData.name}</p>
//           <p>Email: {patientData.email}</p>
//           <p>Appointments: {patientData.appointments.length}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </DashboardLayout>
//   );
// };

// export default PatientDashboard;

// import { useEffect, useState } from "react";
// import axios from "axios"; // If using Axios
// import DashboardLayout from "../components/DashboardLayout";

// const PatientDashboard = () => {
//   const [patientData, setPatientData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/patients", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         console.log("see pat req", response.data.patients[0].user.email);
//         setPatientData(response.data.patients[0].user);
//       } catch (err) {
//         console.error("Error fetching patient data:", err);
//         setError("Failed to load patient data");
//       }
//     };

//     fetchPatientData();
//   }, []);

//   return (
//     <DashboardLayout>
//       <h2>Patient Dashboard</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {patientData ? (
//         <div>
//           <p>Name: {patientData?.name || "N/A"}</p>
//           <p>Email: {patientData?.email || "N/A"}</p>
//           <p>Appointments: {patientData?.appointments?.length || 0}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </DashboardLayout>
//   );
// };

// export default PatientDashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import DashboardLayout from "../components/DashboardLayout";

// const PatientDashboard = () => {
//   const [patientData, setPatientData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/patients", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         console.log("see patients ", response.data);
//         setPatientData(response.data.patients);
//       } catch (err) {
//         console.error("Error fetching patient data:", err);
//         setError("Failed to load patient data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, []);

//   return (
//     <DashboardLayout>
//       <div className="max-w-6xl mx-auto p-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
//           Patient Dashboard
//         </h2>

//         {/* Loading State */}
//         {loading && <p className="text-center text-gray-600">Loading...</p>}

//         {/* Error State */}
//         {error && <p className="text-center text-red-500">{error}</p>}

//         {/* Patient List */}
//         {!loading && !error && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
//               <thead className="bg-gray-800 text-white">
//                 <tr>
//                   <th className="px-6 py-3 text-left">#</th>
//                   <th className="px-6 py-3 text-left">Name</th>
//                   <th className="px-6 py-3 text-left">Email</th>
//                   <th className="px-6 py-3 text-left">Role</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-300 bg-white">
//                 {patientData.map((patient, index) => (
//                   <tr key={patient._id} className="hover:bg-gray-100">
//                     <td className="px-6 py-3">{index + 1}</td>
//                     <td className="px-6 py-3 font-medium">
//                       {patient.user?.userName || "N/A"}
//                     </td>
//                     <td className="px-6 py-3">
//                       {patient.user?.email || "N/A"}
//                     </td>
//                     <td className="px-6 py-3">
//                       {patient.user?.role || "Patient"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default PatientDashboard;

// import React from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation

// const PatientDashboard = () => {
//   return (
//     <div className="patient-dashboard">
//       <h1>Welcome to Your Dashboard</h1>
//       <p>Here you can manage your prescriptions, appointments, and more.</p>

//       {/* Button to navigate to the patient profile */}
//       <Link to="/patient-profile">
//         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Go to Profile
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default PatientDashboard;

// src/components/PatientDashboard.jsx
// import DataCard from "../components/DataCard";
// import {  } from "../data/dummyData";

// const PatientDashboard = () => {
//   return (
//     <div className="flex flex-wrap justify-start p-6">
//       {dummyData.map((data, index) => (
//         <DataCard
//           key={index}
//           title={data.title}
//           description={data.description}
//           icon={data.icon}
//           link={data.link}
//         />
//       ))}
//     </div>
//   );
// };

// export default PatientDashboard;

// src/components/PatientDashboard.jsx
import DataCard from "../components/DataCard";
import { dummyData } from "../data/dummyData";

const PatientDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="font-semibold text-xl mb-4">Top Pharmacists</h2>
      <div className="flex flex-wrap justify-start">
        {dummyData.pharmacists.map((data, index) => (
          <DataCard
            key={index}
            title={data.title}
            name={data.name}
            link={data.link}
            type="pharmacist"
          />
        ))}
      </div>

      <h2 className="font-semibold text-xl mt-8 mb-4">Top Prescriptions</h2>
      <div className="flex flex-wrap justify-start">
        {dummyData.prescriptions.map((data, index) => (
          <DataCard
            key={index}
            title={data.title}
            description={data.description}
            link={data.link}
            type="prescription"
          />
        ))}
      </div>
    </div>
  );
};

export default PatientDashboard;
