import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserRole, getUserId } from "../../utils/auth";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";

const EditProfile = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const userRole = getUserRole();
  const userId = getUserId();

  // Initialize state based on user role
  const [profileData, setProfileData] = useState({
    fullName: "",
    contact: "",
    ...(userRole === "patient" ? { age: "" } : {}),
    ...(userRole === "pharmacist" ? { pharmacyName: "", location: "" } : {}),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/${userRole}s/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Fetched profile data:", response.data);

        // Ensure fields are not empty, undefined, or null
        const fetchedData = response.data.user || {};

        setProfileData({
          fullName: fetchedData.fullName || "N/A",
          contact: fetchedData.contact || "N/A",
          age: fetchedData.age || "N/A",
          // ...(userRole === "pharmacist"
          //   ? {
          //       pharmacyName: fetchedData.pharmacyName || "N/A",
          //       location: fetchedData.location || "N/A",
          //     }
          //   : {}),
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userRole, userId]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const { message, user, ...cleanData } = profileData;

    try {
      console.log("see clean data ", cleanData);
      const response = await axios.put(
        `${API_BASE_URL}/api/${userRole}s/${userId}`,
        cleanData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Profile updated successfully:", response.data);
      showSuccessToast(response.data.message);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      showErrorToast(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={profileData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="age"
          value={profileData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="contact"
          value={profileData.contact}
          onChange={handleChange}
          placeholder="Contact"
          className="w-full p-2 border rounded"
        />

        {/* {userRole === "pharmacist" && (
            
              <input
                type="text"
                name="pharmacyBranch"
                value={profileData.pharmacyName}
                onChange={handleChange}
                placeholder="Pharmacy Branch"
                className="w-full p-2 border rounded"
              /> 
          )} */}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
