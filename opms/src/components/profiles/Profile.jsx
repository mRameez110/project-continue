// import { useEffect, useState } from "react";
// import { fetchProfile } from "../../api/userApi";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getProfile = async () => {
//       try {
//         const response = await fetchProfile();
//         console.log("see profile ", response);
//         setProfile(response.data.user);
//       } catch (err) {
//         setError(err.message || "Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProfile();
//   }, []);

//   if (loading) return <div className="text-center text-lg">Loading...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
//         <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>

//         <div className="flex flex-col space-y-3">
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Username:</span>
//             <span>{profile?.user?.userName}</span>
//           </div>
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Full Name:</span>
//             <span>{profile?.FullName || "N/A"}</span>
//           </div>
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Age:</span>
//             <span>{profile?.age || "N/A"}</span>
//           </div>
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Email:</span>
//             <span>{profile?.user?.email}</span>
//           </div>
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Role:</span>
//             <span className="capitalize">{profile?.user?.role}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { getUserId, logout } from "../../utils/auth";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();

//   // ✅ Fetch Profile Data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const userId = getUserId();
//         const token = localStorage.getItem("token");
//         if (!userId || !token) throw new Error("Authentication error");

//         const response = await axios.get(
//           `http://localhost:8000/api/patients/${userId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         console.log("see profile fo test ", response);
//         setProfile(response.data.user);
//         setFormData(response.data.user); // Initialize form data
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const userId = getUserId();
//       const token = localStorage.getItem("token");

//       await axios.put(
//         `http://localhost:8000/api/patients/${userId}`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setProfile(formData);
//       setEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   // ✅ Delete Account
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete your account?"))
//       return;

//     try {
//       const userId = getUserId();
//       const token = localStorage.getItem("token");

//       await axios.delete(`http://localhost:8000/api/patients/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Error deleting account:", error);
//     }
//   };

//   if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-center mb-6">Profile</h2>

//       {editing ? (
//         <div className="space-y-4">
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Full Name"
//           />
//           <input
//             type="text"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Age"
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Email"
//           />
//           <button
//             onClick={handleSave}
//             className="w-full bg-blue-500 text-white p-2 rounded"
//           >
//             Save Changes
//           </button>
//           <button
//             onClick={() => setEditing(false)}
//             className="w-full bg-gray-500 text-white p-2 rounded mt-2"
//           >
//             Cancel
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           <p>
//             <strong>User Name:</strong> {profile.user.userName}
//           </p>
//           <p>
//             <strong>Age:</strong> {profile?.age || "N/A"}
//           </p>
//           <p>
//             <strong>Email:</strong> {profile?.user?.email}
//           </p>
//           <button
//             onClick={() => setEditing(true)}
//             className="w-full bg-green-500 text-white p-2 rounded"
//           >
//             Edit Profile
//           </button>
//           <button
//             onClick={handleDelete}
//             className="w-full bg-red-500 text-white p-2 rounded mt-2"
//           >
//             Delete Account
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { getUserId, getUserRole, getUserName } from "../../utils/auth";
// import { useNavigate } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const Profile = () => {
//   const navigate = useNavigate();
//   const userRole = getUserRole();
//   const userId = getUserId();
//   const userName = getUserName();

//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const endpoint =
//         userRole === "patient" ? "/api/patients/me" : "/api/pharmacists/me";

//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/${userRole}s/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log("see response in profile.jsx ", response);
//         setProfileData(response.data.user);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [userRole]);

//   const handleEdit = () => {
//     navigate("/edit-profile");
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete your account?"))
//       return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:8000/api/${userRole}s/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       localStorage.clear();
//       navigate("/login");
//     } catch (error) {
//       console.error("Error deleting account:", error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//       <h2 className="text-2xl font-bold mb-4">
//         {userRole === "patient" ? `Patient Profile` : "Pharmacist Profile"}
//       </h2>

//       {profileData ? (
//         <>
//           <p>
//             <strong>User Name:</strong> {profileData?.user?.userName || "N/A"}
//           </p>
//           <p>
//             <strong>Full Name:</strong> {profileData.fullName || "N/A"}
//           </p>
//           <p>
//             <strong>Email:</strong> {profileData?.user?.email || "N/A"}
//           </p>

//           <p>
//             <strong>Age:</strong> {profileData.age || "N/A"}
//           </p>
//           <p>
//             <strong>Contact:</strong> {profileData.contact || "N/A"}
//           </p>

//           {userRole === "patient" && (
//             <div className="mt-4 flex gap-4">
//               <button
//                 onClick={handleEdit}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Edit Profile
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Delete Account
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <p>No profile data found.</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { getUserId, getUserRole, getUserName } from "../../utils/auth";
// import { useNavigate } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const Profile = () => {
//   const navigate = useNavigate();
//   const userRole = getUserRole();
//   const userId = getUserId();
//   const userName = getUserName();

//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/${userRole}s/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log("see response in profile.jsx ", response.data);
//         setProfileData(response.data.user);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [userRole, userId]);

//   const handleEdit = () => {
//     navigate(`/edit-profile/${userId}`);
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete your account?"))
//       return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${API_BASE_URL}/api/${userRole}s/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       localStorage.clear();
//       navigate("/login");
//     } catch (error) {
//       console.error("Error deleting account:", error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//       <h2 className="text-2xl font-bold mb-4 flex justify-between">
//         <span>{userName} Profile</span>
//         <span className="text-sm bg-gray-200 px-3 py-1 rounded">
//           {userRole}
//         </span>
//       </h2>

//       {profileData ? (
//         <>
//           <div className="space-y-2">
//             <p>
//               <strong className="inline-block w-40">User Name:</strong>{" "}
//               {profileData?.user?.userName || "N/A"}
//             </p>
//             <p>
//               <strong className="inline-block w-40">Full Name:</strong>{" "}
//               {profileData.fullName || "N/A"}
//             </p>
//             <p>
//               <strong className="inline-block w-40">Email:</strong>{" "}
//               {profileData?.user?.email || "N/A"}
//             </p>
//             <p>
//               <strong className="inline-block w-40">Age:</strong>{" "}
//               {profileData.age || "N/A"}
//             </p>
//             <p>
//               <strong className="inline-block w-40">Contact:</strong>{" "}
//               {profileData.contact || "N/A"}
//             </p>
//           </div>

//           {userRole === "patient" && (
//             <div className="mt-4 flex gap-4">
//               <button
//                 onClick={handleEdit}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Edit Profile
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Delete Account
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <p>No profile data found.</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

import { useEffect, useState } from "react";
import axios from "axios";
import { getUserId, getUserRole, getUserName } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const navigate = useNavigate();
  const userRole = getUserRole(); // Patient ya Pharmacist ka role milega
  const userId = getUserId();
  const userName = getUserName();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log("Profile Response profile.jsx:", response.data);
        setProfileData(response.data.user);
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
      await axios.delete(`${API_BASE_URL}/api/${userRole}s/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

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
              {profileData?.user?.userName || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Full Name:</strong>{" "}
              {profileData.fullName || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Email:</strong>{" "}
              {profileData?.user?.email || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Age:</strong>{" "}
              {profileData.age || "N/A"}
            </p>
            <p>
              <strong className="inline-block w-40">Contact:</strong>{" "}
              {profileData.contact || "N/A"}
            </p>

            {/* Pharmacist ke liye pharmacy branch add kar diya */}
            {userRole === "pharmacist" && (
              <p>
                <strong className="inline-block w-40">Pharmacy Branch:</strong>{" "}
                {profileData.pharmacyBranch?.name || "N/A"}
              </p>
            )}
          </div>

          {/* ✅ Patients aur Pharmacists dono ke liye Edit & Delete */}
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
