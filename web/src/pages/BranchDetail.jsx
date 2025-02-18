import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, getUserRole, getUserId } from "../utils/auth";
import { showErrorToast, showSuccessToast } from "../utils/errorHandling";

const BranchDetail = () => {
	const token = getToken();
	const userRole = getUserRole();
	const userId = getUserId();
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

	const { id } = useParams();
	console.log("see on top of branch details.jsx with branch id ", id);
	const [branch, setBranch] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [updatedBranchData, setUpdatedBranchData] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchBranch = async () => {
			try {
				if (!token) {
					throw new Error("No authentication token found!");
				}

				const response = await axios.get(
					`${API_BASE_URL}/api/pharmacy-branches/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setBranch(response.data.branch);
				setUpdatedBranchData(response.data.branch);
				console.log(
					"see branch details response in branch details.jsx ",
					response
				);
			} catch (error) {
				setError("Failed to load branch details.");
			} finally {
				setLoading(false);
			}
		};

		fetchBranch();
	}, [id]);

	const handleInputChange = (field, value) => {
		setUpdatedBranchData({
			...updatedBranchData,
			[field]: value,
		});
	};

	const handleEdit = async (branchId) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				throw new Error("No authentication token found!");
			}

			const { pharmacists, createdAt, _id, __v, ...dataToUpdate } =
				updatedBranchData;

			const response = await axios.put(
				`${API_BASE_URL}/api/pharmacy-branches/${branchId}`,
				dataToUpdate,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			showSuccessToast(response.data.message);
			navigate(`/admin/branches`);
		} catch (error) {
			showErrorToast("Error updating branch.");
		}
	};

	const handleDelete = async (branchId) => {
		if (!window.confirm("Are you sure you want to delete this branch?")) return;
		try {
			if (!token) {
				throw new Error("No authentication token found!");
			}

			const response = await axios.delete(
				`${API_BASE_URL}/api/pharmacy-branches/${branchId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			showSuccessToast(response.data.message);
			navigate(`/admin/branches`);
		} catch (error) {
			showErrorToast("Error deleting branch.");
		}
	};

	if (loading) return <p className="text-center mt-10">Loading...</p>;
	if (error) return <p className="text-center text-red-500">{error}</p>;
	if (!branch)
		return <p className="text-center text-gray-600">No branch found.</p>;

	const canEditOrDelete =
		userRole === "admin" ||
		(userRole === "pharmacist" && branch.createdById === userId);

	const displayValue = (value, defaultValue = "Not available") => {
		return value || defaultValue;
	};

	return (
		<div className="p-4 sm:p-6 max-w-4xl mx-auto">
			<h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
				Branch Details
			</h2>
			<div className="border p-4 sm:p-6 rounded-lg shadow-lg bg-white">
				<div className="mb-4">
					<p className="text-lg font-semibold text-gray-700">
						<strong>Branch Name:</strong> {displayValue(branch.name)}
					</p>
					<p className="text-gray-600">
						<strong>Branch ID:</strong> {displayValue(branch._id)}
					</p>
					<p className="text-gray-600">
						<strong>Address:</strong> {displayValue(branch.address)}
					</p>
					<p className="text-gray-600">
						<strong>Contact Info:</strong> {displayValue(branch.contact)}
					</p>
				</div>

				<h3 className="text-xl font-bold mt-4">Assigned Pharmacists</h3>
				<table className="min-w-full table-auto border-collapse mt-4">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-2 text-left">Username</th>
							<th className="px-4 py-2 text-left">Email</th>
							<th className="px-4 py-2 text-left">Age</th>
							<th className="px-4 py-2 text-left">Contact Info</th>
						</tr>
					</thead>
					<tbody>
						{branch.pharmacists.map((pharmacist) => (
							<tr key={pharmacist._id} className="border-t">
								<td className="px-4 py-2">
									{displayValue(pharmacist.user?.userName)}
								</td>
								<td className="px-4 py-2">
									{displayValue(pharmacist.user?.email)}
								</td>
								<td className="px-4 py-2">{displayValue(pharmacist.age)}</td>
								<td className="px-4 py-2">
									{displayValue(pharmacist.contact)}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{isEditing && (
					<div className="mt-4">
						<h3 className="text-lg font-bold mb-2">Edit Branch</h3>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Branch Name
						</label>
						<input
							type="text"
							value={updatedBranchData.name}
							onChange={(e) => handleInputChange("name", e.target.value)}
							className="border p-2 w-full mb-4"
						/>

						<label className="block text-sm font-medium text-gray-700 mb-1">
							Address
						</label>
						<input
							type="text"
							value={updatedBranchData.address}
							onChange={(e) => handleInputChange("address", e.target.value)}
							className="border p-2 w-full mb-4"
						/>

						<label className="block text-sm font-medium text-gray-700 mb-1">
							Contact Info
						</label>
						<input
							type="text"
							value={updatedBranchData.contactInfo}
							onChange={(e) => handleInputChange("contactInfo", e.target.value)}
							className="border p-2 w-full"
						/>
					</div>
				)}

				{canEditOrDelete && (
					<div className="mt-4 flex justify-end space-x-2">
						<button
							onClick={() => setIsEditing(!isEditing)}
							className="bg-yellow-500 text-white px-3 py-1 rounded">
							{isEditing ? "Cancel Edit" : "Edit Branch"}
						</button>
						{isEditing && (
							<button
								onClick={() => handleEdit(branch._id)}
								className="bg-green-500 text-white px-3 py-1 rounded">
								Save Changes
							</button>
						)}
						<button
							onClick={() => handleDelete(branch._id)}
							className="bg-red-500 text-white px-3 py-1 rounded">
							Delete Branch
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default BranchDetail;
