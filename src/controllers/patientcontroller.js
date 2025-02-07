const patientModel = require("../models/patientModel");
const {
  getAllPatientsService,
  getPatientService,
  updatePatientService,
  deletePatientService,
} = require("../services/patientServices");
const {
  validation,
  updatePatientValidation,
} = require("../utils/validations/schemaValidations");

// --> Get All Patient

const getAllPatients = async (req, res, next) => {
  try {
    // const patients = await patientModel.find({}).populate("user");
    // console.log("see all patients ", patients);

    const patients = await getAllPatientsService();
    res.status(200).json({ patients });
  } catch (err) {
    next(err);
  }
};

// --> Get patient(single)

const getPatient = async (req, res, next) => {
  try {
    const findedUser = await getPatientService(req);
    res.status(200).json({
      message: "Patient fetch Successfully",
      user: findedUser,
    });
  } catch (err) {
    next(err);
  }
};

// --> Update Patient

const updatePatient = async (req, res, next) => {
  try {
    validation(req.body, updatePatientValidation);

    const updatedPatient = await updatePatientService(req);

    res
      .status(200)
      .json({ message: "Patient updated successfully", updatedPatient });
  } catch (err) {
    next(err);
  }
};

// --> Delete Patient

const deletePatient = async (req, res, next) => {
  try {
    const deletedPatient = await deletePatientService(req);
    console.log("what in d ", deletedPatient);
    res.status(203).json({
      message: "Patient deleted successfully",
      deletedRecod: deletedPatient,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllPatients, getPatient, updatePatient, deletePatient };
