// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// // Placeholder data for a specific prescription
// const dummyPrescriptionDetail = {
//   id: 1,
//   medicine: "Aspirin",
//   dosage: "500mg",
//   frequency: "Twice a day",
//   duration: "7 days",
//   instructions: "Take with food.",
//   doctor: "Dr. John Doe",
//   prescribedDate: "2025-02-01",
// };

// const PrescriptionDetail = () => {
//   const { id } = useParams();
//   const [prescriptionDetail, setPrescriptionDetail] = useState(
//     dummyPrescriptionDetail
//   );

//   // Fetch prescription details from API (placeholder for now)
//   useEffect(() => {
//     // You can replace this with an actual API call to get prescription details by ID
//     // fetch(`YOUR_API_ENDPOINT/${id}`)
//     //   .then((res) => res.json())
//     //   .then((data) => setPrescriptionDetail(data))
//     //   .catch((error) => console.error("Error fetching prescription detail:", error));
//   }, [id]);

//   return (
//     <div className="bg-white p-6 shadow-md rounded-md">
//       <h2 className="text-xl font-semibold mb-4">Prescription Details</h2>
//       <div>
//         <h3 className="text-lg font-semibold">
//           Medicine: {prescriptionDetail.medicine}
//         </h3>
//         <p>
//           <strong>Dosage:</strong> {prescriptionDetail.dosage}
//         </p>
//         <p>
//           <strong>Frequency:</strong> {prescriptionDetail.frequency}
//         </p>
//         <p>
//           <strong>Duration:</strong> {prescriptionDetail.duration}
//         </p>
//         <p>
//           <strong>Instructions:</strong> {prescriptionDetail.instructions}
//         </p>
//         <p>
//           <strong>Doctor:</strong> {prescriptionDetail.doctor}
//         </p>
//         <p>
//           <strong>Prescribed Date:</strong> {prescriptionDetail.prescribedDate}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionDetail;

// import { useParams, Link } from "react-router-dom";

// const PrescriptionDetail = () => {
//   const { id } = useParams();
//   const prescription = {
//     id,
//     doctor: "Dr. Smith",
//     date: "2024-02-12",
//     medicines: ["Paracetamol", "Ibuprofen", "Amoxicillin"],
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>
//       <div className="bg-white p-4 rounded shadow-md">
//         <p>
//           <strong>Doctor:</strong> {prescription.doctor}
//         </p>
//         <p>
//           <strong>Date:</strong> {prescription.date}
//         </p>
//         <h3 className="text-xl font-bold mt-4">Medicines:</h3>
//         <ul className="list-disc ml-6">
//           {prescription.medicines.map((med, index) => (
//             <li key={index}>{med}</li>
//           ))}
//         </ul>
//         <Link
//           to="/patient-dashboard/prescriptions"
//           className="mt-4 inline-block bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
//         >
//           Back to Prescriptions
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionDetail;

import { useParams } from "react-router-dom";

const prescriptions = [
  {
    id: "p1",
    patientId: "user123",
    pharmacistId: "pharma567",
    medicine: "Paracetamol",
    dosage: "500mg",
    instructions: "Take twice a day after meals",
    date: "2024-02-12",
  },
  {
    id: "p2",
    patientId: "user456",
    pharmacistId: "pharma789",
    medicine: "Amoxicillin",
    dosage: "250mg",
    instructions: "Take three times a day before meals",
    date: "2024-02-11",
  },
];

const PrescriptionDetail = () => {
  const { id } = useParams();
  const prescription = prescriptions.find((p) => p.id === id);

  if (!prescription) {
    return <p className="text-red-500">Prescription not found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>
      <div className="border p-4 rounded-md shadow-md bg-white">
        <p>
          <strong>Medicine:</strong> {prescription.medicine}
        </p>
        <p>
          <strong>Dosage:</strong> {prescription.dosage}
        </p>
        <p>
          <strong>Instructions:</strong> {prescription.instructions}
        </p>
        <p>
          <strong>Date:</strong> {prescription.date}
        </p>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
