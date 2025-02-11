// import React from "react";

const DashboardHome = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Select an option from the sidebar to manage your data.
      </p>

      {/* Placeholder for role-based sections */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Dashboard Overview</h2>
        <p className="text-gray-500">
          Your personalized dashboard based on your role.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
