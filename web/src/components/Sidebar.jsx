// import { Link } from "react-router-dom";

// const Sidebar = ({ role }) => {
//   const sidebarOptions = {
//     admin: [
//       { name: "Dashboard", path: "/dashboard" },
//       { name: "Users", path: "/users" },
//       { name: "Settings", path: "/settings" },
//     ],
//     pharmacist: [
//       { name: "Dashboard", path: "/dashboard" },
//       { name: "Prescriptions", path: "/prescriptions" },
//       { name: "Inventory", path: "/inventory" },
//     ],
//     patient: [
//       { name: "Dashboard", path: "/dashboard" },
//       { name: "Prescriptions", path: "/prescriptions" },
//       { name: "Appointments", path: "/appointments" },
//     ],
//   };

//   return (
//     <aside className="w-64 bg-gray-800 text-white p-4">
//       <h2 className="text-xl font-bold">{role.toUpperCase()} Panel</h2>
//       <ul className="mt-4">
//         {sidebarOptions[role]?.map((item) => (
//           <li key={item.path} className="mt-2">
//             <Link to={item.path} className="block p-2 hover:bg-gray-700">
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default
