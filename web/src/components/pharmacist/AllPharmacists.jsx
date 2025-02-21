import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, getUserRole } from "../../utils/auth";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";
import CreateUserModal from "../CreateUserModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AllPharmacists = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateUserModelOpen, setIsCreateUserModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const token = getToken();
  const userRole = getUserRole();
  console.log("top of all pharmacist.jsx and loged user role", userRole);

  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(`${API_BASE_URL}/api/pharmacists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("see response in all pharmacist.jsx ", response);
        setPharmacists(response.data.pharmacists?.reverse());
      } catch (error) {
        console.log("Error fetching pharmacists:", error);
        setError("Failed to load Pharmacists. Please check authentication.");
        showErrorToast(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacists();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pharmacist?"))
      return;

    try {
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
      setRefresh((prev) => !prev);
      showSuccessToast(response.data.message);
    } catch (error) {
      console.error("Error deleting pharmacist:", error);
      showErrorToast(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Pharmacists</h1>

        {userRole === "admin" && (
          <button
            onClick={() => setIsCreateUserModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create Pharmacist
          </button>
        )}
      </div>

      {isCreateUserModelOpen && (
        <CreateUserModal
          onClose={() => setIsCreateUserModalOpen(false)}
          onCreate={() => setRefresh((prev) => !prev)}
          creatorRole={userRole}
        />
      )}

      {!pharmacists || pharmacists.length === 0 ? (
        <p className="text-gray-600">No pharmacists found.</p>
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
              {pharmacists.map((pharmacist, index) => (
                <tr
                  key={pharmacist._id}
                  className="border-b hover:bg-green-200 transition"
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
