const patientModel = require("../models/patientModel");
const userModel = require("../models/userModel");
const {
  BadRequestError,
  NotFoundError,
} = require("../utils/errorHandlerClass");

const getAllPatientsService = async () => {
  const patients = await patientModel.find().populate("user");

  // if (patients.length == 0) throw new NotFoundError("No patient found", 200);

  console.log("see patiens ", patients);
  return patients;
};

// const getPatientService = async (dataObject) => {
//   const userId = dataObject.params.id;
//   // const findedPatient = await patientModel;
//   // .findOne({ user: userId })

//   const findedPatient = await patientModel
//     .findOne({
//       $or: [{ user: userId }, { _id: userId }],
//     })
//     .populate("user", ["userName", "email", "role"]);

//   if (!findedPatient) throw new NotFoundError("No patient found", 404);

//   console.log("see get patient by id ", findedPatient);

//   return findedPatient;
// };

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

const getPatientService = async (req) => {
  const userId = req.params.id;
  const logedUserId = req.user.userId;
  console.log("see id s", userId, logedUserId);

  const findedPatient = await patientModel
    .findOne({
      // $or: [{ user: userId }, { _id: userId }, { user: logedUserId }],
      $or: [{ user: userId }, { _id: userId }],
    })
    .populate("user", ["userName", "email", "role"]);

  if (!findedPatient) throw new NotFoundError("No patient found", 404);

  console.log("see get patient by id ", findedPatient);

  return findedPatient;
};

// const updatePatientService = async (req) => {
//   const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
//   const userIdToUpdate = targetUserId || loggedInUserId;
//   const userId = req.params.id;
//   console.log("see updated patient req ", req.body);

//   // if (req.body.userName || req.body.email) {
//   //   console.log("Updating User Model: ", req.body.userName, req.body.email);

//   //   const updatedUser = await userModel.findByIdAndUpdate(
//   //     userIdToUpdate,
//   //     { userName: req.body.userName, email: req.body.email },
//   //     { new: true }
//   //   );

//   //   if (!updatedUser) {
//   //     throw new NotFoundError("User not found", 404);
//   //   }
//   // }

//   await patientModel.findOneAndUpdate({ user: userIdToUpdate }, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   const updatedPatient = await patientModel
//     .findOne({ $or: [{ user: userId }, { _id: userId }] })
//     .populate("user", "userName email role")
//     .lean();

//   console.log("see updated patient ", updatedPatient);

//   if (!updatedPatient) {
//     throw new NotFoundError("Patient not found", 404);
//   }

//   return updatedPatient;
// };

// const updatePatientService = async (req) => {
//   const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
//   const userIdToUpdate = targetUserId || loggedInUserId;
//   const userId = req.params.id;
//   console.log("see updated patient req ", req.body);

//   // if (req.body.userName || req.body.email) {
//   //   console.log("Updating User Model: ", req.body.userName, req.body.email);

//   //   const updatedUser = await userModel.findByIdAndUpdate(
//   //     userIdToUpdate,
//   //     { userName: req.body.userName, email: req.body.email },
//   //     { new: true }
//   //   );

//   //   if (!updatedUser) {
//   //     throw new NotFoundError("User not found", 404);
//   //   }
//   // }

//   await patientModel.findOneAndUpdate({ user: userIdToUpdate }, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   const updatedPatient = await patientModel
//     .findOne({ $or: [{ user: userId }, { _id: userId }] })
//     .populate("user", "userName email role")
//     .lean();

//   console.log("see updated patient ", updatedPatient);

//   if (!updatedPatient) {
//     throw new NotFoundError("Patient not found", 404);
//   }

//   return updatedPatient;
// };

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
  // const userIdToDelete = targetUserId || loggedInUserId;
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
