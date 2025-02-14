const pharmacyBranchModel = require("../models/pharmacyBranchModel");
const PharmacyBranch = require("../models/pharmacyBranchModel");
const { NotFoundError } = require("../utils/errorHandlerClass");

const createPharmacyBranchService = async (req) => {
  const { name, address, contactInfo, pharmacists } = req.body;

  const pharmacyBranch = new PharmacyBranch({
    name,
    address,
    contactInfo,
    pharmacists,
  });

  await pharmacyBranch.save();

  const newPharmacyBranch = await PharmacyBranch.findById(
    pharmacyBranch._id
  ).populate("pharmacists", "fullName age contact");

  return newPharmacyBranch;
};

const getPharmacyBranchesService = async () => {
  const pharmaciesBranches = await pharmacyBranchModel
    .find()
    .populate("pharmacists", "fullName age contact");

  return pharmaciesBranches;
};

const getPharmacyBranchByIdService = async (req) => {
  const { id } = req.params;
  const pharmacyBranch = await PharmacyBranch.findById(id).populate(
    "pharmacists",
    "fullName age contact"
  );

  if (!pharmacyBranch) {
    throw new NotFoundError("Pharmacy Branch not found", 404);
  }

  return pharmacyBranch;
};

// const updatePharmacyBranchService = async (req) => {
//   const { id } = req.params;
//   const updateFields = req.body;

//   const updatedBranch = await PharmacyBranch.findByIdAndUpdate(
//     id,
//     updateFields,
//     { new: true }
//   );

//   if (!updatedBranch) {
//     throw new NotFoundError("Pharmacy Branch not found", 404);
//   }

//   return updatedBranch;
// };

const updatePharmacyBranchService = async (req) => {
  const { id } = req.params;
  const updatedBranch = await PharmacyBranch.findByIdAndUpdate(id, req.body, {
    new: true,
  }).populate({
    path: "pharmacists",
    select: "fullName age contact user",
  });

  if (!updatedBranch) {
    throw new NotFoundError("Pharmacy Branch not found", 404);
  }

  return updatedBranch;
};

const deletePharmacyBranchService = async (req) => {
  const { id } = req.params;
  const deletedPharmacyBranch = await PharmacyBranch.findByIdAndDelete(id);

  if (!deletedPharmacyBranch) {
    throw new NotFoundError("Pharmacy Branch not found", 404);
  }

  return deletedPharmacyBranch;
};

module.exports = {
  createPharmacyBranchService,
  getPharmacyBranchesService,
  getPharmacyBranchByIdService,
  updatePharmacyBranchService,
  deletePharmacyBranchService,
};
