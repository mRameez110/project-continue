import { useState, useEffect } from "react";
import axios from "axios";

import { getToken, getUserRole, getUserId } from "../../utils/auth";

const token = getToken();
const userRole = getUserRole();
const userId = getUserId();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreatePrescriptionModal = ({ onClose }) => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [medicine, setMedicine] = useState([
    { medicineName: "", dosage: "", frequency: "", duration: "" },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(`${API_BASE_URL}/api/patients`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("see response 1 in create model.jsx ", response.data);
        setPatients(response.data.patients);
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

  const handleMedicineChange = (index, field, value) => {
    const newMedicine = [...medicine];
    newMedicine[index][field] = value;
    setMedicine(newMedicine);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found!");
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/prescriptions`,
        {
          patientId: selectedPatient || null,
          medicine,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("see response when medicine created ", response);

      onClose();
    } catch (error) {
      console.error("Error creating prescription", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Create Prescription</h2>

        <label className="block text-sm font-medium text-gray-700">
          Search Patient
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          placeholder="Search by username"
        />
        {/* <select
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setSelectedPatient(e.target.value)}
        > */}

        <select
          className="w-full border p-2 rounded mb-4 text-black bg-white"
          onChange={(e) => setSelectedPatient(e.target.value)}
        >
          <option value="">General Prescription</option>
          {patients
            .filter((p) => p.user?.userName.includes(search))
            .map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.user?.userName}
              </option>
            ))}
        </select>

        <h3 className="font-semibold">Medicine Details</h3>
        {medicine.map((med, index) => (
          <div key={index} className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Medicine Name"
              className="border p-2"
              value={med.medicineName}
              onChange={(e) =>
                handleMedicineChange(index, "medicineName", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Dosage"
              className="border p-2"
              value={med.dosage}
              onChange={(e) =>
                handleMedicineChange(index, "dosage", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Frequency"
              className="border p-2"
              value={med.frequency}
              onChange={(e) =>
                handleMedicineChange(index, "frequency", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Duration"
              className="border p-2"
              value={med.duration}
              onChange={(e) =>
                handleMedicineChange(index, "duration", e.target.value)
              }
            />
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
