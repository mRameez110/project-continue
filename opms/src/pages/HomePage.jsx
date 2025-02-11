// const HomePage = () => {
//   return (
//     <div>
//       <section className="flex flex-col items-center justify-center h-screen text-center">
//         <h1 className="text-5xl font-bold mb-4">Welcome to OPMS</h1>
//         <p className="text-lg text-gray-600 mb-6">
//           An Online Pharmacy Management System for easy and efficient healthcare
//           services.
//         </p>
//         <div className="space-x-4">
//           <a
//             href="/login"
//             className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
//           >
//             Get Started
//           </a>
//           <a
//             href="/about"
//             className="bg-gray-200 text-blue-600 px-6 py-3 rounded text-lg"
//           >
//             Learn More
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to the App</h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
        >
          Login
        </Link>
        <Link
          to="/about"
          className="bg-gray-600 text-white px-6 py-3 rounded text-lg"
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
