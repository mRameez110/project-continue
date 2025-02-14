import { useEffect, useState } from "react";
import axios from "axios";
import { getUserId, getUserRole, getUserName } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const userId = getUserId();
  const userName = getUserName();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        if (userRole === "admin") {
          const response = await axios.get(
            `${API_BASE_URL}/api/auth/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("Profile Response profile.jsx:", response.data);
          setProfileData(response.data.user);
        } else {
          const response = await axios.get(
            `${API_BASE_URL}/api/${userRole}s/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("Profile Response profile.jsx:", response.data);
          setProfileData(response.data.user);
        }
      } catch (error) {
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
      const token = localStorage.getItem("token");
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

  if (loading) return <p>Loading...</p>;

  // return (
  //   <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
  //     <h2 className="text-2xl font-bold mb-4 flex justify-between">
  //       <span>{userName} Profile</span>
  //       <span className="text-sm bg-gray-200 px-3 py-1 rounded">
  //         {userRole.toLocaleUpperCase()}
  //       </span>
  //     </h2>

  //     {profileData ? (
  //       <>
  //         <div className="space-y-2">
  //           <p>
  //             <strong className="inline-block w-40">User Name:</strong>{" "}
  //             {profileData?.user?.userName || profileData?.userName || "N/A"}
  //           </p>
  //           <p>
  //             <strong className="inline-block w-40">Full Name:</strong>{" "}
  //             {profileData.fullName || "N/A"}
  //           </p>
  //           <p>
  //             <strong className="inline-block w-40">Email:</strong>{" "}
  //             {profileData?.user?.email || profileData?.email || "N/A"}
  //           </p>
  //           <p>
  //             <strong className="inline-block w-40">Age:</strong>{" "}
  //             {profileData.age || "N/A"}
  //           </p>
  //           <p>
  //             <strong className="inline-block w-40">Contact:</strong>{" "}
  //             {profileData.contact || "N/A"}
  //           </p>

  //           {/* Pharmacist ke liye pharmacy branch add kar diya */}
  //           {userRole === "pharmacist" && (
  //             <p>
  //               <strong className="inline-block w-40">Pharmacy Branch:</strong>{" "}
  //               {profileData.pharmacyBranch?.name || "N/A"}
  //             </p>
  //           )}
  //         </div>

  //         {/* ✅ Patients aur Pharmacists dono ke liye Edit & Delete */}
  //         {(userRole === "patient" || userRole === "pharmacist") && (
  //           <div className="mt-4 flex gap-4">
  //             <button
  //               onClick={handleEdit}
  //               className="bg-blue-500 text-white px-4 py-2 rounded"
  //             >
  //               Edit Profile
  //             </button>
  //             <button
  //               onClick={handleDelete}
  //               className="bg-red-500 text-white px-4 py-2 rounded"
  //             >
  //               Delete Account
  //             </button>
  //           </div>
  //         )}
  //       </>
  //     ) : (
  //       <p>No profile data found.</p>
  //     )}
  //   </div>
  // );

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 flex justify-between">
        <span>{userName} Profile</span>
        <span className="text-sm bg-gray-200 px-3 py-1 rounded">
          {userRole.toLocaleUpperCase()}
        </span>
      </h2>

      {profileData ? (
        <>
          <div className="space-y-2">
            <p>
              <strong className="inline-block w-40">User Name:</strong>{" "}
              {profileData?.user?.userName || profileData?.userName || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Full Name:</strong>{" "}
              {userRole === "admin"
                ? "Ali Admin"
                : profileData.fullName || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Email:</strong>{" "}
              {profileData?.user?.email || profileData?.email || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Age:</strong>{" "}
              {userRole === "admin" ? "20" : profileData.age || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Contact:</strong>{" "}
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
