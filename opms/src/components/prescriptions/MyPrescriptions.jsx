import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Placeholder data for prescriptions
const dummyPrescriptions = [
  { id: 1, medicine: "Aspirin", date: "2025-02-01", doctor: "Dr. John Doe" },
  {
    id: 2,
    medicine: "Ibuprofen",
    date: "2025-01-15",
    doctor: "Dr. Jane Smith",
  },
  {
    id: 3,
    medicine: "Paracetamol",
    date: "2025-01-20",
    doctor: "Dr. Mark Lee",
  },
  // Add more dummy data if needed
];

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState(dummyPrescriptions);
  const navigate = useNavigate();

  // Fetch prescriptions from API (placeholder for now)
  useEffect(() => {
    // You can replace this with an actual API call later
    // fetch("YOUR_API_ENDPOINT")
    //   .then((res) => res.json())
    //   .then((data) => setPrescriptions(data))
    //   .catch((error) => console.error("Error fetching prescriptions:", error));
  }, []);

  // Handle row click to navigate to prescription detail page
  const handlePrescriptionClick = (id) => {
    navigate(`/patient/prescriptions/${id}`); // Navigate to detail page
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">My Prescriptions</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Medicine</th>
            <th className="border-b p-2">Date</th>
            <th className="border-b p-2">Doctor</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr
              key={prescription.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handlePrescriptionClick(prescription.id)}
            >
              <td className="border-b p-2">{prescription.medicine}</td>
              <td className="border-b p-2">{prescription.date}</td>
              <td className="border-b p-2">{prescription.doctor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPrescriptions;
