// const { required } = require("joi");
const mongoose = require("mongoose");
console.log(mongoose.Types.ObjectId.isValid("67a90e01f6048e7a1ab56196"));

// const pharmacyBranchSchema = new mongoose.Schema({
//   name: { type: String },
//   address: { type: String },
//   contactInfo: { type: String },
//   createdAt: { type: Date, default: Date.now },

// });

// module.exports = mongoose.model("PharmacyBranch", pharmacyBranchSchema);

// const pharmacyBranchSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   address: { type: String },
//   contactInfo: { type: String },
//   pharmacists: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Pharmacist",
//     },
//   ],
//   createdAt: { type: Date, default: Date.now },
// });

// // ✅ Improved Validation - Uses `this.pharmacists.length`
// pharmacyBranchSchema.path("pharmacists").validate(function () {
//   return this.pharmacists && this.pharmacists.length > 0;
// }, "At least one pharmacist is required.");

// const PharmacyBranch = mongoose.model("PharmacyBranch", pharmacyBranchSchema);
// module.exports = PharmacyBranch;

const pharmacyBranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  contactInfo: { type: String },
  pharmacists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pharmacist" }],
  createdAt: { type: Date, default: Date.now },
});

pharmacyBranchSchema.path("pharmacists").validate(function () {
  return this.pharmacists && this.pharmacists.length > 0;
}, "At least one pharmacist is required.");

module.exports = mongoose.model("PharmacyBranch", pharmacyBranchSchema);
