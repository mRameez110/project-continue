// import { Outlet, Link } from "react-router-dom";

// const PublicLayout = () => {
//   return (
//     <div>
//       <nav className="navbar">
//         <h2>My App</h2>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//           <li>
//             <Link to="/signup">Signup</Link>
//           </li>
//         </ul>
//       </nav>
//       <div className="content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default PublicLayout;

// import { Outlet, Link } from "react-router-dom";

// const PublicLayout = () => {
//   return (
//     <div>
//       <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
//         <h2 className="text-2xl font-bold">My App</h2>
//         <ul className="flex space-x-6">
//           <li>
//             <Link to="/" className="hover:underline">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" className="hover:underline">
//               About
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="hover:underline">
//               Contact
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/login"
//               className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
//             >
//               Login
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/signup"
//               className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
//             >
//               Signup
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       <div className="p-6">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default PublicLayout;

import { Outlet, Link } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">My App</h2>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Signup
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
