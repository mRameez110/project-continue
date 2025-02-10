const patientModel = require("../models/patientModel");
const userModel = require("../models/userModel");
const {
  BadRequestError,
  NotFoundError,
} = require("../utils/errorHandlerClass");

const getAllPatientsService = async () => {
  const patients = await patientModel.find().populate("user");

  // if (patients.length == 0) throw new NotFoundError("No patient found", 200);
  return patients;
};

const getPatientService = async (dataObject) => {
  const userId = dataObject.params.id;
  const findedPatient = await patientModel({ user: userId }).populate("user", [
    "userName",
    "email",
    "role",
  ]);

  if (!findedPatient) throw new NotFoundError("No patient found", 404);

  return findedPatient;
};

// const updatePatientService = async (dataObject) => {
//   const { loggedInUserId, loggedInUserRole, targetUserId } =
//     dataObject.accessControl;

//   const userIdToUpdate = targetUserId || loggedInUserId;

//   if (dataObject.body.userName || dataObject.body.email) {
//     console.log(
//       "see user model fields ",
//       dataObject.body.userName,
//       dataObject.body.email
//     );
//     const updatedUser = await userModel.findByIdAndUpdate(userIdToUpdate);
//     if (!updatedUser) {
//       throw new NotFoundError("User not found", 404);
//     }
//   }

//   const updatedPatient = await patientModel
//     .findOneAndUpdate({
//       user: userIdToUpdate,
//     })
//     .populate("user", "userName email role");

//   if (!updatedPatient) {
//     throw new NotFoundError("Patient not found", 404);
//   }

//   return updatedPatient;
// };

const updatePatientService = async (req) => {
  const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
  const userIdToUpdate = targetUserId || loggedInUserId;

  if (req.body.userName || req.body.email) {
    console.log("Updating User Model: ", req.body.userName, req.body.email);

    const updatedUser = await userModel.findByIdAndUpdate(
      userIdToUpdate,
      { userName: req.body.userName, email: req.body.email },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundError("User not found", 404);
    }
  }

  const updatedPatient = await patientModel
    .findOneAndUpdate({ user: userIdToUpdate }, req.body, { new: true })
    .populate("user", "userName email role");

  if (!updatedPatient) {
    throw new NotFoundError("Patient not found", 404);
  }

  return updatedPatient;
};

const deletePatientService = async (dataObject) => {
  const { loggedInUserId, loggedInUserRole, targetUserId } =
    dataObject.accessControl;
  const userIdToDelete = targetUserId || loggedInUserId;

  // Find and delete patient with populated user details
  const deletedPatient = await patientModel
    .findOneAndDelete({ user: userIdToDelete })
    .populate("user", "userName email role");

  console.log("see deleted patient ", deletedPatient);

  // Find and delete user
  const deletedUser = await userModel.findByIdAndDelete(userIdToDelete);

  if (!deletedUser) {
    throw new BadRequestError("User not found.", 400);
  }

  return deletedPatient;
};

module.exports = {
  getAllPatientsService,
  getPatientService,
  updatePatientService,
  deletePatientService,
};
