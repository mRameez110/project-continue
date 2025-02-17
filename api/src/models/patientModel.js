const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: { type: String },
  age: { type: Number },
  contact: {
    type: String,
    match: /^[0-9]+$/,
    minlength: 10,
    maxlength: 15,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
