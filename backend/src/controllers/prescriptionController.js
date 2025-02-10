const {
  createPrescriptionService,
  getAllPrescriptionsService,
  getPrescriptionService,
  updatePrescriptionService,
  deletePrescriptionService,
} = require("../services/prescriptionServices");
const {
  validation,
  createPrescriptionValidationSchema,
  updatePrescriptionValidationSchema,
} = require("../utils/validations/schemaValidations");

// --> Get All Prescriptions

const getAllPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await getAllPrescriptionsService(req);
    console.log("see all prescriptions ", prescriptions);
    res.status(200).json({ prescriptions });
  } catch (err) {
    next(err);
  }
};

// --> Create prescription

const createPrescription = async (req, res, next) => {
  try {
    validation(req.body, createPrescriptionValidationSchema);

    const createdPrescription = await createPrescriptionService(req);
    res.status(200).json({
      message: "Prescription created Successfully",
      newPrescription: createdPrescription,
    });
  } catch (err) {
    next(err);
  }
};

// --> Get prescription(single)

const getPrescription = async (req, res, next) => {
  try {
    const fetchedPrescription = await getPrescriptionService(req);
    console.log("check ftech prescription ", fetchedPrescription);
    res.status(200).json({
      message: "Prescription fetch Successfully",
      prescription: fetchedPrescription,
    });
  } catch (err) {
    next(err);
  }
};

// --> Update Patient

const updatePresciption = async (req, res, next) => {
  try {
    validation(req.body, updatePrescriptionValidationSchema);

    const updatedPrescription = await updatePrescriptionService(req);

    res.status(200).json({
      message: "Prescription updated successfully",
      updatedPrescription,
    });
  } catch (err) {
    next(err);
  }
};

// --> Delete Patient

const deletePrescription = async (req, res, next) => {
  try {
    const deletedPrescription = await deletePrescriptionService(req);
    res.status(203).json({
      message: "Prescription deleted successfully",
      deletedRecode: deletedPrescription,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescription,
  updatePresciption,
  deletePrescription,
};
