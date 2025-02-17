import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getUserRole } from "../../utils/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PharmacitDetail = () => {
  const { id } = useParams();
  const [pharmacist, setPharmacist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = getUserRole();

  useEffect(() => {
    const fetchPharmacist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/pharmacists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("see response in patient detils .jsx ", response);
        setPharmacist(response.data.user);
      } catch (err) {
        console.error("Error fetching pharmacist:", err);
        setError("Failed to load pharmacist details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacist();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Pharmacist Details
      </h1>
      {pharmacist ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-700 font-medium">
            Pharmacist ID: {pharmacist._id}
          </p>
          <p className="text-gray-700 font-medium">
            Name: {pharmacist.fullName}
          </p>
          <p className="text-gray-700 font-medium">
            Email: {pharmacist.user?.email}
          </p>

          <p className="text-gray-700 font-medium">Age: {pharmacist.age}</p>
          <p className="text-gray-700 font-medium">
            Contact: {pharmacist.contact}
          </p>

          <div className="flex justify-end mt-4">
            <Link
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
              to={`/${userRole}/pharmacist/edit/${pharmacist._id}`}
            >
              Edit
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Patient not found.</p>
      )}
    </div>
  );
};

export default PharmacitDetail;
