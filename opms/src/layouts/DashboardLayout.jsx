// // // import { Outlet } from "react-router-dom";
// // // import Sidebar from "../components/Sidebar";
// // // import Navbar from "../components/Navbar";

// // // const DashboardLayout = () => {
// // //   return (
// // //     <div className="flex h-screen">
// // //       {/* Sidebar */}
// // //       <Sidebar />

// // //       <div className="flex flex-col flex-1">
// // //         {/* Navbar */}
// // //         <Navbar />

// // //         {/* Main Content */}
// // //         <main className="p-6 flex-1 overflow-y-auto">
// // //           <Outlet />
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DashboardLayout;

// // // import Sidebar from "../components/Sidebar";
// // // import { Outlet } from "react-router-dom";

// // // const DashboardLayout = () => {
// // //   return (
// // //     <div className="flex">
// // //       <Sidebar />
// // //       <main className="flex-1 p-4">
// // //         <Outlet />
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default DashboardLayout;

// // import { Link } from "react-router-dom";

// // const DashboardLayout = ({ children }) => {
// //   return (
// //     <div className="dashboard-container">
// //       {/* Sidebar */}
// //       <nav className="sidebar">
// //         <h2>Dashboard</h2>
// //         <ul>
// //           <li>
// //             <Link to="/admin-dashboard">Dashboard</Link>
// //           </li>
// //           <li>
// //             <Link to="/all-users">All Users</Link>
// //           </li>
// //           <li>
// //             <Link to="/prescriptions">Prescriptions</Link>
// //           </li>
// //           <li>
// //             <Link to="/branches">Branches</Link>
// //           </li>
// //           <li>
// //             <Link to="/logout">Logout</Link>
// //           </li>
// //         </ul>
// //       </nav>

// //       {/* Main Content */}
// //       <div className="main-content">{children}</div>
// //     </div>
// //   );
// // };

// // export default DashboardLayout;

// import { Link } from "react-router-dom";

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <nav className="w-64 bg-gray-900 text-white h-screen p-5">
//         <h2 className="text-2xl font-bold text-center">Dashboard</h2>
//         <ul className="mt-6 space-y-4">
//           <li>
//             <Link
//               to="/admin-dashboard"
//               className="block px-4 py-2 rounded-md hover:bg-gray-700"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/all-users"
//               className="block px-4 py-2 rounded-md hover:bg-gray-700"
//             >
//               All Users
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/prescriptions"
//               className="block px-4 py-2 rounded-md hover:bg-gray-700"
//             >
//               Prescriptions
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/branches"
//               className="block px-4 py-2 rounded-md hover:bg-gray-700"
//             >
//               Branches
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/logout"
//               className="block px-4 py-2 rounded-md bg-red-600 hover:bg-red-700"
//             >
//               Logout
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100">{children}</div>
//     </div>
//   );
// };

// export default DashboardLayout;

// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext"; // Assuming auth context

// const DashboardLayout = ({ children }) => {
//   const { user } = useContext(AuthContext); // Get the logged-in user role

//   // Define Sidebar Links Based on Role
//   const sidebarLinks = {
//     admin: [
//       { path: "/admin-dashboard", label: "Dashboard" },
//       { path: "/all-users", label: "All Users" },
//       { path: "/prescriptions", label: "Prescriptions" },
//       { path: "/branches", label: "Branches" },
//     ],
//     pharmacist: [
//       { path: "/pharmacist-dashboard", label: "Dashboard" },
//       { path: "/manage-medicines", label: "Manage Medicines" },
//       { path: "/prescriptions", label: "Prescriptions" },
//     ],
//     patient: [
//       { path: "/patient-dashboard", label: "Dashboard" },
//       { path: "/my-prescriptions", label: "My Prescriptions" },
//       { path: "/order-medicine", label: "Order Medicine" },
//     ],
//   };

//   // Default to an empty array if no role found
//   const links = sidebarLinks[user?.role] || [];

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <nav className="w-64 bg-gray-900 text-white h-screen p-5">
//         <h2 className="text-2xl font-bold text-center">Dashboard</h2>
//         <ul className="mt-6 space-y-4">
//           {links.map((link, index) => (
//             <li key={index}>
//               <Link
//                 to={link.path}
//                 className="block px-4 py-2 rounded-md hover:bg-gray-700"
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//           <li>
//             <Link
//               to="/logout"
//               className="block px-4 py-2 rounded-md bg-red-600 hover:bg-red-700"
//             >
//               Logout
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100">{children}</div>
//     </div>
//   );
// };

// export default DashboardLayout;

// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // Import useAuth

// const DashboardLayout = ({ children }) => {
//   const { userRole } = useAuth(); // Use the custom hook to get the user role

//   // Define Sidebar Links Based on Role
//   const sidebarLinks = {
//     admin: [
//       { path: "/admin-dashboard", label: "Dashboard" },
//       { path: "/all-users", label: "All Users" },
//       { path: "/prescriptions", label: "Prescriptions" },
//       { path: "/branches", label: "Branches" },
//     ],
//     pharmacist: [
//       { path: "/pharmacist-dashboard", label: "Dashboard" },
//       { path: "/manage-medicines", label: "Manage Medicines" },
//       { path: "/prescriptions", label: "Prescriptions" },
//     ],
//     patient: [
//       { path: "/patient-dashboard", label: "Dashboard" },
//       { path: "/my-prescriptions", label: "My Prescriptions" },
//       { path: "/order-medicine", label: "Order Medicine" },
//     ],
//   };

//   const links = sidebarLinks["patient"] || [];

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <nav className="w-64 bg-gray-900 text-white h-screen p-5">
//         <h2 className="text-2xl font-bold text-center">Dashboard</h2>
//         <ul className="mt-6 space-y-4">
//           {links.map((link, index) => (
//             <li key={index}>
//               <Link
//                 to={link.path}
//                 className="block px-4 py-2 rounded-md hover:bg-gray-700"
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//           <li>
//             <Link
//               to="/logout"
//               className="block px-4 py-2 rounded-md bg-red-600 hover:bg-red-700"
//             >
//               Logout
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100">{children}</div>
//     </div>
//   );
// };

// export default DashboardLayout;

// import { useEffect, useState } from "react";
// import { getUserRole, logout } from "../utils/auth";
// import { Link, useNavigate } from "react-router-dom";

// const DashboardLayout = ({ children }) => {
//   const navigate = useNavigate();
//   const [greeting, setGreeting] = useState("");
//   const role = getUserRole();
//   // const role = "patient";

//   // Set greeting based on time
//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good Morning");
//     else if (hour < 18) setGreeting("Good Afternoon");
//     else setGreeting("Good Evening");
//   }, []);

//   // Sidebar options based on role
//   // const sidebarOptions = {
//   //   admin: [
//   //     { name: "Dashboard", path: "/admin-dashboard" },
//   //     { name: "Users", path: "/admin/users" },
//   //     { name: "Settings", path: "/admin/settings" },
//   //   ],
//   //   pharmacist: [
//   //     { name: "Dashboard", path: "/pharmacist-dashboard" },
//   //     { name: "Prescriptions", path: "/pharmacist/prescriptions" },
//   //     { name: "Inventory", path: "/pharmacist/inventory" },
//   //   ],
//   //   patient: [
//   //     { name: "Dashboard", path: "/patient-dashboard" },
//   //     { name: "Prescriptions", path: "/patient/prescriptions" },
//   //     { name: "Appointments", path: "/patient/appointments" },
//   //   ],
//   // };

//   const sidebarOptions = {
//     admin: [
//       { name: "Dashboard", path: "/admin-dashboard" },
//       { name: "Users", path: "/admin/users" },
//       { name: "Settings", path: "/admin/settings" },
//     ],
//     pharmacist: [
//       { name: "Dashboard", path: "/pharmacist-dashboard" },
//       { name: "Prescriptions", path: "/pharmacist/prescriptions" },
//       { name: "Inventory", path: "/pharmacist/inventory" },
//     ],
//     patient: [
//       { name: "Dashboard", path: "/patient-dashboard" },
//       { name: "My Prescription", path: "/patient/prescriptions" },
//       { name: "My Profile", path: "/patient-profile" },
//     ],
//   };

//   return (
//     <>
//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <aside className="w-64 bg-gray-800 text-white p-4">
//           <h2 className="text-xl font-bold">{role.toUpperCase()} Panel</h2>
//           <ul className="mt-4">
//             {sidebarOptions[role]?.map((item) => (
//               <li key={item.path} className="mt-2">
//                 <Link to={item.path} className="block p-2 hover:bg-gray-700">
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6 bg-gray-100">
//           {/* Top Bar */}
//           <div className="flex justify-between items-center bg-white p-4 shadow-md">
//             <h1 className="text-lg font-semibold">
//               {greeting}, {role}!
//             </h1>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>

//           {/* All childern goes here */}
//           <div className="mt-4">{children}</div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;

// Inside your DashboardLayout component

// import { useEffect, useState } from "react";
// import { getUserRole, getUserName, logout } from "../utils/auth";
// import { Link, useNavigate } from "react-router-dom";

// const DashboardLayout = ({ children }) => {
//   const navigate = useNavigate();
//   const [greeting, setGreeting] = useState("");
//   const role = getUserRole();
//   const userName = getUserName(); // This should come from your auth context or API (like getUserProfile())

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good Morning");
//     else if (hour < 18) setGreeting("Good Afternoon");
//     else setGreeting("Good Evening");
//   }, []);

//   const sidebarOptions = {
//     admin: [
//       { name: "Dashboard", path: "/admin-dashboard" },
//       { name: "Users", path: "/admin/users" },
//       { name: "Settings", path: "/admin/settings" },
//     ],
//     pharmacist: [
//       { name: "Dashboard", path: "/pharmacist-dashboard" },
//       { name: "Prescriptions", path: "/pharmacist/prescriptions" },
//       { name: "Inventory", path: "/pharmacist/inventory" },
//     ],
//     patient: [
//       { name: "Dashboard", path: "/patient-dashboard" },
//       { name: "My Prescription", path: "/patient/prescriptions" },
//       { name: "My Profile", path: "/patient-profile" },
//     ],
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white p-4">
//         <h2 className="text-xl font-bold">{role.toUpperCase()} Panel</h2>
//         <ul className="mt-4">
//           {sidebarOptions[role]?.map((item) => (
//             <li key={item.path} className="mt-2">
//               <Link to={item.path} className="block p-2 hover:bg-gray-700">
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-gray-100">
//         {/* Top Bar */}
//         <div className="flex justify-between items-center bg-white p-4 shadow-md">
//           <h1 className="text-lg font-semibold">
//             {greeting}, {role}!
//           </h1>
//           <div className="flex items-center space-x-4">
//             {/* Profile Circle */}
//             <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
//               {userName?.charAt(0).toUpperCase()}{" "}
//               {/* Display the first letter of the user's name */}
//             </div>
//             <span>{userName}</span>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="mt-4">{children}</div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;

// import { useEffect, useState } from "react";
// import { getUserRole, getUserName, logout } from "../utils/auth";
// import { NavLink, useNavigate } from "react-router-dom";

// const DashboardLayout = ({ children }) => {
//   const navigate = useNavigate();
//   const [greeting, setGreeting] = useState("");
//   const role = getUserRole();
//   const userName = getUserName(); // This should come from your auth context or API (like getUserProfile())

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good Morning");
//     else if (hour < 18) setGreeting("Good Afternoon");
//     else setGreeting("Good Evening");
//   }, []);

//   const sidebarOptions = {
//     admin: [
//       { name: "Dashboard", path: "/admin-dashboard" },
//       { name: "Users", path: "/admin/users" },
//       { name: "Settings", path: "/admin/settings" },
//     ],
//     pharmacist: [
//       { name: "Dashboard", path: "/pharmacist-dashboard" },
//       { name: "Prescriptions", path: "/pharmacist/prescriptions" },
//       { name: "Inventory", path: "/pharmacist/inventory" },
//     ],
//     patient: [
//       { name: "Dashboard", path: "/patient-dashboard" },
//       { name: "My Prescription", path: "/patient/prescriptions" }, // ✅ Yahan sahi path likho
//       { name: "My Profile", path: "/patient-profile" },
//     ],
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white p-4">
//         <h2 className="text-xl font-bold">{role.toUpperCase()} Panel</h2>
//         <ul className="mt-4">
//           {sidebarOptions[role]?.map((item) => (
//             <li key={item.path} className="mt-2">
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "block p-2 hover:bg-gray-700 bg-gray-600" // Active state class
//                     : "block p-2 hover:bg-gray-700"
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-gray-100">
//         {/* Top Bar */}
//         <div className="flex justify-between items-center bg-white p-4 shadow-md">
//           <h1 className="text-lg font-semibold">
//             {greeting}, {role}!
//           </h1>
//           <div className="flex items-center space-x-4">
//             {/* Profile Circle */}
//             <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
//               {userName?.charAt(0).toUpperCase()}{" "}
//               {/* Display the first letter of the user's name */}
//             </div>
//             <span>{userName}</span>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="mt-4">{children}</div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;

// import { useEffect, useState } from "react";
// import { getUserRole, getUserName, logout } from "../utils/auth";
// import { NavLink, useNavigate } from "react-router-dom";

// const DashboardLayout = ({ children }) => {
//   const navigate = useNavigate();
//   const [greeting, setGreeting] = useState("");
//   const role = getUserRole();
//   const userName = getUserName();

//   console.log("see role and username ", role, userName);

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good Morning");
//     else if (hour < 18) setGreeting("Good Afternoon");
//     else setGreeting("Good Evening");
//   }, []);

//   const sidebarOptions = {
//     admin: [
//       { name: "Dashboard", path: "/admin-dashboard" },
//       { name: "Users", path: "/admin/users" },
//       { name: "Settings", path: "/admin/settings" },
//     ],
//     pharmacist: [
//       { name: "Dashboard", path: "/pharmacist-dashboard" },
//       { name: "Prescriptions", path: "/pharmacist/prescriptions" },
//       { name: "Inventory", path: "/pharmacist/inventory" },
//     ],
//     patient: [
//       { name: "Dashboard", path: "/patient-dashboard" },
//       { name: "My Prescription", path: "/patient/prescriptions" },
//       { name: "My Profile", path: "/patient-profile" },
//     ],
//   };

//   return (
//     <div className="flex h-screen">
//       <aside className="w-64 bg-gray-800 text-white p-4">
//         <h2 className="text-xl font-bold">{role.toUpperCase()} Panel</h2>
//         <ul className="mt-4">
//           {sidebarOptions[role]?.map((item) => (
//             <li key={item.path} className="mt-2">
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "block p-2 hover:bg-gray-700 bg-gray-600"
//                     : "block p-2 hover:bg-gray-700"
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       <main className="flex-1 p-6 bg-gray-100">
//         <div className="flex justify-between items-center bg-white p-4 shadow-md">
//           <h1 className="text-lg font-semibold">
//             {greeting}, {role}!
//           </h1>
//           <div className="flex items-center space-x-4">
//             <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
//               {userName?.charAt(0).toUpperCase()}
//             </div>
//             <span>{userName}</span>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//         <div className="mt-4">{children}</div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;

import { useEffect, useState } from "react";
import { getUserRole, getUserName, logout } from "../utils/auth";
import { NavLink, useNavigate, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const role = getUserRole();
  const userName = getUserName();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const sidebarOptions = {
    admin: [
      { name: "Dashboard", path: "/admin-dashboard" },
      { name: "Users", path: "/admin/users" },
      { name: "Settings", path: "/admin/settings" },
    ],
    pharmacist: [
      { name: "Dashboard", path: "/pharmacist-dashboard" },
      { name: "Prescriptions", path: "/pharmacist/prescriptions" },
      { name: "Inventory", path: "/pharmacist/inventory" },
    ],
    patient: [
      { name: "Dashboard", path: "/patient-dashboard" },
      { name: "My Prescription", path: "/patient/prescriptions" },
      { name: "My Profile", path: "/patient-profile" },
    ],
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">{role.toUpperCase()} Panel</h2>
        <ul className="mt-4">
          {sidebarOptions[role]?.map((item) => (
            <li key={item.path} className="mt-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 hover:bg-gray-700 bg-gray-600"
                    : "block p-2 hover:bg-gray-700"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center bg-white p-4 shadow-md">
          <h1 className="text-lg font-semibold">
            {greeting}, {role}!
          </h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {userName?.charAt(0).toUpperCase()}
            </div>
            <span>{userName}</span>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
