// // App.jsx
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//       </Routes>
//     </>
//   );
// };
// export default App;

// src/App.jsx
// import { Route, Routes, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
// import DashboardLayout from "./layouts/DashboardLayout";
// import DashboardHome from "./pages/dashboard/DashboardHome";

// const App = () => {
//   const location = useLocation();

//   // Hide Navbar on dashboard pages
//   const hideNavbar = location.pathname.startsWith("/dashboard");

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />

//         {/* Dashboard Routes */}
//         <Route path="/dashboard/*" element={<DashboardLayout />}>
//           <Route index element={<DashboardHome />} />
//         </Route>
//       </Routes>
//     </>
//   );
// };

// export default App;

// import { Route, Routes, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
// import DashboardRoutes from "./routes/DashboardRoutes"; // Import Dashboard Routes

// const App = () => {
//   const location = useLocation();

//   //   // Hide Navbar on dashboard pages
//   const hideNavbar = location.pathname.startsWith("/dashboard");

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />

//         {/* Dashboard Routes */}
//         <Route path="/dashboard/*" element={<DashboardRoutes />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import PatientDashboard from "./pages/PatientDashboard";
// import PharmacistDashboard from "./pages/PharmacistDashboard";

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/patient-dashboard" element={<PatientDashboard />} />
//         <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

// import React from "react";

// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import PatientDashboard from "./pages/PatientDashboard";
// import PharmacistDashboard from "./pages/PharmacistDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   return (
//     <>
//       {/* ✅ No extra <Router> here */}
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />

//         {/* 🔹 Protected Routes */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/patient-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["patient"]}>
//               <PatientDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/pharmacist-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["pharmacist"]}>
//               <PharmacistDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// };

// export default App;

// src/App.jsx
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import AdminDashboard from "./pages/AdminDashboard";
// import PharmacistDashboard from "./pages/PharmacistDashboard";
// import PatientDashboard from "./pages/PatientDashboard";
// import DashboardHome from "./pages/DashboardHome";
// import Home from "./pages/HomePage";

// function App() {
//   return (
//     // <Router>

//     <>
//       <Routes>
//         <Route path="/" element={<Home />} />

//         {/* Protected Routes Based on Role */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/pharmacist-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["pharmacist"]}>
//               <PharmacistDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/patient-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["patient"]}>
//               <PatientDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//     // </Router>
//   );
// }

// export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Home from "./pages/HomePage";
// import AdminDashboard from "./pages/AdminDashboard";
// import PharmacistDashboard from "./pages/PharmacistDashboard";
// import PatientDashboard from "./pages/PatientDashboard";
// import Login from "./pages/LoginPage";
// import Signup from "./pages/SignupPage";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* Default Route - Redirect to Home */}
//         <Route path="/" element={<Navigate to="/home" />} />

//         {/* Home Page */}
//         <Route path="/home" element={<Home />} />

//         {/* Authentication Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Routes Based on Role */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             // <ProtectedRoute allowedRoles={["admin"]}>
//             <AdminDashboard />
//             // </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/pharmacist-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["pharmacist"]}>
//               <PharmacistDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/patient-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["patient"]}>
//               <PatientDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Catch-All Route for 404 */}
//         <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//       </Routes>
//     </>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PublicLayout from "./layouts/PublicLayout"; // Home Navbar
// import DashboardLayout from "./layouts/DashboardLayout"; // Sidebar Layout
// import Home from "./pages/HomePage";
// import About from "./pages/AboutPage";
// import Contact from "./pages/ContactPage";
// import Login from "./pages/LoginPage";
// import Signup from "./pages/SignupPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import PharmacistDashboard from "./pages/PharmacistDashboard";
// import PatientDashboard from "./pages/PatientDashboard";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const App = () => {
//   return (
//     <>
//       <Routes>
//         {/* PUBLIC ROUTES */}
//         <Route path="/" element={<PublicLayout />}>
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="login" element={<Login />} />
//           <Route path="signup" element={<Signup />} />
//         </Route>

//         {/* DASHBOARD ROUTES */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             // <ProtectedRoute allowedRoles={["admin"]}>
//             <DashboardLayout>{/* <AdminDashboard /> */}</DashboardLayout>
//             // </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/pharmacist-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["pharmacist"]}>
//               <DashboardLayout>
//                 <PharmacistDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/patient-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["patient"]}>
//               <DashboardLayout>
//                 <PatientDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//     // </Router>
//   );
// };

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PublicLayout from "./layouts/PublicLayout";
// import DashboardLayout from "./layouts/DashboardLayout";
// import Home from "./pages/HomePage";
// import About from "./pages/AboutPage";
// import Contact from "./pages/ContactPage";
// import Login from "./pages/LoginPage";
// import Signup from "./pages/SignupPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import PharmacistDashboard from "./pages/PharmacistDashboard";
// import PatientDashboard from "./pages/PatientDashboard";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const App = () => {
//   return (
//     <>
//       <Routes>
//         {/* PUBLIC ROUTES */}
//         <Route path="/" element={<PublicLayout />}>
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="login" element={<Login />} />
//           <Route path="signup" element={<Signup />} />
//         </Route>

//         {/* DASHBOARD ROUTES */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//             <DashboardLayout>
//               <AdminDashboard />
//             </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/pharmacist-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["pharmacist"]}>
//               <DashboardLayout>
//                 <PharmacistDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/patient-dashboard"
//           element={
//             // <ProtectedRoute allowedRoles={["patient"]}>
//             <DashboardLayout>
//               <PatientDashboard />
//             </DashboardLayout>
//             // </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// };

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PublicLayout from "./layouts/PublicLayout";
// import DashboardLayout from "./layouts/DashboardLayout";
// import Home from "./pages/HomePage";
// import About from "./pages/AboutPage";
// import Contact from "./pages/ContactPage";
// import Login from "./pages/LoginPage";
// import Signup from "./pages/SignupPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import PharmacistDashboard from "./pages/PharmacistDashboard";
// import PatientDashboard from "./pages/PatientDashboard";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import NotFound from "./components/NotFound";

// import MyPrescriptions from "./components/prescriptions/MyPrescriptions";
// import PrescriptionDetail from "./components/prescriptions/PrescriptionDetail";

// const App = () => {
//   return (
//     <Routes>
//       {/* PUBLIC ROUTES */}
//       <Route path="/" element={<PublicLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="login" element={<Login />} />
//         <Route path="signup" element={<Signup />} />
//       </Route>

//       {/* DASHBOARD ROUTES */}
//       <Route
//         path="/admin-dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["admin"]}>
//             <DashboardLayout>
//               <AdminDashboard />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/pharmacist-dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["pharmacist"]}>
//             <DashboardLayout>
//               <PharmacistDashboard />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/patient-dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["patient"]}>
//             <DashboardLayout>
//               <PatientDashboard />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;

// import { Routes, Route } from "react-router-dom";
// import PublicLayout from "./layouts/PublicLayout";
// import DashboardLayout from "./layouts/DashboardLayout";
// import Home from "./pages/HomePage";
// import About from "./pages/AboutPage";
// import Contact from "./pages/ContactPage";
// import Login from "./pages/LoginPage";
// import Signup from "./pages/SignupPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import PharmacistDashboard from "./pages/PharmacistDashboard";
// import PatientDashboard from "./pages/PatientDashboard";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import NotFound from "./components/NotFound";

// // Prescription Components
// import MyPrescriptions from "./components/prescriptions/MyPrescriptions";
// import PrescriptionDetail from "./components/prescriptions/PrescriptionDetail";

// const App = () => {
//   return (
//     <Routes>
//       {/* PUBLIC ROUTES */}
//       <Route path="/" element={<PublicLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="login" element={<Login />} />
//         <Route path="signup" element={<Signup />} />
//       </Route>

//       {/* DASHBOARD ROUTES */}
//       <Route
//         path="/admin-dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["admin"]}>
//             <DashboardLayout>
//               <AdminDashboard />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/pharmacist-dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["pharmacist"]}>
//             <DashboardLayout>
//               <PharmacistDashboard />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />

//       {/* PATIENT DASHBOARD ROUTES */}
//       <Route
//         path="/patient-dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["patient"]}>
//             <DashboardLayout>
//               <PatientDashboard />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/patient/prescriptions"
//         element={
//           <ProtectedRoute allowedRoles={["patient"]}>
//             <DashboardLayout>
//               <MyPrescriptions />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/patient/prescriptions/:id"
//         element={
//           <ProtectedRoute allowedRoles={["patient"]}>
//             <DashboardLayout>
//               <PrescriptionDetail />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Fallback Route for 404 */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import MyPrescriptions from "./components/prescriptions/MyPrescriptions";
import PrescriptionDetail from "./components/prescriptions/PrescriptionDetail";
import NotFound from "./components/NotFound";

// Route configuration
const routeConfig = [
  {
    path: "/admin-dashboard",
    element: AdminDashboard,
    allowedRoles: ["admin"],
  },
  {
    path: "/pharmacist-dashboard",
    element: PharmacistDashboard,
    allowedRoles: ["pharmacist"],
  },
  {
    path: "/patient-dashboard",
    element: PatientDashboard,
    allowedRoles: ["patient"],
    subRoutes: [
      {
        path: "prescriptions",
        element: MyPrescriptions,
      },
      {
        path: "prescriptions/:id",
        element: PrescriptionDetail,
      },
    ],
  },
];

const App = () => {
  return (
    <Routes>
      {/* Dynamic Routing */}
      {routeConfig.map((route, idx) => {
        const { path, element: Element, allowedRoles, subRoutes } = route;

        return (
          <Route
            key={idx}
            path={path}
            element={
              <ProtectedRoute allowedRoles={allowedRoles}>
                <DashboardLayout>
                  <Element />
                </DashboardLayout>
              </ProtectedRoute>
            }
          >
            {/* Sub-routes (for patient dashboard, for example) */}
            {subRoutes &&
              subRoutes.map((subRoute, idx) => (
                <Route
                  key={idx}
                  path={subRoute.path}
                  element={<subRoute.element />}
                />
              ))}
          </Route>
        );
      })}

      {/* Fallback Route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
