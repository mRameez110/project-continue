// import React from "react";

// const AdminDashboard = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//       <p className="text-lg text-gray-600 mt-2">
//         Welcome, Admin! Manage the system here.
//       </p>
//     </div>
//   );
// };

// export default AdminDashboard;

// src/pages/AdminDashboard.jsx
// import { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [branches, setBranches] = useState([]);

//   useEffect(() => {
//     // Fetch users, prescriptions, branches from API
//     fetch("/api/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data));
//     fetch("/api/prescriptions")
//       .then((res) => res.json())
//       .then((data) => setPrescriptions(data));
//     fetch("/api/branches")
//       .then((res) => res.json())
//       .then((data) => setBranches(data));
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar role="admin" />
//       <div className="p-4 w-full">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <h2 className="mt-4 font-semibold">All Users</h2>
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>
//               {user.name} - {user.role}
//             </li>
//           ))}
//         </ul>

//         <h2 className="mt-4 font-semibold">All Prescriptions</h2>
//         <ul>
//           {prescriptions.map((prescription) => (
//             <li key={prescription.id}>{prescription.medicine}</li>
//           ))}
//         </ul>

//         <h2 className="mt-4 font-semibold">All Branches</h2>
//         <ul>
//           {branches.map((branch) => (
//             <li key={branch.id}>{branch.name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import { useEffect, useState } from "react";
// import DashboardLayout from "../components/DashboardLayout";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [branches, setBranches] = useState([]);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     fetch("/api/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data));

//     fetch("/api/prescriptions")
//       .then((res) => res.json())
//       .then((data) => setPrescriptions(data));

//     fetch("/api/branches")
//       .then((res) => res.json())
//       .then((data) => setBranches(data));
//   }, []);

//   const filteredUsers = users.filter((user) =>
//     filter === "all" ? true : user.role === filter
//   );

//   return (
//     <DashboardLayout>
//       <h1>Admin Dashboard</h1>

//       {/* User Filter */}
//       <label>Filter Users:</label>
//       <select onChange={(e) => setFilter(e.target.value)}>
//         <option value="all">All</option>
//         <option value="pharmacist">Pharmacists</option>
//         <option value="patient">Patients</option>
//       </select>

//       {/* Users Table */}
//       <h2>All Users</h2>
//       <ul>
//         {filteredUsers.map((user) => (
//           <li key={user.id}>
//             {user.name} ({user.role})
//           </li>
//         ))}
//       </ul>

//       {/* Prescriptions Table */}
//       <h2>All Prescriptions</h2>
//       <ul>
//         {prescriptions.map((p) => (
//           <li key={p.id}>
//             {p.medicine} - {p.patientName}
//           </li>
//         ))}
//       </ul>

//       {/* Branches Table */}
//       <h2>All Branches</h2>
//       <ul>
//         {branches.map((b) => (
//           <li key={b.id}>{b.name}</li>
//         ))}
//       </ul>
//     </DashboardLayout>
//   );
// };

// export default AdminDashboard;

import DashboardLayout from "../components/DashboardLayout";

const AdminDashboard = () => {
  return <h2>Welcome to the Admin Dashboard</h2>;
};

export default AdminDashboard;
