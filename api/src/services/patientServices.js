const patientModel = require("../models/patientModel");
const userModel = require("../models/userModel");
const {
  BadRequestError,
  NotFoundError,
} = require("../utils/errorHandlerClass");

const getAllPatientsService = async () => {
  const patients = await patientModel.find().populate("user");
  console.log("see patiens ", patients);
  return patients;
};

const getPatientService = async (req) => {
  const userId = req.params.id;
  const logedUserId = req.user.userId;
  console.log("see id s", userId, logedUserId);

  const findedPatient = await patientModel
    .findOne({
      $or: [{ user: userId }, { _id: userId }],
    })
    .populate("user", ["userName", "email", "role"]);

  if (!findedPatient) throw new NotFoundError("No patient found", 404);

  console.log("see get patient by id ", findedPatient);

  return findedPatient;
};

const updatePatientService = async (req) => {
  const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
  const userIdToUpdate = targetUserId || loggedInUserId;
  const patientId = req.params.id;

  const updatedPatient = await patientModel
    .findOneAndUpdate(
      { $or: [{ user: patientId }, { _id: patientId }] },
      req.body,
      {
        new: true,
      }
    )
    .populate("user", "userName email role");

  if (!updatedPatient) {
    throw new NotFoundError("Patient not found", 404);
  }

  if (updatedPatient && (req.body.userName || req.body.email)) {
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: updatedPatient.user._id },
      { userName: req.body.userName, email: req.body.email },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundError("User not found", 404);
    }
  }

  return updatedPatient;
};

const deletePatientService = async (req) => {
  const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;

  const patientId = req.params.id;
  console.log("see patient id to delete in delete patient service", patientId);

  const deletedPatient = await patientModel
    .findOneAndDelete({ $or: [{ user: loggedInUserId }, { _id: patientId }] })
    .populate("user", "userName email role");

  if (!deletedPatient) throw new BadRequestError("Patient not found.");

  console.log("see deleted patient ", deletedPatient);
  console.log("see deleted patient Id", deletedPatient.user._id);

  const userIdToDeleteUser = deletedPatient.user._id;

  const deletedUser = await userModel.findByIdAndDelete(userIdToDeleteUser);

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
