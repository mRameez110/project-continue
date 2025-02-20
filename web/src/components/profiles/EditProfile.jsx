import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, getUserRole, getUserId } from "../../utils/auth";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";

const EditProfile = () => {
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const navigate = useNavigate();
	const token = getToken();
	const userRole = getUserRole();
	const userId = getUserId();

	const [profileData, setProfileData] = useState({
		fullName: "",
		contact: "",
		age: "",
	});

	useEffect(() => {
		const fetchProfile = async () => {
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
					fullName: fetchedData.fullName || "",
					contact: fetchedData.contact || "",
					age: fetchedData.age || "",
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

		let { fullName, contact, age } = profileData;
		const cleanData = { fullName, contact, age };

		try {
			if (
				(fullName == null || fullName.trim() === "") &&
				(age == null || age === "") &&
				(contact == null || contact.trim() === "")
			) {
				showErrorToast("Please edit at least one field to update");
				return;
			}

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
		<div className="flex items-center justify-center bg-gray-100 mt-12">
			<div
				className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
				style={{ maxHeight: `calc(100vh - 60px)` }}>
				<h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
					Edit Profile
				</h1>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">Name</label>
						<input
							type="text"
							name="fullName"
							value={profileData.fullName}
							onChange={handleChange}
							placeholder="Full Name"
							className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">Age</label>
						<input
							type="text"
							name="age"
							value={profileData.age}
							onChange={handleChange}
							placeholder="Age"
							className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">
							Contact
						</label>
						<input
							type="text"
							name="contact"
							value={profileData.contact}
							onChange={handleChange}
							placeholder="Contact"
							className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="flex justify-between items-center space-x-4">
						<button
							type="button"
							onClick={() => navigate(-1)}
							className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow hover:bg-black transition">
							Cancel
						</button>

						<button
							type="submit"
							className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
