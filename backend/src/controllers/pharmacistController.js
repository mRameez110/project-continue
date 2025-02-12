const { deletePatientService } = require("../services/patientServices");
const {
  getAllPharmacistService,
  getPharmacistService,
  updatePharmacistService,
  deletePharmacistService,
} = require("../services/pharmacistServices");

const {
  validation,
  updatePharmacistValidationSchema,
} = require("../utils/validations/schemaValidations");

// --> Get All Patient

const getAllPharmacists = async (req, res, next) => {
  try {
    console.log("get all pharmacists");
    const pharmacists = await getAllPharmacistService();
    res.status(200).json({ pharmacists });
  } catch (err) {
    next(err);
  }
};

// --> Get patient(single)

// const getPharmacist = async (req, res, next) => {
//   try {
//     const fetchedPharmacist = await getPharmacistService(req);
//     res.status(200).json({
//       message: "Pharmacist fetch Successfully",
//       pharmacist: fetchedPharmacist,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const getPharmacist = async (req, res, next) => {
  try {
    const fetchedPharmacist = await getPharmacistService(req);
    res.status(200).json({
      message: "Pharmacist fetch Successfully",
      user: fetchedPharmacist,
    });
  } catch (err) {
    next(err);
  }
};

// --> Update Pharmacist

const updatePharmacist = async (req, res, next) => {
  try {
    validation(req.body, updatePharmacistValidationSchema);

    const updatedPharmacist = await updatePharmacistService(req);
    res
      .status(200)
      .json({ message: "Pharmacist updated successfully", updatedPharmacist });
  } catch (err) {
    next(err);
  }
};

// --> Delete Patient

const deletePharmacist = async (req, res, next) => {
  try {
    const deletedPharmacist = await deletePharmacistService(req);
    res.status(203).json({
      message: "Pharmacist deleted successfully",
      deletedRecode: deletedPharmacist,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPharmacists,
  getPharmacist,
  updatePharmacist,
  deletePharmacist,
};
