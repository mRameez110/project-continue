import { useState, useEffect } from "react";
import axios from "axios";
import { getToken, getUserRole, getUserId } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";

const token = getToken();
const userRole = getUserRole();
const userId = getUserId();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreatePrescriptionModal = ({ onClose, patientId }) => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(patientId || "");
  const [medicine, setMedicine] = useState([
    { medicineName: "", dosage: "", frequency: "", duration: "" },
  ]);
  const [loading, setLoading] = useState(false);
  console.log("check is patient id? ", patientId);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(`${API_BASE_URL}/api/patients`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data.patients.reverse());
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };
    fetchPatients();
  }, []);

  const handleAddMedicine = () => {
    setMedicine([
      ...medicine,
      { medicineName: "", dosage: "", frequency: "", duration: "" },
    ]);
  };

  const handleRemoveMedicine = (index) => {
    const newMedicine = medicine.filter((_, i) => i !== index);
    setMedicine(newMedicine);
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicine = [...medicine];
    newMedicine[index][field] = value;
    setMedicine(newMedicine);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!selectedPatient || selectedPatient === "") {
        showErrorToast("Please select a patient!");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found!");
      }

      if (medicine.some((med) => !med.medicineName.trim())) {
        showErrorToast("Medicine name cannot be empty!");
        setLoading(false);
        return;
      }

      console.log("Submitting prescription:", {
        patientId: selectedPatient || null,
        medicine,
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/prescriptions`,
        {
          patientId: selectedPatient, // Send valid patient ID
          medicine,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onClose();
      showSuccessToast(response.data.message);
      navigate(`/${userRole}/prescriptions`);
    } catch (error) {
      console.error(
        "Error creating prescription",
        error.response?.data?.message
      );
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Create Prescription</h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Patient
        </label>
        {patientId ? (
          <input
            type="text"
            value={
              patients.find((p) => p._id === patientId)?.user?.userName || "N/A"
            }
            disabled
            className="w-full border p-2 rounded mb-4 text-black bg-white"
          />
        ) : (
          <select
            className="w-full border p-2 rounded mb-4 text-black bg-white"
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.user?.userName}
              </option>
            ))}
          </select>
        )}

        <h3 className="font-semibold mb-2">Medicine Details</h3>
        {medicine.map((med, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2 items-center"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medicine Name
              </label>
              <input
                type="text"
                placeholder="Medicine Name"
                className="border p-2 w-full"
                value={med.medicineName}
                onChange={(e) =>
                  handleMedicineChange(index, "medicineName", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dosage
              </label>
              <input
                type="text"
                placeholder="Dosage"
                className="border p-2 w-full"
                value={med.dosage}
                onChange={(e) =>
                  handleMedicineChange(index, "dosage", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Frequency
              </label>
              <input
                type="text"
                placeholder="Frequency"
                className="border p-2 w-full"
                value={med.frequency}
                onChange={(e) =>
                  handleMedicineChange(index, "frequency", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                placeholder="Duration"
                className="border p-2 w-full"
                value={med.duration}
                onChange={(e) =>
                  handleMedicineChange(index, "duration", e.target.value)
                }
              />
            </div>
            {index > 0 && (
              <button
                className="bg-red-500 text-white px-2 py-1 rounded text-xs mt-2"
                onClick={() => handleRemoveMedicine(index)}
              >
                Cancel
              </button>
            )}
          </div>
        ))}

        <button
          className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
          onClick={handleAddMedicine}
        >
          + Add Medicine
        </button>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePrescriptionModal;
