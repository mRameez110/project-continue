// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getToken, getUserRole } from "../utils/auth";
// import { showErrorToast, showSuccessToast } from "../utils/errorHandling";

// const BranchDetail = () => {
// 	const token = getToken();
// 	const userRole = getUserRole();
// 	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 	const { id } = useParams();
// 	const navigate = useNavigate();

// 	const [branch, setBranch] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const [isEditing, setIsEditing] = useState(false);
// 	const [updatedBranchData, setUpdatedBranchData] = useState(null);
// 	const [pharmacists, setPharmacists] = useState([]);
// 	const [selectedPharmacists, setSelectedPharmacists] = useState([]);

// 	useEffect(() => {
// 		const fetchBranch = async () => {
// 			try {
// 				const response = await axios.get(
// 					`${API_BASE_URL}/api/pharmacy-branches/${id}`,
// 					{
// 						headers: { Authorization: `Bearer ${token}` },
// 					}
// 				);
// 				setBranch(response.data.branch);
// 				setUpdatedBranchData(response.data.branch);
// 			} catch (error) {
// 				setError(error || "Failed to load branch details.");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchBranch();
// 	}, [id]);

// 	useEffect(() => {
// 		const fetchPharmacists = async () => {
// 			try {
// 				const response = await axios.get(`${API_BASE_URL}/api/pharmacists`, {
// 					headers: { Authorization: `Bearer ${token}` },
// 				});

// 				const pharmacistsWithoutBranch = response.data.pharmacists.filter(
// 					(pharmacist) => !pharmacist.pharmacyBranch
// 				);
// 				setPharmacists(pharmacistsWithoutBranch.reverse());
// 			} catch (error) {
// 				showErrorToast(error);
// 			}
// 		};
// 		fetchPharmacists();
// 	}, [isEditing]);

// 	const handleInputChange = (field, value) => {
// 		setUpdatedBranchData({
// 			...updatedBranchData,
// 			[field]: value,
// 		});
// 	};

// 	const handleEdit = async () => {
// 		try {
// 			console.log("see update branch edit data ", updatedBranchData);
// 			const { _id, ...dataToUpdate } = updatedBranchData;

// 			console.log("see data to update branch ", dataToUpdate);

// 			dataToUpdate.pharmacists =
// 				selectedPharmacists.length > 0 ? selectedPharmacists : [];

// 			const response = await axios.put(
// 				`${API_BASE_URL}/api/pharmacy-branches/${id}`,
// 				dataToUpdate,
// 				{
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 					},
// 				}
// 			);

// 			showSuccessToast(response.data.message);
// 			navigate(`/admin/branches`);
// 		} catch (error) {
// 			showErrorToast(error);
// 		}
// 	};

// 	const handleDelete = async () => {
// 		if (!window.confirm("Are you sure you want to delete this branch?")) return;
// 		try {
// 			const response = await axios.delete(
// 				`${API_BASE_URL}/api/pharmacy-branches/${id}`,
// 				{
// 					headers: { Authorization: `Bearer ${token}` },
// 				}
// 			);
// 			showSuccessToast(response.data.message);
// 			navigate(`/admin/branches`);
// 		} catch (error) {
// 			showErrorToast("Error deleting branch.");
// 			showErrorToast(error);
// 		}
// 	};

// 	if (loading) return <p className="text-center mt-10">Loading...</p>;
// 	if (error) return <p className="text-center text-red-500">{error}</p>;
// 	if (!branch)
// 		return <p className="text-center text-gray-600">No branch found.</p>;

// 	const canEditOrDelete = userRole === "admin";
// 	const displayValue = (value, defaultValue = "Not available") => {
// 		return value || defaultValue;
// 	};

// 	return (
// 		<div className="p-4 sm:p-6 max-w-4xl mx-auto">
// 			<h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
// 				Branch Details
// 			</h2>
// 			<div className="border p-4 sm:p-6 rounded-lg shadow-lg bg-white">
// 				<div className="mb-4">
// 					<p className="text-lg font-semibold text-gray-700">
// 						<strong>Branch Name:</strong> {displayValue(branch.name)}
// 					</p>
// 					<p className="text-gray-600">
// 						<strong>Branch ID:</strong> {displayValue(branch._id)}
// 					</p>
// 					<p className="text-gray-600">
// 						<strong>Address:</strong> {displayValue(branch.address)}
// 					</p>
// 					<p className="text-gray-600">
// 						<strong>Contact :</strong> {displayValue(branch.contact)}
// 					</p>
// 				</div>

// 				<h3 className="text-xl font-bold mt-4">Assigned Pharmacists</h3>
// 				<table className="min-w-full table-auto border-collapse mt-4">
// 					<thead className="bg-gray-100">
// 						<tr>
// 							<th className="px-4 py-2 text-left">Username</th>
// 							<th className="px-4 py-2 text-left">Email</th>
// 							<th className="px-4 py-2 text-left">Age</th>
// 							<th className="px-4 py-2 text-left">Contact </th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{branch.pharmacists.map((pharmacist) => (
// 							<tr key={pharmacist._id} className="border-t">
// 								<td className="px-4 py-2">
// 									{displayValue(pharmacist.user?.userName)}
// 								</td>
// 								<td className="px-4 py-2">
// 									{displayValue(pharmacist.user?.email)}
// 								</td>
// 								<td className="px-4 py-2">{displayValue(pharmacist.age)}</td>
// 								<td className="px-4 py-2">
// 									{displayValue(pharmacist.contact)}
// 								</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>

// 				{isEditing && (
// 					<div className="mt-4">
// 						<h3 className="text-lg font-bold mb-2">Edit Branch</h3>
// 						<label className="block text-sm font-medium text-gray-700 mb-1">
// 							Branch Name
// 						</label>
// 						<input
// 							type="text"
// 							value={updatedBranchData.name}
// 							onChange={(e) => handleInputChange("name", e.target.value)}
// 							className="border p-2 w-full mb-4"
// 						/>

// 						<label className="block text-sm font-medium text-gray-700 mb-1">
// 							Address
// 						</label>
// 						<input
// 							type="text"
// 							value={updatedBranchData.address}
// 							onChange={(e) => handleInputChange("address", e.target.value)}
// 							className="border p-2 w-full mb-4"
// 						/>

// 						<label className="block text-sm font-medium text-gray-700 mb-1">
// 							Contact
// 						</label>
// 						<input
// 							type="text"
// 							value={updatedBranchData.contact}
// 							onChange={(e) => handleInputChange("contact", e.target.value)}
// 							className="border p-2 w-full"
// 						/>

// 						{pharmacists.length > 0 ? (
// 							<select
// 								className="w-full border p-2 rounded mb-4 text-black bg-white"
// 								multiple
// 								onChange={(e) =>
// 									setSelectedPharmacists(
// 										Array.from(
// 											e.target.selectedOptions,
// 											(option) => option.value
// 										)
// 									)
// 								}>
// 								{pharmacists.map((pharmacist) => (
// 									<option key={pharmacist._id} value={pharmacist._id}>
// 										{pharmacist.user?.userName}
// 									</option>
// 								))}
// 							</select>
// 						) : (
// 							<p>No Pharmacist available to select</p>
// 						)}
// 					</div>
// 				)}

// 				{canEditOrDelete && (
// 					<div className="mt-4 flex justify-end space-x-3">
// 						<button
// 							onClick={() => setIsEditing(!isEditing)}
// 							className="bg-yellow-500 text-white px-3 py-1 rounded">
// 							{isEditing ? "Cancel Edit" : "Edit Branch"}
// 						</button>
// 						{isEditing && (
// 							<button
// 								onClick={handleEdit}
// 								className="bg-green-500 text-white px-3 py-1 rounded">
// 								Save Changes
// 							</button>
// 						)}
// 						<button
// 							onClick={handleDelete}
// 							className="bg-red-500 text-white px-3 py-1 rounded">
// 							Delete Branch
// 						</button>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default BranchDetail;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, getUserRole } from "../utils/auth";
import { showErrorToast, showSuccessToast } from "../utils/errorHandling";
import Select from "react-select"; // Import react-select

const BranchDetail = () => {
	const token = getToken();
	const userRole = getUserRole();
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

	const { id } = useParams();
	const navigate = useNavigate();

	const [branch, setBranch] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [updatedBranchData, setUpdatedBranchData] = useState(null);
	const [pharmacists, setPharmacists] = useState([]);
	const [selectedPharmacists, setSelectedPharmacists] = useState([]);

	useEffect(() => {
		const fetchBranch = async () => {
			try {
				const response = await axios.get(
					`${API_BASE_URL}/api/pharmacy-branches/${id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setBranch(response.data.branch);
				setUpdatedBranchData(response.data.branch);
				setSelectedPharmacists(
					response.data.branch.pharmacists.map((pharmacist) => pharmacist._id)
				);
			} catch (error) {
				setError(error || "Failed to load branch details.");
			} finally {
				setLoading(false);
			}
		};
		fetchBranch();
	}, [id, token]);

	useEffect(() => {
		const fetchPharmacists = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/api/pharmacists`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				const pharmacistsWithoutBranch = response.data.pharmacists.filter(
					(pharmacist) => !pharmacist.pharmacyBranch
				);
				setPharmacists(pharmacistsWithoutBranch.reverse());
			} catch (error) {
				showErrorToast(error);
			}
		};
		fetchPharmacists();
	}, [isEditing, token]);

	const handleInputChange = (field, value) => {
		setUpdatedBranchData({
			...updatedBranchData,
			[field]: value,
		});
	};

	const handleEdit = async () => {
		try {
			console.log("see update branch edit data ", updatedBranchData);
			const { _id, ...dataToUpdate } = updatedBranchData;

			console.log("see data to update branch ", dataToUpdate);

			dataToUpdate.pharmacists =
				selectedPharmacists.length > 0 ? selectedPharmacists : [];

			const response = await axios.put(
				`${API_BASE_URL}/api/pharmacy-branches/${id}`,
				dataToUpdate,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			showSuccessToast(response.data.message);
			navigate(`/admin/branches`);
		} catch (error) {
			showErrorToast(error);
		}
	};

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this branch?")) return;
		try {
			const response = await axios.delete(
				`${API_BASE_URL}/api/pharmacy-branches/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			showSuccessToast(response.data.message);
			navigate(`/admin/branches`);
		} catch (error) {
			showErrorToast("Error deleting branch.");
			showErrorToast(error);
		}
	};

	// Format pharmacists for react-select
	const pharmacistOptions = pharmacists.map((pharmacist) => ({
		value: pharmacist._id,
		label: pharmacist.user?.userName,
	}));

	// Handle changes in selected pharmacists using react-select
	const handleSelectChange = (selectedOptions) => {
		setSelectedPharmacists(selectedOptions.map((option) => option.value));
	};

	if (loading) return <p className="text-center mt-10">Loading...</p>;
	if (error) return <p className="text-center text-red-500">{error}</p>;
	if (!branch)
		return <p className="text-center text-gray-600">No branch found.</p>;

	const canEditOrDelete = userRole === "admin";
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
						<strong>Contact :</strong> {displayValue(branch.contact)}
					</p>
				</div>

				<h3 className="text-xl font-bold mt-4">Assigned Pharmacists</h3>
				<table className="min-w-full table-auto border-collapse mt-4">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-2 text-left">Username</th>
							<th className="px-4 py-2 text-left">Email</th>
							<th className="px-4 py-2 text-left">Age</th>
							<th className="px-4 py-2 text-left">Contact </th>
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
							Contact
						</label>
						<input
							type="text"
							value={updatedBranchData.contact}
							onChange={(e) => handleInputChange("contact", e.target.value)}
							className="border p-2 w-full"
						/>

						<label className="block text-sm font-medium text-gray-700 mb-1">
							Select Pharmacists
						</label>
						<Select
							isMulti
							options={pharmacistOptions}
							onChange={handleSelectChange}
							value={pharmacistOptions.filter((option) =>
								selectedPharmacists.includes(option.value)
							)}
							className="mb-4"
						/>
					</div>
				)}

				{canEditOrDelete && (
					<div className="mt-4 flex justify-end space-x-3">
						<button
							onClick={() => setIsEditing(!isEditing)}
							className="bg-yellow-500 text-white px-3 py-1 rounded">
							{isEditing ? "Cancel Edit" : "Edit Branch"}
						</button>
						{isEditing && (
							<button
								onClick={handleEdit}
								className="bg-green-500 text-white px-3 py-1 rounded">
								Save Changes
							</button>
						)}
						<button
							onClick={handleDelete}
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
