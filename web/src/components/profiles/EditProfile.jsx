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

  const [profileData, setProfileData] = useState({
    fullName: "",
    contact: "",
    age: "",
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

        const fetchedData = response.data.user || {};

        setProfileData({
          fullName: fetchedData.fullName || "N/A",
          contact: fetchedData.contact || "N/A",
          age: fetchedData.age || "N/A",
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

    let { fullName, contact, age } = profileData;

    const cleanData = { fullName, contact, age };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/${userRole}s/${userId}`,
        cleanData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
        <label className="block text-gray-700 font-medium">Name </label>
        <input
          type="text"
          name="fullName"
          value={profileData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />

        <label className="block text-gray-700 font-medium">Age </label>

        <input
          type="text"
          name="age"
          value={profileData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full p-2 border rounded"
        />

        <label className="block text-gray-700 font-medium">Contact </label>

        <input
          type="text"
          name="contact"
          value={profileData.contact}
          onChange={handleChange}
          placeholder="Contact"
          className="w-full p-2 border rounded"
        />

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
