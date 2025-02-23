import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = getToken();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!token) throw new Error("Token not found");

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/order-medicines/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched order details:", response.data);

        if (response.data) {
          setOrderDetails(response.data.order);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (orderDetails) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl text-blue-700 font-semibold text-center mb-12">
          Order Details
        </h2>

        <div className="mt-4">
          {/* Order ID, Order Status, and Order Date in one row */}
          <div className="flex justify-between">
            <div>
              <strong>Order ID:</strong> {orderDetails._id}
            </div>
            <div>
              <strong>Order Status:</strong> {orderDetails.orderStatus}
            </div>
            <div>
              <strong>Order Date:</strong>{" "}
              {new Date(orderDetails.orderDate).toLocaleString()}
            </div>
          </div>

          {/* Patient Details */}
          <div className="mt-12">
            <strong>Patient Details:</strong>
            <div>
              <strong>Name:</strong> {orderDetails.patient.fullName}
            </div>
            <div>
              <strong>Age:</strong> {orderDetails.patient.age}
            </div>
            <div>
              <strong>Contact:</strong> {orderDetails.patient.contact}
            </div>
          </div>

          {/* Pharmacist Details (conditionally rendered if pharmacist exists) */}
          {orderDetails.pharmacist && (
            <div className="mt-4">
              <strong>Pharmacist Details:</strong>
              <div>
                <strong>Name:</strong> {orderDetails.pharmacist.fullName}
              </div>
              <div>
                <strong>Contact:</strong> {orderDetails.pharmacist.contact}
              </div>
              <div>
                <strong>Age:</strong> {orderDetails.pharmacist.age}
              </div>
            </div>
          )}

          {/* Prescription Details (table format) */}
          <div className="mt-4">
            <div className="text-center">
              <strong className="text-center text-green-800 text-xl">
                Prescription Details
              </strong>
            </div>
            <table className="min-w-full mt-2 border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-left">Medicine Name</th>
                  <th className="border px-4 py-2 text-left">Dosage</th>
                  <th className="border px-4 py-2 text-left">Frequency</th>
                  <th className="border px-4 py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.prescription.medicine.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.medicineName}</td>
                    <td className="border px-4 py-2">{item.dosage}</td>
                    <td className="border px-4 py-2">{item.frequency}</td>
                    <td className="border px-4 py-2">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return <div>No order details available</div>;
};

export default OrderDetails;
