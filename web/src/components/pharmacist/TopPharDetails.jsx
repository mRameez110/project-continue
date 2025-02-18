import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyData } from "../../data/dummyData";

const TopPharDetails = () => {
  const { id } = useParams();
  const [pharmacist, setPharmacist] = useState(null);

  useEffect(() => {
    const selectedPharmacist = dummyData.pharmacists.find(
      (pharmacist) => pharmacist.id === parseInt(id)
    );

    if (selectedPharmacist) {
      setPharmacist(selectedPharmacist);
    } else {
      alert("Pharmacist not found!");
    }
  }, [id]);

  if (!pharmacist) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-20">
      <div className="flex justify-center mb-10">
        <img
          src={pharmacist.image}
          alt={pharmacist.name}
          className="rounded-full w-64 h-64 object-cover border-4 border-indigo-600 shadow-lg"
        />
      </div>
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
        {pharmacist.name}'s Profile
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            Personal Info
          </h3>
          <p className="text-lg mb-2">
            <strong className="font-medium text-gray-800">Age:</strong>{" "}
            {pharmacist.age}
          </p>
          <p className="text-lg mb-2">
            <strong className="font-medium text-gray-800">Contact:</strong>{" "}
            {pharmacist.phone}
          </p>
          <p className="text-lg mb-2">
            <strong className="font-medium text-gray-800">Email:</strong>{" "}
            {pharmacist.email}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            Pharmacy Info
          </h3>
          <p className="text-lg mb-2">
            <strong className="font-medium text-gray-800">
              Pharmacy Branch:
            </strong>{" "}
            {pharmacist.pharmacyBranch?.name || "N/A"}
          </p>
          <p className="text-lg mb-2">
            <strong className="font-medium text-gray-800">Address:</strong>{" "}
            {pharmacist.address || "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">
          Professional Info
        </h3>
        <p className="text-lg mb-2">
          <strong className="font-medium text-gray-800">Experience:</strong>{" "}
          {pharmacist.experience || "N/A"}
        </p>
        <p className="text-lg mb-2">
          <strong className="font-medium text-gray-800">Education:</strong>{" "}
          {pharmacist.education || "N/A"}
        </p>
      </div>

      <div className="mt-8 text-center">
        <a
          href={`mailto:${pharmacist.email}`}
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Email Pharmacist
        </a>
      </div>
    </div>
  );
};

export default TopPharDetails;
