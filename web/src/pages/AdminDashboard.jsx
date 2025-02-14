import { useState } from "react";
import CreateUserModal from "../components/CreateUserModal";
import CreatePrescriptionModal from "../components/prescriptions/CreatePrescriptionModal";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </div>

      {/* User creation Model */}
      {isModalOpen && (
        <CreateUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userRole="admin"
        />
      )}
      

      {/* Prescription Creation Model */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsPrescriptionModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Prescription
        </button>
      </div>

      {isPrescriptionModalOpen && (
        <CreatePrescriptionModal
          isOpen={isPrescriptionModalOpen}
          onClose={() => setIsPrescriptionModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
