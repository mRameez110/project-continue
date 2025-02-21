const StatusSlider = ({
  orderId,
  currentStatus,
  onStatusChange,
  isStatusEditable,
}) => {
  const statuses = ["pending", "dispatched", "delivered"];

  const handleChange = (e) => {
    if (isStatusEditable) {
      const newStatus = e.target.value;
      onStatusChange(orderId, newStatus);
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={!isStatusEditable}
      className="py-2 px-4 border rounded"
    >
      {currentStatus === "received" || currentStatus === "not-received" ? (
        <option value={currentStatus} disabled>
          {currentStatus}
        </option>
      ) : (
        statuses.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))
      )}
    </select>
  );
};

export default StatusSlider;
