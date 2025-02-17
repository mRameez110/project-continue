import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyData } from "../../data/dummyData"; // Import the dummy data

const TopPharDetails = () => {
  const { id } = useParams(); // Get the pharmacist ID from the URL params
  const [pharmacist, setPharmacist] = useState(null);

  useEffect(() => {
    // Find the pharmacist by ID
    const selectedPharmacist = dummyData.pharmacists.find(
      (pharmacist) => pharmacist.id === parseInt(id)
    );

    if (selectedPharmacist) {
      setPharmacist(selectedPharmacist);
    } else {
      // Handle the case where no pharmacist is found
      alert("Pharmacist not found!");
    }
  }, [id]);

  if (!pharmacist) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-8">{pharmacist.name} Profile</h2>
      <div className="space-y-2">
        <p>
          <strong className="inline-block w-40">User Name:</strong>{" "}
          {pharmacist.name}
        </p>
        <p>
          <strong className="inline-block w-40">Age:</strong> {pharmacist.age}
        </p>
        <p>
          <strong className="inline-block w-40">Contact:</strong>{" "}
          {pharmacist.phone}
        </p>
        <p>
          <strong className="inline-block w-40">Email:</strong>{" "}
          {pharmacist.email}
        </p>
        <p>
          <strong className="inline-block w-40">Pharmacy Branch:</strong>{" "}
          {pharmacist.pharmacyBranch?.name || "N/A"}
        </p>
        <p>
          <strong className="inline-block w-40">Address:</strong>{" "}
          {pharmacist.address || "N/A"}
        </p>
        <p>
          <strong className="inline-block w-40">Experience:</strong>{" "}
          {pharmacist.experience || "N/A"}
        </p>
        <p>
          <strong className="inline-block w-40">Education:</strong>{" "}
          {pharmacist.education || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default TopPharDetails;
