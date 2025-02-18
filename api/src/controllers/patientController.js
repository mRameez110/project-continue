const {
  getAllPatientsService,
  getPatientService,
  updatePatientService,
  deletePatientService,
} = require("../services/patientServices");
const {
  validation,
  updatePatientValidationSchema,
} = require("../utils/validations/schemaValidations");

// --> Get All Patient
const getAllPatients = async (req, res, next) => {
  try {
    console.log("see all patients ");

    const patients = await getAllPatientsService();
    res.status(200).json({
      message: "All patients fetch successufly ",
      patients,
    });
  } catch (err) {
    next(err);
  }
};

// --> Get patient(single)
const getPatientById = async (req, res, next) => {
  try {
    const findedUser = await getPatientService(req);
    console.log("see get by id patient in cont", findedUser);

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
    validation(req.body, updatePatientValidationSchema);
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

    res.status(203).json({
      message: "Patient deleted successfully",
      deletedRecode: deletedPatient,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
