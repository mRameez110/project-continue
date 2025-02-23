import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, getUserRole } from "../../utils/auth";
import StatusSlider from "../../components/StatusSlider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusChanged, setStatusChanged] = useState(false);
  const navigate = useNavigate();
  const token = getToken();
  const loggedUserRole = getUserRole();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) throw new Error("Token not found");

        const response = await axios.get(
          `${API_BASE_URL}/api/order-medicines`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data?.orders) {
          const updatedOrders = response.data.orders?.map((order) => {
            const customerName = order.patient
              ? order.patient.user?.userName
              : "Unknown";
            const orderDate = new Date(order.orderDate).toLocaleString();

            return {
              ...order,
              orderId: order._id.toString(),
              customerName: customerName,
              orderDate: orderDate,
            };
          });

          console.log(
            "see get all orders response in all Orders.jsx ",
            response.data
          );

          setOrders(updatedOrders?.reverse());
        }
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [statusChanged]);

  const handleViewOrder = (orderId) => {
    navigate(`/${loggedUserRole}/order-details/${orderId}`);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (newStatus === "received") {
      alert("You cannot change the status once it is marked as received.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/order-medicines/${orderId}`,
        { orderStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );

      setStatusChanged((prev) => !prev);
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const renderOrders = () => {
    if (!orders || orders.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center p-4 ">
            No orders found
          </td>
        </tr>
      );
    }

    return orders.map((order, index) => (
      <tr key={order._id} className="border-b hover:bg-green-200 transition">
        <td className="py-3 px-4">{index + 1}</td>
        <td className="py-3 px-4">{order.orderId}</td>
        <td className="py-3 px-4">{order.customerName}</td>
        <td className="py-3 px-4">{order.orderDate}</td>
        <td className="py-3 px-4">
          <StatusSlider
            orderId={order._id}
            currentStatus={order.orderStatus}
            onStatusChange={handleStatusChange}
            isStatusEditable={
              order.orderStatus !== "received" ||
              order.orderStatus !== "not-received"
            }
          />
        </td>
        <td className="py-3 px-4 text-center">
          <button
            onClick={() => handleViewOrder(order._id)}
            className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          >
            View
          </button>
        </td>
      </tr>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mt-6 ">
      <h1 className="text-3xl font-semibold text-center flex justify-between items-center mb-6">
        All Orders
      </h1>
      <table className="min-w-full ">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Order ID</th>
            <th className="py-3 px-4">Patient Name</th>
            <th className="py-3 px-4">Order Date</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>{renderOrders()}</tbody>
      </table>
    </div>
  );
};

export default AllOrders;
