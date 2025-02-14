// // import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
//       <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//       <nav className="flex flex-col gap-4">
//         <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
//           Home
//         </Link>
//         <Link to="/dashboard/profile" className="hover:bg-gray-700 p-2 rounded">
//           Profile
//         </Link>
//         <Link
//           to="/dashboard/settings"
//           className="hover:bg-gray-700 p-2 rounded"
//         >
//           Settings
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white p-4 md:w-64 sm:w-20">
//       <ul className="space-y-4">
//         <li>
//           <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/dashboard/settings"
//             className="block p-2 hover:bg-gray-700 rounded"
//           >
//             Settings
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

// src/components/Sidebar.jsx
// import { Link } from "react-router-dom";

// const Sidebar = ({ role }) => {
//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white p-4">
//       <h2 className="text-xl font-bold mb-4">Dashboard</h2>
//       <ul className="space-y-4">
//         {role === "admin" && (
//           <>
//             <li>
//               <Link to="/admin-dashboard/users">All Users</Link>
//             </li>
//             <li>
//               <Link to="/admin-dashboard/prescriptions">All Prescriptions</Link>
//             </li>
//             <li>
//               <Link to="/admin-dashboard/branches">All Branches</Link>
//             </li>
//           </>
//         )}
//         {role === "pharmacist" && (
//           <>
//             <li>
//               <Link to="/pharmacist-dashboard/users">All Users</Link>
//             </li>
//           </>
//         )}
//         {role === "patient" && (
//           <>
//             <li>
//               <Link to="/patient-dashboard/prescriptions">
//                 My Prescriptions
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;



import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  const sidebarOptions = {
    admin: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Users", path: "/users" },
      { name: "Settings", path: "/settings" },
    ],
    pharmacist: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Prescriptions", path: "/prescriptions" },
      { name: "Inventory", path: "/inventory" },
    ],
    patient: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Prescriptions", path: "/prescriptions" },
      { name: "Appointments", path: "/appointments" },
    ],
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold">{role.toUpperCase()} Panel</h2>
      <ul className="mt-4">
        {sidebarOptions[role]?.map((item) => (
          <li key={item.path} className="mt-2">
            <Link to={item.path} className="block p-2 hover:bg-gray-700">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default
