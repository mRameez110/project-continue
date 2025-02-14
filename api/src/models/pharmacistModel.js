const mongoose = require("mongoose");

const pharmacistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: { type: String },
  // age: { type: String },
  // contact: { type: String },
  age: { type: Number },
  contact: {
    type: String,
    match: /^[0-9]+$/,
    minlength: 10,
    maxlength: 15,
  },
  pharmacyBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PharmacyBranch",
  },
});

module.exports = mongoose.model("Pharmacist", pharmacistSchema);
