import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(`${API_BASE_URL}/api/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("see response in patient detils .jsx ", response);
        setPatient(response.data.user);
      } catch (err) {
        console.error("Error fetching patient:", err);
        setError("Failed to load patient details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Patient Details</h1>
      {patient ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-700 font-medium">
            Patient ID: {patient._id || "N/A"}
          </p>
          <p className="text-gray-700 font-medium">
            User Name: {patient.user?.userName || "N/A"}
          </p>
          <p className="text-gray-700 font-medium">
            Email: {patient.user?.email || "N/A"}
          </p>

          <p className="text-gray-700 font-medium">
            Age: {patient.age || "N/A"}
          </p>
          <p className="text-gray-700 font-medium">
            Contact: {patient.contact || "N/A"}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">Patient not found.</p>
      )}
    </div>
  );
};

export default PatientDetail;
