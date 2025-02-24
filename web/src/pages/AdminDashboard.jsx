import { useState } from "react";
import CreateUserModal from "../components/CreateUserModal";
import CreatePrescriptionModal from "../components/prescriptions/CreatePrescriptionModal";
import CreateBranchModal from "../components/CreateBranchModel";

const AdminDashboard = () => {
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
	const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h2 className="text-2xl font-bold text-center mb-10">Admin Dashboard</h2>

			<div className="flex justify-center space-x-5">
				<button
					onClick={() => setIsUserModalOpen(true)}
					className="bg-blue-500 text-white px-4 py-2 rounded">
					Create User
				</button>

				{isUserModalOpen && (
					<CreateUserModal
						onClose={() => setIsUserModalOpen(false)}
						creatorRole="admin"
					/>
				)}

				<button
					onClick={() => setIsPrescriptionModalOpen(true)}
					className="bg-green-500 text-white px-4 py-2 rounded">
					Create Prescription
				</button>

				{isPrescriptionModalOpen && (
					<CreatePrescriptionModal
						onClose={() => setIsPrescriptionModalOpen(false)}
					/>
				)}

				<button
					onClick={() => setIsBranchModalOpen(true)}
					className="bg-purple-500 text-white px-4 py-2 rounded">
					Create Branch
				</button>

				{isBranchModalOpen && (
					<CreateBranchModal onClose={() => setIsBranchModalOpen(false)} />
				)}
			</div>
		</div>
	);
};

export default AdminDashboard;
