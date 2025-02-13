import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, getUserRole, getUserId } from "../../utils/auth";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";

const PrescriptionDetail = () => {
  const token = getToken();
  const userRole = getUserRole();
  const userId = getUserId();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/prescriptions/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(
          "see presction response in prescription details.jsx",
          response
        );
        setPrescription(response.data.prescription);
        setUpdatedData(response.data.prescription);
      } catch (err) {
        setError("Failed to load prescription details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [id]);

  const handleInputChange = (index, field, value) => {
    const newMedicine = [...updatedData.medicine];
    newMedicine[index] = { ...newMedicine[index], [field]: value };
    setUpdatedData({ ...updatedData, medicine: newMedicine });
  };

  const handleEdit = async (prescriptionId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found!");
      }

      const updatedMedicineData = { medicine: updatedData.medicine };

      const response = await axios.put(
        `${API_BASE_URL}/api/prescriptions/${prescriptionId}`,
        updatedMedicineData, // ✅ Only sending necessary data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Prescription updated:", response.data);
      navigate("/pharmacist/prescriptions");
      showSuccessToast(response.data.message);
    } catch (error) {
      console.error("Error updating prescription", error);
      showErrorToast(error);
    }
  };

  const handleDelete = async (prescriptionId) => {
    try {
      if (!token) {
        throw new Error("No authentication token found!");
      }

      const response = await axios.delete(
        `${API_BASE_URL}/api/prescriptions/${prescriptionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/pharmacist/prescriptions");
      showSuccessToast(response.data.message);
    } catch (error) {
      console.error("Error deleting prescription", error);
      showErrorToast(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!prescription)
    return <p className="text-center text-gray-600">No prescription found.</p>;

  const canEditOrDelete =
    userRole === "admin" ||
    (userRole === "pharmacist" && prescription.createdById === userId);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Prescription Details
      </h2>
      <div className="border p-4 sm:p-6 rounded-lg shadow-lg bg-white">
        <p className="text-lg font-semibold text-gray-700">
          <strong>Patient Name:</strong> {prescription.patientName}
        </p>
        <p className="text-gray-600">
          <strong>Patient Email:</strong> {prescription.patientEmail}
        </p>
        <p className="text-gray-600">
          <strong>Created By:</strong> {prescription.createdBy} (
          {prescription.createdByRole})
        </p>
        <p className="text-gray-500">
          <strong>Date:</strong>{" "}
          {new Date(prescription.PrescriptionDate).toLocaleDateString()}
        </p>
        <h3 className="text-xl font-bold mt-4">Medicines</h3>
        <div className="overflow-x-auto">
          <table className="w-full mt-2 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-sm sm:text-base">
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Medicine Name
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Dosage
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Frequency
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {prescription.medicine.map((med, index) => (
                <tr key={index} className="text-center text-sm sm:text-base">
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedData.medicine[index]?.medicineName || ""}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "medicineName",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      med.medicineName
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedData.medicine[index]?.dosage || ""}
                        onChange={(e) =>
                          handleInputChange(index, "dosage", e.target.value)
                        }
                      />
                    ) : (
                      med.dosage
                    )}
                  </td>

                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedData.medicine[index]?.frequency || ""}
                        onChange={(e) =>
                          handleInputChange(index, "frequency", e.target.value)
                        }
                      />
                    ) : (
                      med.frequency
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedData.medicine[index]?.duration || ""}
                        onChange={(e) =>
                          handleInputChange(index, "duration", e.target.value)
                        }
                      />
                    ) : (
                      med.duration
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {canEditOrDelete && (
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
            {isEditing && (
              <button
                onClick={() => handleEdit(prescription._id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={() => handleDelete(prescription._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionDetail;
