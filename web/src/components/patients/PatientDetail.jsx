import { getToken, getUserRole } from "../../utils/auth";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CreatePrescriptionModal from "../prescriptions/CreatePrescriptionModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PatientDetail = () => {
	const { id } = useParams();
	const [patient, setPatient] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

	const token = getToken();
	const userRole = getUserRole();

	useEffect(() => {
		const fetchPatient = async () => {
			try {
				if (!token) {
					throw new Error("No authentication token found!");
				}

				const response = await axios.get(`${API_BASE_URL}/api/patients/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				console.log("see response in patient details .jsx ", response.data);
				setPatient(response.data.user);
			} catch (error) {
				console.error("Error fetching patient:", error);
				setError(error || "Failed to load patient details.");
			} finally {
				setLoading(false);
			}
		};

		fetchPatient();
	}, [id]);

	if (loading) return <p className="text-center mt-10">Loading...</p>;
	if (error) return <p className="text-center text-red-500">{error}</p>;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6 text-gray-800">Patient Details</h1>
			{patient ? (
				<div className="bg-white shadow-md rounded-3xl p-6">
					<p className="text-gray-700 font-medium">
						Patient ID: {patient._id || "N/A"}
					</p>
					<p className="text-gray-700 font-medium">
						User Name: {patient.user?.userName || "N/A"}
					</p>
					<p className="text-gray-700 font-medium">
						Email: {patient.user?.email || "N/A"}
					</p>

					<p className="text-gray-700 font-medium">
						Age: {patient.age || "N/A"}
					</p>
					<p className="text-gray-700 font-medium">
						Contact: {patient.contact || "N/A"}
					</p>

					{userRole && userRole !== "patient" && (
						<>
							<div className="flex justify-end mb-4">
								<button
									onClick={() => setIsPrescriptionModalOpen(true)}
									className="bg-blue-500 text-white px-4 py-2 rounded">
									Assign Prescription
								</button>
							</div>

							{isPrescriptionModalOpen && (
								<CreatePrescriptionModal
									onClose={() => setIsPrescriptionModalOpen(false)}
									patientId={id}
								/>
							)}
						</>
					)}

					<div className="flex justify-end mt-4">
						<Link
							to={`/${userRole}/patient/edit/${patient._id}`}
							className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
							Edit
						</Link>
					</div>
				</div>
			) : (
				<p className="text-gray-600">Patient not found.</p>
			)}
		</div>
	);
};

export default PatientDetail;
