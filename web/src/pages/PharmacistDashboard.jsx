// import { useState } from "react";
// import CreateUserModal from "../components/CreateUserModal";
// import CreatePrescriptionModal from "../components/prescriptions/CreatePrescriptionModal";

// const PharmacistDashboard = () => {
//   const [isUserModalOpen, setIsUserModalOpen] = useState(false);
//   const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold text-center mb-4">
//         Pharmacist Dashboard
//       </h2>

//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setIsUserModalOpen(true)}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Create Patient
//         </button>
//       </div>

//       {isUserModalOpen && (
//         <CreateUserModal
//           isOpen={isUserModalOpen}
//           onClose={() => setIsUserModalOpen(false)}
//           userRole="pharmacist"
//         />
//       )}

//       {/* Create Prescription Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setIsPrescriptionModalOpen(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Create Prescription
//         </button>
//       </div>

//       {/* Create Prescription Modal */}
//       {isPrescriptionModalOpen && (
//         <CreatePrescriptionModal
//           isOpen={isPrescriptionModalOpen}
//           onClose={() => setIsPrescriptionModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default PharmacistDashboard;

import { useState, useEffect } from "react";
import axios from "axios";
import CreateUserModal from "../components/CreateUserModal";
import CreatePrescriptionModal from "../components/prescriptions/CreatePrescriptionModal";

const PharmacistDashboard = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch orders with populated prescription and patient
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

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

      {/* View Orders Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsOrderDetailsModalOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          View Requested Orders
        </button>
      </div>
    </div>
  );
};

export default PharmacistDashboard;
