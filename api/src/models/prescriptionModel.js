const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  medicine: [
    {
      medicineName: { type: String },
      dosage: { type: String },
      frequency: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],

  PrescriptionDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
