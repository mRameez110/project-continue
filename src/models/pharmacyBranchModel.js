const mongoose = require("mongoose");

const pharmacyBranchSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  contactInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PharmacistBranch", pharmacyBranchSchema);
