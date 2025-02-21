import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, getUserRole } from "../../utils/auth";
import CreatePrescriptionModal from "../prescriptions/CreatePrescriptionModal";
import { showErrorToast } from "../../utils/errorHandling";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const token = getToken();
  const userRole = getUserRole();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(`${API_BASE_URL}/api/prescriptions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("see response in my prescriptions.jsx ", response.data);

        setPrescriptions(response.data.prescriptions?.reverse());
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        showErrorToast(error);
        setError(
          error.response.data.message ||
            "Failed to load prescriptions. Please check authentication."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [refresh]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        {userRole && userRole === "admin" ? (
          <h1 className="text-2xl font-bold text-gray-800">
            All Prescriptions
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-800">My Prescriptions</h1>
        )}

        {userRole && userRole !== "patient" && (
          <>
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
                onClose={() => setIsPrescriptionModalOpen(false)}
                onCreate={() => setRefresh((prev) => !prev)}
              />
            )}
          </>
        )}
      </div>

      {prescriptions.length === 0 ? (
        <p className="text-gray-600">No prescriptions found.</p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left border-b">#</th>
                <th className="py-3 px-6 text-left border-b">
                  Prescription ID
                </th>

                {userRole === "admin" && (
                  <>
                    <th className="py-3 px-6 text-left border-b">Created By</th>
                    <th className="py-3 px-6 text-left border-b">
                      Patient Name
                    </th>
                  </>
                )}

                {userRole === "pharmacist" && (
                  <th className="py-3 px-6 text-left border-b">Patient Name</th>
                )}

                {userRole === "patient" && (
                  <th className="py-3 px-6 text-left border-b">Created By</th>
                )}

                <th className="py-3 px-6 text-left border-b">
                  Prescription Date
                </th>
                <th className="py-3 px-6 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription, index) => (
                <tr
                  key={prescription._id}
                  className="border-b hover:bg-green-200 transition"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {prescription._id}
                  </td>

                  {userRole === "admin" && (
                    <>
                      <td className="py-4 px-6 text-gray-600">
                        {prescription.createdBy
                          ? prescription.createdBy
                          : "May Account Deleted"}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {prescription.patientName
                          ? prescription.patientName
                          : "N/A"}
                      </td>
                    </>
                  )}

                  {userRole === "pharmacist" && (
                    <td className="py-4 px-6 text-gray-600">
                      {prescription.patientName
                        ? prescription.patientName
                        : "N/A"}
                    </td>
                  )}

                  {userRole === "patient" && (
                    <td className="py-4 px-6 text-gray-600">
                      {prescription.createdBy ? prescription.createdBy : "N/A"}
                    </td>
                  )}

                  <td className="py-4 px-6 text-gray-600">
                    {prescription.PrescriptionDate
                      ? new Date(prescription.PrescriptionDate).toLocaleString()
                      : "N/A"}
                  </td>

                  <td className="py-4 px-6 flex gap-2">
                    <Link
                      to={`/${userRole}/prescription/${prescription._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPrescriptions;
