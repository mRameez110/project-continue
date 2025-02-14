import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/errorHandling";
import { getUserRole } from "../utils/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateUserModal = ({ isOpen, onClose, userRole }) => {
  const logedUserRole = getUserRole();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: userRole === "admin" ? "patient" : "patient",
    fullName: "",
    age: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const userPayload = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        role: userRole === "admin" ? formData.role : "patient",
      };

      if (formData.fullName) userPayload.fullName = formData.fullName;
      if (formData.age) userPayload.age = formData.age;
      if (formData.contact) userPayload.contact = formData.contact;
      

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        userPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSuccessToast(response.data.message || "Done sucessfully");
      console.log(
        "check navigation path in console",
        `/${logedUserRole}/${formData.role}s`
      );
      navigate(`/${logedUserRole}/${formData.role}s`);
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
      showErrorToast(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="userName"
              className="w-full border p-2 rounded-md"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded-md"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border p-2 rounded-md"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Dropdown (Only for Admin) */}
          {userRole === "admin" && (
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                className="w-full border p-2 rounded-md"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="patient">Patient</option>
                <option value="pharmacist">Pharmacist</option>
              </select>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
