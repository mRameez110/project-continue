import { useState } from "react";
import CreateUserModal from "../components/CreateUserModal";
import CreatePrescriptionModal from "../components/prescriptions/CreatePrescriptionModal";

const PharmacistDashboard = () => {
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h2 className="text-2xl font-bold text-center mb-10">
				Pharmacist Dashboard
			</h2>

			<div className="flex flex-col align-center space-y-5">
				<button
					onClick={() => setIsUserModalOpen(true)}
					className="bg-green-500 text-white px-4 py-2 rounded">
					Create Patient
				</button>

				{isUserModalOpen && (
					<CreateUserModal
						onClose={() => setIsUserModalOpen(false)}
						creatorRole="pharmacist"
					/>
				)}

				<button
					onClick={() => setIsPrescriptionModalOpen(true)}
					className="bg-blue-500 text-white px-4 py-2 rounded">
					Create Prescription
				</button>

				{isPrescriptionModalOpen && (
					<CreatePrescriptionModal
						isOpen={isPrescriptionModalOpen}
						onClose={() => setIsPrescriptionModalOpen(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default PharmacistDashboard;
