import React, { useState } from "react";

const StatusSlider = ({ orderId, currentStatus, onStatusChange }) => {
  const [status, setStatus] = useState(currentStatus || "pending");

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusChange(orderId, newStatus);
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      className="py-1 px-4 bg-white border border-gray-300 rounded"
    >
      <option value="pending">Pending</option>
      <option value="dispatched">Dispatched</option>
      <option value="delivered">Delivered</option>
      <option value="received">Received</option>
    </select>
  );
};

export default StatusSlider;
