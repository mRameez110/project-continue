const pharmacistModel = require("../models/pharmacistModel");
const pharmacyBranchModel = require("../models/pharmacyBranchModel");
const PharmacyBranchModel = require("../models/pharmacyBranchModel");
const {
  NotFoundError,
  BadRequestError,
  UserAlreadyExistError,
} = require("../utils/errorHandlerClass");

// const createPharmacyBranchService = async (req) => {
//   const { name, address, contactInfo, pharmacists } = req.body;
//   console.log("check branch create request ", req.body);

//   const pharmacyBranch = new PharmacyBranch({
//     name,
//     address,
//     contactInfo,
//     pharmacists,
//   });

//   await pharmacyBranch.save();

//   const newPharmacyBranch = await PharmacyBranch.findById(
//     pharmacyBranch._id
//   ).populate("pharmacists", "fullName age contact");

//   return newPharmacyBranch;
// };

const createPharmacyBranchService = async (req) => {
  const { name, address, contactInfo, pharmacists } = req.body;

  const existingBranch = await pharmacyBranchModel.findOne({ name });
  if (existingBranch) {
    throw new UserAlreadyExistError(
      "A pharmacy branch with this name already exists."
    );
  }

  const pharmacyBranch = new PharmacyBranchModel({
    name,
    address,
    contactInfo,
    pharmacists,
  });

  // Save the new branch
  await pharmacyBranch.save();

  // Update the pharmacist(s) to point to this new branch
  await pharmacistModel.updateMany(
    { _id: { $in: pharmacists } },
    { $set: { pharmacyBranch: pharmacyBranch._id } }
  );

  // Return populated branch with pharmacist details
  const newPharmacyBranch = await PharmacyBranchModel.findById(
    pharmacyBranch._id
  ).populate("pharmacists", "fullName age contact");

  return newPharmacyBranch;
};

// const getPharmacyBranchesService = async () => {
//   const pharmaciesBranches = await pharmacyBranchModel
//     .find()
//     .populate("pharmacists", "fullName age contact");

//   return pharmaciesBranches;
// };

// const getPharmacyBranchesService = async (req) => {
//   console.log("check get all branches request", req);

//   if (req.user.role === "admin") {
//     return await pharmacyBranchModel
//       .find()
//       .populate("pharmacists", "fullName age contact");
//   } else if (req.user.role === "pharmacist") {
//     return await pharmacyBranchModel
//       .findOne({ pharmacists: req.user._id })
//       .populate("pharmacists", "fullName age contact");
//   } else {
//     throw new Error("Unauthorized access");
//   }
// };

const getPharmacyBranchesService = async (req) => {
  if (req.user.role === "admin") {
    return await PharmacyBranchModel.find().populate({
      path: "pharmacists",
      select: "fullName age contact user", // Populate pharmacist with user details
    });
  } else if (req.user.role === "pharmacist") {
    return await PharmacyBranchModel.findOne({
      pharmacists: req.user._id,
    }).populate({
      path: "pharmacists",
      select: "fullName age contact user", // Populate pharmacist with user details
    });
  } else {
    throw new Error("Unauthorized access");
  }
};

// const getPharmacyBranchByIdService = async (req) => {
//   const { id } = req.params; // Branch ID from the request
//   const loggedInUser = req.user; // Logged-in user info from the token

//   console.log("Logged-in user details:", loggedInUser); // Log user details
//   console.log("Branch ID being requested:", id); // Log requested branch ID

//   let pharmacyBranch;

//   // Admin can view any branch
//   if (loggedInUser.role === "admin") {
//     console.log("Admin is requesting branch details.");
//     pharmacyBranch = await PharmacyBranchModel.findById(id).populate(
//       "pharmacists",
//       "fullName age contact"
//     );
//   } else if (loggedInUser.role === "pharmacist") {
//     console.log("Pharmacist is requesting branch details.");

//     // Find the pharmacist using the logged-in user ID
//     const pharmacist = await pharmacistModel
//       .findOne({
//         user: loggedInUser.userId,
//       })
//       .populate("pharmacyBranch");

//     if (!pharmacist) {
//       throw new NotFoundError("Pharmacist not found", 404);
//     }

//     // Check if the requested branch is the one the pharmacist is assigned to
//     // if (pharmacist.pharmacyBranch._id.toString() !== id) {
//     //   throw new BadRequestError(
//     //     "You do not have permission to view this branch",
//     //     403
//     //   );
//     // }

//     pharmacyBranch = await PharmacyBranchModel.findById(id).populate(
//       "pharmacists",
//       "fullName age contact"
//     );
//     console.log("Pharmacy Branch for Pharmacist:", pharmacyBranch);
//   } else {
//     throw new BadRequestError("You do not have permission to view this branch");
//   }

//   // If no branch found, log and throw error
//   if (!pharmacyBranch) {
//     console.error("No pharmacy branch found for this request.");
//     throw new NotFoundError("Pharmacy Branch not found", 404);
//   }

//   return pharmacyBranch;
// };

// const getPharmacyBranchByIdService = async (req) => {
//   const { id } = req.params; // This is the logged-in user's ID coming from the URL
//   const loggedInUser = req.user; // Logged-in user info from the token

//   console.log("Logged-in user details:", loggedInUser); // Log user details
//   console.log("Requested logged-in user ID:", id); // Log the ID being requested

//   let pharmacyBranch;

//   // Admin can view any branch
//   if (loggedInUser.role === "admin") {
//     console.log("Admin is requesting branch details.");
//     pharmacyBranch = await PharmacyBranchModel.findById(id).populate(
//       "pharmacists",
//       "fullName age contact"
//     );
//   } else if (loggedInUser.role === "pharmacist") {
//     console.log("Pharmacist is requesting branch details.");

//     // Find the pharmacist using the logged-in user ID
//     const pharmacist = await pharmacistModel
//       .findOne({
//         user: loggedInUser.userId,
//       })
//       .populate("pharmacyBranch"); // Populate the assigned branch

//     console.log("check fetched pharmacist again logged user id ",pharmacist);

//     if (!pharmacist) {
//       throw new NotFoundError("Pharmacist not found", 404);
//     }

//     // Check if the pharmacist has a branch assigned
//     const assignedBranch = pharmacist.pharmacyBranch;

//     if (!assignedBranch) {
//       throw new NotFoundError("No branch assigned to this pharmacist", 404);
//     }

//     // Now check if the requested branch matches the assigned branch
//     if (assignedBranch._id.toString() !== id) {
//       throw new BadRequestError(
//         "You do not have permission to view this branch",
//         403
//       );
//     }

//     // Fetch the branch details without the pharmacists array
//     pharmacyBranch = await PharmacyBranchModel.findById(id)
//       .populate(
//         "pharmacists",
//         "fullName age contact" // Optional: You can decide if you want to keep this here or not
//       )
//       .select("-pharmacists"); // Exclude pharmacists array from the response

//     console.log("Pharmacy Branch for Pharmacist:", pharmacyBranch);
//   } else {
//     throw new BadRequestError("You do not have permission to view this branch");
//   }

//   // If no branch found, log and throw error
//   if (!pharmacyBranch) {
//     console.error("No pharmacy branch found for this request.");
//     throw new NotFoundError("Pharmacy Branch not found", 404);
//   }

//   return pharmacyBranch;
// };

// const getPharmacyBranchByIdService = async (req) => {
//   const { id } = req.params; // Branch ID from the request URL (requested branch ID)
//   const loggedInUser = req.user; // Logged-in user info from token

//   console.log("Logged-in user details:", loggedInUser); // Log the logged-in user
//   console.log("Requested logged-in user ID:", id); // Log the requested branch ID

//   let pharmacyBranch;

//   // Admin can view any branch
//   if (loggedInUser.role === "admin") {
//     console.log("Admin is requesting branch details.");
//     pharmacyBranch = await PharmacyBranchModel.findById(id).populate(
//       "pharmacists",
//       "fullName age contact"
//     );
//   } else if (loggedInUser.role === "pharmacist") {
//     console.log("Pharmacist is requesting branch details.");

//     // Find the pharmacist using the logged-in user's userId
//     const pharmacist = await pharmacistModel
//       .findOne({
//         user: loggedInUser.userId, // Correct field to match
//       })
//       .populate("pharmacyBranch");
//     // Populate the assigned pharmacy branch

//     if (!pharmacist) {
//       throw new NotFoundError("Pharmacist not found", 404);
//     }

//     // Check if the pharmacist has a branch assigned
//     const assignedBranch = pharmacist.pharmacyBranch;

//     if (!assignedBranch) {
//       throw new NotFoundError("No branch assigned to this pharmacist", 404);
//     }

//     console.log("Assigned Branch:", assignedBranch);
//     console.log("Requested Branch ID:", id);

//     return assignedBranch;
//   }
// };

const getPharmacyBranchByIdService = async (req) => {
  const { id } = req.params; // Branch ID from the request URL (requested branch ID)
  const loggedInUser = req.user; // Logged-in user info from token

  console.log("Logged-in user details:", loggedInUser); // Log the logged-in user
  console.log("parameter id:", id); // Log the requested branch ID

  let pharmacyBranch;

  if (loggedInUser.role === "admin") {
    console.log("Admin is requesting branch details.");
    // pharmacyBranch = await PharmacyBranchModel.findById(id).populate({
    //   path: "pharmacists",
    //   select: "fullName age contact", // Fields for pharmacist
    //   populate: {
    //     path: "user", // The user reference inside the pharmacist
    //     select: "userName email", // Fields to select from the user model
    //   },
    // });

    pharmacyBranch = await PharmacyBranchModel.findById(id)
      .populate({
        path: "pharmacists",
        select: "fullName age contact", // Fields for pharmacist
        populate: {
          path: "user", // Populate the user field inside the pharmacist
          select: "userName email", // Fields to select from the user model
        },
      })
      .select("name address createdAt"); // Select branch fields
    console.log("Populated pharmacists:", pharmacyBranch.pharmacists);

    console.log("check pharmacy branch detail if role admin", pharmacyBranch);
    return pharmacyBranch;
  } else if (loggedInUser.role === "pharmacist") {
    console.log("Pharmacist is requesting branch details.");

    // Find the pharmacist using the logged-in user's userId
    const pharmacist = await pharmacistModel
      .findOne({
        user: loggedInUser.userId, // Correct field to match
      })
      .populate("pharmacyBranch"); // Populate the assigned pharmacy branch

    if (!pharmacist) {
      throw new NotFoundError("Pharmacist not found", 404);
    }

    // Check if the pharmacist has a branch assigned
    const assignedBranch = pharmacist.pharmacyBranch;

    if (!assignedBranch) {
      throw new NotFoundError("No branch assigned to this pharmacist", 404);
    }

    console.log("Assigned Branch:", assignedBranch);
    console.log("Requested Branch ID:", id);

    // Return branch details excluding the pharmacists field
    return PharmacyBranchModel.findById(assignedBranch._id).select(
      "-pharmacists"
    );
  }
};

// const updatePharmacyBranchService = async (req) => {
//   const { id } = req.params;
//   console.log("check branch update req ", req.body);
//   const updatedBranch = await PharmacyBranchModel.findByIdAndUpdate(
//     id,
//     req.body,
//     {
//       new: true,
//     }
//   ).populate({
//     path: "pharmacists",
//     select: "fullName age contact user", // Populate the pharmacist's full info
//   });

//   if (!updatedBranch) {
//     throw new NotFoundError("Pharmacy Branch not found", 404);
//   }

//   return updatedBranch;
// };

// const updatePharmacyBranchService = async (req) => {
//   const { id } = req.params;
//   const { name, address, contact, pharmacists } = req.body; // Destructure properly

//   const updatedBranch = await PharmacyBranchModel.findByIdAndUpdate(
//     id,
//     { name, address, contact, pharmacists },
//     { new: true }
//   ).populate("pharmacists", "fullName age contact user");

//   if (!updatedBranch) {
//     throw new NotFoundError("Pharmacy Branch not found", 404);
//   }

//   return updatedBranch;
// };

const updatePharmacyBranchService = async (req) => {
  const { id } = req.params;
  const { name, address, contact, pharmacists } = req.body;

  // Check if pharmacists is provided and only then update
  const updateData = { name, address, contact };
  if (pharmacists) {
    updateData.pharmacists = pharmacists;
  }

  const updatedBranch = await PharmacyBranchModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  ).populate("pharmacists", "fullName age contact user");

  if (!updatedBranch) {
    throw new NotFoundError("Pharmacy Branch not found", 404);
  }

  return updatedBranch;
};

// const deletePharmacyBranchService = async (req) => {
//   const { id } = req.params;
//   const deletedPharmacyBranch = await PharmacyBranchModel.findByIdAndDelete(id);

//   if (!deletedPharmacyBranch) {
//     throw new NotFoundError("Pharmacy Branch not found", 404);
//   }

//   return deletedPharmacyBranch;
// };

const deletePharmacyBranchService = async (req) => {
  const { id } = req.params;

  // 1. Find and delete the pharmacy branch by ID
  const deletedPharmacyBranch = await pharmacyBranchModel.findByIdAndDelete(id);

  if (!deletedPharmacyBranch) {
    throw new NotFoundError("Pharmacy Branch not found", 404);
  }

  // 2. Remove the reference to the deleted branch from all pharmacists who were assigned to it
  await pharmacistModel.updateMany(
    { pharmacyBranch: id }, // Find pharmacists who have this branch assigned
    { $set: { pharmacyBranch: null } } // Set 'pharmacyBranch' to null for these pharmacists
  );

  // 3. Optionally, remove the pharmacists from the branch's 'pharmacists' array
  await pharmacyBranchModel.updateOne(
    { _id: id },
    { $pull: { pharmacists: { $in: deletedPharmacyBranch.pharmacists } } } // Remove pharmacist references
  );

  return deletedPharmacyBranch;
};

module.exports = {
  createPharmacyBranchService,
  getPharmacyBranchesService,
  getPharmacyBranchByIdService,
  updatePharmacyBranchService,
  deletePharmacyBranchService,
};
