const {
  createPharmacyBranchService,
  getPharmacyBranchesService,
  getPharmacyBranchByIdService,
  updatePharmacyBranchService,
  deletePharmacyBranchService,
} = require("../services/pharmacyBranchServices");

const {
  createPharmacyBranchValidationSchema,
  updatePharmacyBranchValidationSchema,
  validation,
} = require("../utils/validations/schemaValidations");

const createPharmacyBranch = async (req, res, next) => {
  try {
    console.log("check creat branch api request body ", req.body);
    validation(req.body, createPharmacyBranchValidationSchema);
    console.log("see created request in create ");
    const pharmacyBranch = await createPharmacyBranchService(req);

    res.status(201).json({
      message: "Pharmacy Branch created successfully",
      pharmacyBranch,
    });
  } catch (err) {
    next(err);
  }
};

const getPharmacyBranches = async (req, res, next) => {
  try {
    const branches = await getPharmacyBranchesService(req);
    res.status(200).json({
      message: "Branches fetched successful ",
      branches: branches,
    });
  } catch (err) {
    next(err);
  }
};

const getPharmacyBranchById = async (req, res, next) => {
  try {
    const branch = await getPharmacyBranchByIdService(req);
    res.status(200).json({
      message: "branch fetched successfully",
      branch: branch,
    });
  } catch (err) {
    next(err);
  }
};

const updatePharmacyBranch = async (req, res, next) => {
  try {
    validation(req.body, updatePharmacyBranchValidationSchema);

    const updatedBranch = await updatePharmacyBranchService(req);

    res.status(200).json({
      message: "Pharmacy Branch updated successfully",
      updatedBranch,
    });
  } catch (err) {
    next(err);
  }
};

const deletePharmacyBranch = async (req, res, next) => {
  try {
    const deletedPharmacyBranch = await deletePharmacyBranchService(req);
    res.status(200).json({
      message: "Pharmacy Branch deleted successfully",
      deletedPharmacyBranch,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPharmacyBranch,
  getPharmacyBranches,
  getPharmacyBranchById,
  updatePharmacyBranch,
  deletePharmacyBranch,
};
