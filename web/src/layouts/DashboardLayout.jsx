import { useEffect, useState } from "react";
import { getUserRole, getUserName, logout } from "../utils/auth";
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import BackButton from "../components/CustomBackButton";
import CustomSidebar from "../components/CustomSidebar"; // Import the custom sidebar component

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const role = getUserRole(); // Get the user's role
  const userName = getUserName(); // Get the user's name
  console.log("Current role in Dashboard Layout:", role);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Sidebar menu options for different roles
  const sidebarOptions = {
    admin: [
      { name: "Dashboard", path: "/admin-dashboard" },
      { name: "All Prescriptions", path: "/admin/prescriptions" },
      { name: "All Patients", path: "/admin/patients" },
      { name: "All Pharmacists", path: "/admin/pharmacists" },
      { name: "All Branches", path: "/admin/branches" },
      { name: "My Profile", path: "/admin-profile" },
    ],
    pharmacist: [
      { name: "Dashboard", path: "/pharmacist-dashboard" },
      { name: "My Prescriptions", path: "/pharmacist/prescriptions" },
      { name: "All Patients", path: "/pharmacist/patients" },
      { name: "All Orders", path: "/pharmacist/orders" },
      { name: "Inventory", path: "/pharmacist/inventory" },
      { name: "My Branch", path: "/pharmacist/branch" },
      { name: "My Profile", path: "/pharmacist-profile" },
    ],
    patient: [
      { name: "Dashboard", path: "/patient-dashboard" },
      { name: "My Prescriptions", path: "/patient/prescriptions" },
      { name: "My Profile", path: "/patient-profile" },
    ],
  };

  return (
    <div className="flex h-screen">
      {/* Use CustomSidebar component here */}
      <CustomSidebar role={role} sidebarOptions={sidebarOptions} />{" "}
      {/* Pass role and sidebar options to CustomSidebar */}
      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-gray-100 ml-64">
        {" "}
        {/* ml-64 to leave space for the sidebar */}
        {/* Top Bar with greeting and logout */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md">
          <h1 className="text-lg font-semibold">
            {greeting}, {userName}!
          </h1>

          <div className="flex items-center space-x-4">
            <div className="mx-3 w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="https://avatar.iran.liara.run/public/47"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

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
        {/* Outlet for nested routes */}
        <div className="mt-4">
          <Outlet /> {/* Content specific to each dashboard */}
          {!location.pathname.includes("dashboard") && <BackButton />}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
