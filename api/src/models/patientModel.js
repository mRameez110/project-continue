const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: { type: String },
  age: { type: String },
  contact: { type: String },
});

module.exports = mongoose.model("Patient", patientSchema);
