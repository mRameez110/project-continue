// import React from "react";

// const PharmacistDashboard = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <h1 className="text-3xl font-bold">Pharmacist Dashboard</h1>
//     </div>
//   );
// };

// export default PharmacistDashboard;

// src/pages/PharmacistDashboard.jsx
// import { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";

// const PharmacistDashboard = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("/api/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data));
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar role="pharmacist" />
//       <div className="p-4 w-full">
//         <h1 className="text-2xl font-bold">Pharmacist Dashboard</h1>
//         <h2 className="mt-4 font-semibold">All Users</h2>
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>
//               {user.name} - {user.role}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PharmacistDashboard;

// import { useEffect, useState } from "react";
// import DashboardLayout from "../components/DashboardLayout";

// const PharmacistDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [prescriptions, setPrescriptions] = useState([]);

//   useEffect(() => {
//     fetch("/api/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data));

//     fetch("/api/pharmacist-prescriptions")
//       .then((res) => res.json())
//       .then((data) => setPrescriptions(data));
//   }, []);

//   return (
//     <DashboardLayout>
//       <h1>Pharmacist Dashboard</h1>

//       {/* Users List */}
//       <h2>All Users</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.name} ({user.role})
//           </li>
//         ))}
//       </ul>

//       {/* Prescriptions */}
//       <h2>Assigned Prescriptions</h2>
//       <ul>
//         {prescriptions.map((p) => (
//           <li key={p.id}>
//             {p.medicine} - {p.patientName}
//           </li>
//         ))}
//       </ul>
//     </DashboardLayout>
//   );
// };

// export default PharmacistDashboard;

// import { useEffect, useState } from "react";
// import DashboardLayout from "../components/DashboardLayout";

// const PatientDashboard = () => {
//   const [prescriptions, setPrescriptions] = useState([]);

//   useEffect(() => {
//     fetch("/api/my-prescriptions")
//       .then((res) => res.json())
//       .then((data) => setPrescriptions(data));
//   }, []);

//   return (
//     <DashboardLayout>
//       <h1>Patient Dashboard</h1>

//       {/* Prescriptions */}
//       <h2>My Prescriptions</h2>
//       <ul>
//         {prescriptions.map((p) => (
//           <li key={p.id}>
//             {p.medicine} - {p.doctorName}
//           </li>
//         ))}
//       </ul>
//     </DashboardLayout>
//   );
// };

// export default PatientDashboard;

import DashboardLayout from "../components/DashboardLayout";

const PharmacistDashboard = () => {
  return (
    // <DashboardLayout>
    <h2>Welcome to the Pharmacist Dashboard</h2>
    // {/* </DashboardLayout> */}
  );
};

export default PharmacistDashboard;
