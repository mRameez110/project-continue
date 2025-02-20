import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, getUserRole } from "../../utils/auth";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditPharmacist = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const token = getToken();
	const userRole = getUserRole();

	const [fullName, setFullName] = useState("");
	const [age, setAge] = useState("");
	const [contact, setContact] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPharmacist = async () => {
			try {
				if (!token) {
					throw new Error("No authentication token found!");
				}

				const response = await axios.get(
					`${API_BASE_URL}/api/pharmacists/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const { fullName, age, contact } = response.data.user;
				setFullName(fullName || "");
				setAge(age || "");
				setContact(contact || "");
			} catch (err) {
				setError("Failed to load pharmacist details.");
				showErrorToast(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPharmacist();
	}, [id]);

	const handleUpdate = async (e) => {
		e.preventDefault();

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
				`${API_BASE_URL}/api/pharmacists/${id}`,
				{ fullName, age, contact },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			showSuccessToast(response.data.message);
			navigate(`/${userRole}/pharmacists`);
		} catch (error) {
			showErrorToast(error);
		}
	};

	if (loading) return <p className="text-center mt-10">Loading...</p>;
	if (error) return <p className="text-center text-red-500">{error}</p>;

	return (
		<div className="flex items-center justify-center bg-gray-100 mt-12">
			<div
				className="bg-white shadow-md rounded-lg p-4 w-full max-w-md"
				style={{ maxHeight: `calc(100vh - 60px)` }}>
				<h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
					Edit Pharmacist
				</h1>
				<form className="space-y-4" onSubmit={handleUpdate}>
					<div className="mb-3">
						<label className="block text-gray-700 font-medium mb-2">Name</label>
						<input
							type="text"
							className="w-full border p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label className="block text-gray-700 font-medium mb-2">Age</label>
						<input
							type="text"
							className="w-full border p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
							value={age}
							onChange={(e) => setAge(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label className="block text-gray-700 font-medium mb-2">
							Contact
						</label>
						<input
							type="text"
							className="w-full border p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
							value={contact}
							onChange={(e) => setContact(e.target.value)}
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
							Update Pharmacist
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditPharmacist;
