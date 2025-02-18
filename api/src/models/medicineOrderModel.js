const mongoose = require("mongoose");

const medicineOrder = new mongoose.Schema({
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prescription",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  pharmacist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacist",
    required: true,
  },

  orderStatus: {
    type: String,
    enum: ["pending", "dispatched", "delivered", "not-received", "received"],
    default: "pending",
  },

  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MedicineOrder", medicineOrder);
