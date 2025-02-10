// const mongoose = require("mongoose");

// const pharmacistSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   fullName: { type: String },
//   age: { type: String },
//   contact: { type: String },
//   pharmacyBranch: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "PharmacyBranch",
//   },
// });

// module.exports = mongoose.model("Pharmacist", pharmacistSchema);

const mongoose = require("mongoose");

const pharmacistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: { type: String, required: true },
  age: { type: String, required: true },
  contact: { type: String, required: true },
  pharmacyBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PharmacyBranch",
  },
});

module.exports = mongoose.model("Pharmacist", pharmacistSchema);
