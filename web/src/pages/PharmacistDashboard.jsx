import { useState } from "react";
import CreateUserModal from "../components/CreateUserModal";
import CreatePrescriptionModal from "../components/prescriptions/CreatePrescriptionModal"; // ✅ Import Modal

const PharmacistDashboard = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        Pharmacist Dashboard
      </h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsUserModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Patient
        </button>
      </div>

      {isUserModalOpen && (
        <CreateUserModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          userRole="pharmacist"
        />
      )}

      {/* Create Prescription Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsPrescriptionModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Prescription
        </button>
      </div>

      {/* Create Prescription Modal */}
      {isPrescriptionModalOpen && (
        <CreatePrescriptionModal
          isOpen={isPrescriptionModalOpen}
          onClose={() => setIsPrescriptionModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PharmacistDashboard;
