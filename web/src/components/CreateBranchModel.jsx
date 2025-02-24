import { useState, useEffect } from "react";
import axios from "axios";
import { getToken, getUserRole } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/errorHandling";
import Select from "react-select";

const CreateBranchModal = ({ onClose, onCreate }) => {
	const navigate = useNavigate();
	const [pharmacists, setPharmacists] = useState([]);
	const [branchName, setBranchName] = useState("");
	const [address, setAddress] = useState("");
	const [contact, setContact] = useState("");
	const [selectedPharmacists, setSelectedPharmacists] = useState([]);
	const [loading, setLoading] = useState(false);

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

	const token = getToken();
	const userRole = getUserRole();

	useEffect(() => {
		const fetchPharmacists = async () => {
			try {
				if (!token) {
					throw new Error("No authentication token found!");
				}

				const response = await axios.get(`${API_BASE_URL}/api/pharmacists`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				console.log(
					"see Fetched pharmacists in create branchmodel.jsx ",
					response.data
				);

				const pharmacistsWithoutBranch = response.data.pharmacists.filter(
					(pharmacist) => !pharmacist.pharmacyBranch
				);
				setPharmacists(pharmacistsWithoutBranch.reverse());
				console.log(
					"see only without branch pharmacists in create branch model.jsx ",
					pharmacistsWithoutBranch
				);
			} catch (error) {
				console.error("Error fetching pharmacists", error);
				showErrorToast(error);
			}
		};
		fetchPharmacists();
	}, [token]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (!token) {
				throw new Error("No authentication token found!");
			}

			const response = await axios.post(
				`${API_BASE_URL}/api/pharmacy-branches`,
				{
					name: branchName,
					address,
					contact,
					pharmacists: selectedPharmacists,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (onCreate) onCreate();
			onClose();
			showSuccessToast(response.data.message);
			navigate(`/${userRole}/branches`);
		} catch (error) {
			console.error("Error creating branch", error.response?.data?.message);
			showErrorToast(error);
		} finally {
			setLoading(false);
		}
	};

	// Format pharmacists for react-select
	const pharmacistOptions = pharmacists.map((pharmacist) => ({
		value: pharmacist._id,
		label: pharmacist.user?.userName,
	}));

	const handleSelectChange = (selectedOptions) => {
		setSelectedPharmacists(selectedOptions.map((option) => option.value));
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
				<h2 className="text-xl font-bold mb-4">Create Branch</h2>
				<form onSubmit={handleSubmit}>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Branch Name
					</label>
					<input
						type="text"
						placeholder="Branch Name"
						className="border p-2 w-full"
						value={branchName}
						onChange={(e) => setBranchName(e.target.value)}
						required
					/>

					<label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
						Address
					</label>
					<input
						type="text"
						placeholder="Address"
						className="border p-2 w-full"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>

					<label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
						Contact
					</label>
					<input
						type="text"
						placeholder="03xx xxxxxxx"
						className="border p-2 w-full"
						value={contact}
						onChange={(e) => setContact(e.target.value)}
					/>

					<label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
						Select Pharmacists
					</label>

					{pharmacists.length > 0 ? (
						<Select
							isMulti
							options={pharmacistOptions}
							onChange={handleSelectChange}
							value={pharmacistOptions.filter((option) =>
								selectedPharmacists.includes(option.value)
							)}
							className="mb-4"
						/>
					) : (
						<p>No Pharmacist available to select</p>
					)}

					<div className="flex justify-end space-x-2">
						<button
							className="bg-gray-400 text-white px-4 py-2 rounded"
							onClick={onClose}>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-green-500 text-white px-4 py-2 rounded"
							disabled={loading}>
							{loading ? "Saving..." : "Create"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateBranchModal;
