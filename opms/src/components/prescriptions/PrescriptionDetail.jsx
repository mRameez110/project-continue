import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Placeholder data for a specific prescription
const dummyPrescriptionDetail = {
  id: 1,
  medicine: "Aspirin",
  dosage: "500mg",
  frequency: "Twice a day",
  duration: "7 days",
  instructions: "Take with food.",
  doctor: "Dr. John Doe",
  prescribedDate: "2025-02-01",
};

const PrescriptionDetail = () => {
  const { id } = useParams();
  const [prescriptionDetail, setPrescriptionDetail] = useState(
    dummyPrescriptionDetail
  );

  // Fetch prescription details from API (placeholder for now)
  useEffect(() => {
    // You can replace this with an actual API call to get prescription details by ID
    // fetch(`YOUR_API_ENDPOINT/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => setPrescriptionDetail(data))
    //   .catch((error) => console.error("Error fetching prescription detail:", error));
  }, [id]);

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Prescription Details</h2>
      <div>
        <h3 className="text-lg font-semibold">
          Medicine: {prescriptionDetail.medicine}
        </h3>
        <p>
          <strong>Dosage:</strong> {prescriptionDetail.dosage}
        </p>
        <p>
          <strong>Frequency:</strong> {prescriptionDetail.frequency}
        </p>
        <p>
          <strong>Duration:</strong> {prescriptionDetail.duration}
        </p>
        <p>
          <strong>Instructions:</strong> {prescriptionDetail.instructions}
        </p>
        <p>
          <strong>Doctor:</strong> {prescriptionDetail.doctor}
        </p>
        <p>
          <strong>Prescribed Date:</strong> {prescriptionDetail.prescribedDate}
        </p>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
