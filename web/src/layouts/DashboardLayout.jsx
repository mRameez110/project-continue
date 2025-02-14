import { useEffect, useState } from "react";
import { getUserRole, getUserName, logout } from "../utils/auth";
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import BackButton from "../components/CustomBackButton";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const role = getUserRole();
  const userName = getUserName();
  console.log("see on top my Dashboard Layout.jsx and loged user role ", role);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const sidebarOptions = {
    admin: [
      { name: "Dashboard", path: "/admin-dashboard" },
      { name: "All Prescriptions", path: "/admin/prescriptions" },
      { name: "All Patients", path: "/admin/patients" },
      { name: "All Pharmacists", path: "/admin/pharmacists" },
      { name: "My Profile", path: "/admin-profile" },
    ],
    pharmacist: [
      { name: "Dashboard", path: "/pharmacist-dashboard" },
      { name: "My Prescriptions", path: "/pharmacist/prescriptions" },
      { name: "All Patients", path: "/pharmacist/patients" },
      { name: "Inventory", path: "/pharmacist/inventory" },
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
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">{role} Panel</h2>
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
            {greeting}, {userName}!
          </h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {userName?.charAt(0).toUpperCase()}
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
        <div className="mt-4">
          <Outlet />
          {!location.pathname.includes("dashboard") && <BackButton />}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
