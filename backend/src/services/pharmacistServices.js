const patientModel = require("../models/patientModel");
const userModel = require("../models/userModel");
const pharmacistModel = require("../models/pharmacistModel");

const {
  BadRequestError,
  NotFoundError,
} = require("../utils/errorHandlerClass");

const getAllPharmacistService = async () => {
  const pharmacists = await pharmacistModel.find().populate("user");
  if (pharmacists.length == 0)
    throw new NotFoundError("No pharmacist found", 200);
  return pharmacists;
};

// const getPharmacistService = async (req) => {
//   // const userId = dataObject.params.id;
//   const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
//   const userIdToFetch = targetUserId || loggedInUserId;

//   const fetchedPharmacist = await pharmacistModel
//     .findOne({
//       user: userIdToFetch,
//     })
//     .populate("user", ["userName", "email", "role"]);

//   if (!fetchedPharmacist) throw new NotFoundError("No pharmacist found", 404);

//   console.log("see fetched pharmacist ", fetchedPharmacist);

//   return fetchedPharmacist;
// };

const getPharmacistByIdService = async (req) => {
  const userId = req.params.id;
  const logedUserId = req.user.userId;
  console.log("see id s", userId, logedUserId);

  const findedPharmacist = await pharmacistModel
    .findOne({
      // $or: [{ user: userId }, { _id: userId }, { user: logedUserId }],
      $or: [{ user: userId }, { _id: userId }],
    })
    .populate("user", ["userName", "email", "role"]);
  // .populate("pharmacyBranch", "branchName");

  if (!findedPharmacist) throw new NotFoundError("No pharmacist found", 404);

  console.log("see get pharmacist by id ", findedPharmacist);

  return findedPharmacist;
};

const updatePharmacistService = async (req) => {
  const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
  const userIdToUpdate = targetUserId || loggedInUserId;
  const pharmacistId = req.params.id;

  // if (req.body.userName || req.body.email) {
  //   console.log("Updating User Model: ", req.body.userName, req.body.email);

  //   const updatedUser = await userModel.findByIdAndUpdate(
  //     userIdToUpdate,
  //     { userName: req.body.userName, email: req.body.email },
  //     { new: true }
  //   );

  //   if (!updatedUser) {
  //     throw new NotFoundError("User not found", 404);
  //   }
  // }

  const updatedPharmacist = await pharmacistModel

    .findOneAndUpdate(
      { $or: [{ user: pharmacistId }, { _id: pharmacistId }] },
      req.body,
      {
        new: true,
      }
    )
    .populate("user", "userName email role");

  if (!updatedPharmacist) {
    throw new NotFoundError("Pharmacist not found", 404);
  }

  if (updatedPharmacist && (req.body.userName || req.body.email)) {
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: updatedPharmacist.user._id },
      { userName: req.body.userName, email: req.body.email },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundError("User not found", 404);
    }
  }

  return updatedPharmacist;
};

// const deletePharmacistService = async (req) => {
//   const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
//   const userIdToDelete = targetUserId || loggedInUserId;

//   const pharmacistIdToDelete = req.params.id;

//   const deletedPharmacist = await pharmacistModel
//     .findOneAndDelete({ user: userIdToDelete })
//     .populate("user", "userName email role");

//   console.log("see deleted pharmacist ", deletedPharmacist);

//   // Find and delete user
//   const deletedUser = await userModel.findByIdAndDelete(userIdToDelete);

//   if (!deletedUser) {
//     throw new NotFoundError("User not found.", 404);
//   }

//   return deletedPharmacist;
// };

const deletePharmacistService = async (req) => {
  const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
  const userIdToDelete = targetUserId || loggedInUserId;

  const pharmacistIdToDelete = req.params.id;

  const deletedPharmacist = await pharmacistModel
    .findByIdAndDelete(pharmacistIdToDelete)
    .populate("user", "userName email role");

  console.log("see deleted pharmacist ", deletedPharmacist);

  if (deletedPharmacist) {
    const deletedUser = await userModel.findByIdAndDelete(
      deletedPharmacist.user?._id
    );
    console.log("see user deleted if pharmacist deleted");
    if (!deletedUser) {
      throw new NotFoundError("User not found.", 404);
    }
  }

  return deletedPharmacist;
};
module.exports = {
  getAllPharmacistService,
  getPharmacistByIdService,
  updatePharmacistService,
  deletePharmacistService,
};
