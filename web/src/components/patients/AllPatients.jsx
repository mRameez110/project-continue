import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, getUserRole } from "../../utils/auth";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandling";
import CreateUserModal from "../CreateUserModal";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AllPatients = () => {
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const token = getToken();
	const userRole = getUserRole();

	useEffect(() => {
		const fetchPatients = async () => {
			try {
				if (!token) {
					throw new Error("No authentication token found!");
				}
				const response = await axios.get(`${API_BASE_URL}/api/patients`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				console.log("see response in all patient.jsx ", response.data.patients);

				setPatients(response.data.patients.reverse());
			} catch (error) {
				console.log("Error fetching patients:", error);
				setError("Failed to load patients. Please check authentication.");
				showErrorToast(error);
			} finally {
				setLoading(false);
			}
		};

		fetchPatients();
	}, [refresh]);

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this patient?"))
			return;

		try {
			const response = await axios.delete(
				`${API_BASE_URL}/api/patients/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("see deleted patient response in All patient.jsx ", response);
			showSuccessToast(response.data.message);
			setRefresh((prev) => !prev);
		} catch (error) {
			console.error("Error deleting patient:", error);
			showErrorToast(error);
		}
	};

	if (loading) return <p className="text-center mt-10">Loading...</p>;
	if (error) return <p className="text-center text-red-500">{error}</p>;

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">All Patients</h1>

				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-green-500 text-white px-4 py-2 rounded">
					Create Patient
				</button>
			</div>

			{isModalOpen && (
				<CreateUserModal
					onClose={() => setIsModalOpen(false)}
					onCreate={() => setRefresh((prev) => !prev)}
					creatorRole={userRole}
				/>
			)}

			{patients.length === 0 ? (
				<p className="text-gray-600">No patients found.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
						<thead className="bg-blue-600 text-white">
							<tr>
								<th className="py-3 px-6 text-left">#</th>
								<th className="py-3 px-6 text-left">Patient ID</th>
								<th className="py-3 px-6 text-left">User Name</th>
								<th className="py-3 px-6 text-left">Email</th>
								<th className="py-3 px-6 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{patients.map((patient, index) => (
								<tr
									key={patient._id}
									className="border-b hover:bg-gray-100 transition">
									<td className="py-4 px-6">{index + 1}</td>
									<td className="py-4 px-6 text-gray-700 font-medium">
										{patient._id}
									</td>
									<td className="py-4 px-6 text-gray-600">
										{patient.user?.userName}
									</td>
									<td className="py-4 px-6 text-gray-500">
										{patient.user?.email}
									</td>
									<td className="py-4 px-6 flex gap-2">
										<Link
											to={`/${userRole}/patient/${patient._id}`}
											className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
											View
										</Link>
										<Link
											to={`/${userRole}/patient/edit/${patient._id}`}
											className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
											Edit
										</Link>
										<button
											onClick={() => handleDelete(patient._id)}
											className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition">
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

export default AllPatients;
