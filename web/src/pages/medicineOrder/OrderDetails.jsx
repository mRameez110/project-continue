import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderDetails = () => {
  // Get the orderId from URL parameters
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details based on the orderId
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/orders/${orderId}`
        );

        if (response.data) {
          setOrderDetails(response.data.order); // Assuming the response contains an 'order' object
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Handle order status update (could be done here as per your use case)
  const handleStatusChange = (newStatus) => {
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      status: newStatus,
    }));

    // You can send a request to update the order status on the server as well
    axios
      .put(`${API_BASE_URL}/api/orders/${orderId}`, {
        status: newStatus,
      })
      .then((response) => {
        console.log("Order status updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  // Loading state
  if (loading) {
    return <div>Loading order details...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // If order details are available, render them
  if (orderDetails) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold">Order Details</h2>

        <div className="mt-4">
          <div>
            <strong>Order ID:</strong> {orderDetails.orderId}
          </div>
          <div>
            <strong>Customer Name:</strong> {orderDetails.customerName}
          </div>
          <div>
            <strong>Status:</strong> {orderDetails.status}
          </div>
          <div>
            <strong>Items:</strong>
          </div>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity}
              </li>
            ))}
          </ul>
          <div>
            <strong>Shipping Address:</strong> {orderDetails.shippingAddress}
          </div>
          <div>
            <strong>Order Date:</strong>{" "}
            {new Date(orderDetails.createdAt).toLocaleString()}
          </div>

          {/* Order status update options */}
          <div className="mt-4">
            <strong>Update Order Status</strong>
            <div>
              <button
                onClick={() => handleStatusChange("pending")}
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
              >
                Pending
              </button>
              <button
                onClick={() => handleStatusChange("dispatched")}
                className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 ml-2"
              >
                Dispatched
              </button>
              <button
                onClick={() => handleStatusChange("delivered")}
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 ml-2"
              >
                Delivered
              </button>
              <button
                onClick={() => handleStatusChange("received")}
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 ml-2"
              >
                Received
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate(-1)} // Go back to previous page
              className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div>No order details available</div>;
};

export default OrderDetails;
