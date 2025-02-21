import { useEffect, useState } from "react";
import axios from "axios";
import {
  getToken,
  getUserId,
  getUserRole,
  getUserName,
} from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const token = getToken();
  const userRole = getUserRole();
  const userId = getUserId();
  const userName = getUserName();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        throw new Error("No authentication token found!");
      }
      try {
        if (userRole === "admin") {
          const response = await axios.get(
            `${API_BASE_URL}/api/auth/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("Profile Response in profile.jsx:", response.data);
          setProfileData(response.data.user);
        } else {
          const response = await axios.get(
            `${API_BASE_URL}/api/${userRole}s/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("Profile Response in profile.jsx:", response.data);
          setProfileData(response.data.user);
        }
      } catch (error) {
        setError(error || "Failed to load Profile .");
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userRole, userId]);

  const handleEdit = () => {
    navigate(`/edit-profile/${userId}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/${userRole}s/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.clear();
      showSuccessToast(response.data.message);
      navigate("/signup");
    } catch (error) {
      console.error("Error deleting account:", error);
      showErrorToast(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-8 flex justify-between">
        <span>{userName} Profile</span>
        <span className="text-lg bg-gray-200 px-3 py-1 rounded">
          {userRole.toLocaleUpperCase()}
        </span>
      </h2>

      {profileData ? (
        <>
          <div className="space-y-2">
            <p>
              <strong className="inline-block w-40">User Name:</strong>
              {profileData?.user?.userName || profileData?.userName || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Full Name:</strong>
              {userRole === "admin"
                ? "Ali Admin"
                : profileData.fullName || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Email:</strong>
              {profileData?.user?.email || profileData?.email || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Age:</strong>
              {userRole === "admin" ? "35" : profileData.age || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Contact:</strong>
              {userRole === "admin"
                ? "0300-1234567"
                : profileData.contact || "N/A"}
            </p>

            {userRole === "pharmacist" && (
              <p>
                <strong className="inline-block w-40">Pharmacy Branch:</strong>{" "}
                {profileData.pharmacyBranch?.name || "N/A"}
              </p>
            )}
          </div>

          {(userRole === "patient" || userRole === "pharmacist") && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete Account
              </button>
            </div>
          )}
        </>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default Profile;
