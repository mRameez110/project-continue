import { useState } from "react";
import CreateUserModal from "../components/CreateUserModal";
import CreatePrescriptionModal from "../components/prescriptions/CreatePrescriptionModal";
import CreateBranchModal from "../components/CreateBranchModel";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

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

      {/* User creation Modal */}
      {isModalOpen && (
        <CreateUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userRole="admin"
        />
      )}

      {/* Prescription Creation Modal */}
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

      {/* Branch Creation Modal */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsBranchModalOpen(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Create Branch
        </button>
      </div>

      {isBranchModalOpen && (
        <CreateBranchModal
          isOpen={isBranchModalOpen}
          onClose={() => setIsBranchModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
