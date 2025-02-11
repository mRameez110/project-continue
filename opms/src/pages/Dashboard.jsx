import { useState } from "react";
import { getUserRole, logout } from "../utils/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const Dashboard = () => {
  const role = getUserRole();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <TopBar />
        <Outlet /> {/* This will show the selected page */}
      </main>
    </div>
  );
};

export default Dashboard;
