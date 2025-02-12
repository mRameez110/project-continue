import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PharmacistProfile = () => {
  const [pharmacist, setPharmacist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/pharmacist/profile")
      .then((res) => res.json())
      .then((data) => setPharmacist(data.pharmacist))
      .catch((err) => console.error("Error fetching pharmacist:", err));
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/pharmacist/delete", { method: "DELETE" });
      if (res.ok) {
        navigate("/login");
      } else {
        console.error("Failed to delete profile");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  if (!pharmacist) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Pharmacist Profile</h2>
      <p>
        <strong>Full Name:</strong> {pharmacist.fullName}
      </p>
      <p>
        <strong>Age:</strong> {pharmacist.age}
      </p>
      <p>
        <strong>Contact:</strong> {pharmacist.contact}
      </p>
      <p>
        <strong>Pharmacy Branch:</strong> {pharmacist.pharmacyBranch?.name}
      </p>
      <button onClick={() => navigate("/edit-pharmacist")}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PharmacistProfile;
