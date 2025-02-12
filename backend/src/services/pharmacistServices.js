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

const getPharmacistService = async (dataObject) => {
  const userId = dataObject.params.id;
  const findedPharmacist = await pharmacistModel
    .findOne({ user: userId })
    .populate("user", ["userName", "email", "role"]);

  if (!findedPharmacist) throw new NotFoundError("No patient found", 404);

  console.log("see get pharmacist by id ", findedPharmacist);

  return findedPharmacist;
};

const updatePharmacistService = async (req) => {
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

  const updatedPharmacist = await pharmacistModel
    .findOneAndUpdate({ user: userIdToUpdate }, req.body, { new: true })
    .populate("user", "userName email role");

  if (!updatedPharmacist) {
    throw new NotFoundError("Pharmacist not found", 404);
  }

  return updatedPharmacist;
};

const deletePharmacistService = async (dataObject) => {
  const { loggedInUserId, loggedInUserRole, targetUserId } =
    dataObject.accessControl;
  const userIdToDelete = targetUserId || loggedInUserId;

  const deletedPharmacist = await pharmacistModel
    .findOneAndDelete({ user: userIdToDelete })
    .populate("user", "userName email role");

  console.log("see deleted pharmacist ", deletedPharmacist);

  // Find and delete user
  const deletedUser = await userModel.findByIdAndDelete(userIdToDelete);

  if (!deletedUser) {
    throw new NotFoundError("User not found.", 404);
  }

  return deletedPharmacist;
};

module.exports = {
  getAllPharmacistService,
  getPharmacistService,
  updatePharmacistService,
  deletePharmacistService,
};
