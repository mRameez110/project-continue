import { useEffect, useState } from "react";
import { getUserId, getToken } from "../utils/auth";
import axios from "axios";
import { showErrorToast } from "../utils/errorHandling";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PharmacistBranch = () => {
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loggedUserId = getUserId();
  const token = getToken();
  useEffect(() => {
    const fetchBranch = async () => {
      console.log("Branch API Response:");
      try {
        if (!token) {
          throw new Error("No authentication token found!");
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/pharmacy-branches/${loggedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Branch API Response:", response);

        if (response.data && response.data.branch) {
          setBranch(response.data.branch);
        } else {
          setBranch(null);
        }
      } catch (error) {
        setError("Failed to load branch details.");
        showErrorToast(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranch();
  }, [loggedUserId, token]);

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const getBranchFieldValue = (field) => {
    return field && field !== "" ? field : "N/A";
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Assigned Branch</h2>
      {branch ? (
        <div className="mt-4">
          <p>
            <strong>Branch Name:</strong> {getBranchFieldValue(branch.name)}
          </p>
          <p>
            <strong>Location:</strong> {getBranchFieldValue(branch.address)}
          </p>
          <p>
            <strong>Contact:</strong> {getBranchFieldValue(branch.contact)}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No branch assigned yet.</p>
      )}
    </div>
  );
};

export default PharmacistBranch;
