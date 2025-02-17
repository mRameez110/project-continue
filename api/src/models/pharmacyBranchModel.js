const mongoose = require("mongoose");

const pharmacyBranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  contact: { type: String },
  pharmacists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pharmacist" }],
  createdAt: { type: Date, default: Date.now },
});

pharmacyBranchSchema.path("pharmacists").validate(function () {
  return this.pharmacists && this.pharmacists.length > 0;
}, "At least one pharmacist is required.");

module.exports = mongoose.model("PharmacyBranch", pharmacyBranchSchema);
