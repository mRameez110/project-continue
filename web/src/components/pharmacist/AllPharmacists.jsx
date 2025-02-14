import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserRole } from "../../utils/auth";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AllPharmacists = () => {
  const userRole = getUserRole();
  console.log("top of all pharmacist.jsx and loged user role", userRole);
  const [pharmacits, setPharmacits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(`${API_BASE_URL}/api/pharmacists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("see response in all pharmacist.jsx ", response);
        setPharmacits(response.data.pharmacists);
      } catch (error) {
        console.log("Error fetching patients:", error);
        setError("Failed to load Pharmacists. Please check authentication.");
        showErrorToast(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacists();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${API_BASE_URL}/api/pharmacists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "see deleted pharmacist response in All pharmacist.jsx ",
        response
      );
      setPharmacits((prevPharmacists) =>
        prevPharmacists.filter((p) => p._id !== id)
      ); // I m filtering instead of new get all request

      showSuccessToast(response.data.message);
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Pharmacists</h1>

      {!pharmacits || pharmacits.length === 0 ? (
        <p className="text-gray-600">No pharmacits found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Pharmacist ID</th>
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pharmacits.reverse().map((pharmacist, index) => (
                <tr
                  key={pharmacist._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {pharmacist._id}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {pharmacist.user?.userName}
                  </td>
                  <td className="py-4 px-6 text-gray-500">
                    {pharmacist.user?.email}
                  </td>
                  <td className="py-4 px-6 flex gap-2">
                    <Link
                      to={`/${userRole}/pharmacist/${pharmacist._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/${userRole}/pharmacist/edit/${pharmacist._id}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(pharmacist._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
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

export default AllPharmacists;
