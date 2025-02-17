const patientModel = require("../models/patientModel");
const userModel = require("../models/userModel");
const prescriptionModel = require("../models/prescriptionModel");

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  AppError,
} = require("../utils/errorHandlerClass");

const getAllPrescriptionsService = async (req) => {
  const { role, userId } = req.user;
  let query = {};
  console.log("check userId ", userId);
  if (role === "patient") {
    const patient = await patientModel.findOne({ user: userId });
    console.log("check finded patient", patient);
    if (!patient) {
      throw new NotFoundError("This Patient  not found");
    }
    query.patient = patient._id;
  } else if (role === "pharmacist") {
    query.createdBy = userId;
  }
  const prescriptions = await prescriptionModel
    .find(query)
    .populate({
      path: "patient",
      populate: { path: "user", select: "userName email" },
    })
    .populate({
      path: "createdBy",
      select: "userName role",
    });

  const formattedPrescriptions = prescriptions.map((prescription) => ({
    _id: prescription._id,
    patientName: prescription.patient?.user?.userName || "Unknown",
    createdBy: prescription.createdBy?.userName || "Unknown",
    PrescriptionDate: prescription.PrescriptionDate || null,
  }));
  console.log(
    "see formated prescriptions length ",
    formattedPrescriptions.length
  );

  return formattedPrescriptions;
};

const createPrescriptionService = async (req) => {
  const { role, userId } = req.user; // ✅ Logged-in user (Pharmacist/Admin)

  // ✅ Ensure only Pharmacist/Admin can create prescription
  if (role !== "pharmacist" && role !== "admin") {
    throw new ForbiddenError(
      "Only pharmacists or admins can create prescriptions"
    );
  }

  const { patientId, medicine } = req.body;
  let assignedPatient = null;

  if (patientId) {
    const patient = await patientModel.findById(patientId);
    if (!patient) {
      throw new NotFoundError("Patient not found");
    }
    assignedPatient = patient._id; // ✅ Assign actual patient ID
  }

  // ✅ Create prescription (General OR Assigned)
  const newPrescription = new prescriptionModel({
    patient: assignedPatient, // ✅ Store patient ID OR NULL
    createdBy: userId, // ✅ Store pharmacist/admin's userId
    medicine,
  });

  await newPrescription.save();
  return newPrescription;
};

// const getPrescriptionService = async (req) => {
//   const { id } = req.params;

//   console.log("check prescriptio ", id);

//   const prescription = await prescriptionModel
//     .findById(id)
//     .populate({ path: "createdBy", select: "userName role" })
//     .populate({
//       path: "patient",
//       populate: { path: "user", select: "userName email" },
//     });
//   if (!prescription) {
//     throw new NotFoundError("Prescription not found", 404);
//   }

//   const formattedPrescription = {
//     _id: prescription._id,
//     patientId: prescription.patient?._id || null,
//     patientName: prescription.patient?.user?.userName || "Unknown",
//     patientEmail: prescription.patient?.user?.email || "N/A",
//     createdBy: prescription.createdBy?.userName || "Unknown",
//     createdByRole: prescription.createdBy?.role || "N/A",
//     medicine: prescription.medicine
//       ? prescription.medicine.map((med) => ({
//           medicineName: med.medicineName || "N/A",
//           dosage: med.dosage || "N/A",
//           frequency: med.frequency || "N/A",
//           duration: med.duration || "N/A",
//         }))
//       : [],
//     PrescriptionDate: prescription.PrescriptionDate || null,
//   };

//   return formattedPrescription;
// };

const getPrescriptionByIdService = async (req) => {
  const { id } = req.params;
  console.log("see id of param in getprescription by id service  ", id);
  const prescription = await prescriptionModel
    .findById(id)
    .populate({
      path: "patient",
      populate: { path: "user", select: "userName email" },
    })
    .populate({
      path: "createdBy",
      select: "userName email role",
    });

  if (!prescription) {
    throw new NotFoundError("Prescription not found");
  }

  return {
    _id: prescription._id,
    patientId: prescription.patient?._id || null,
    patientName: prescription.patient?.user?.userName || "Unknown",
    patientEmail: prescription.patient?.user?.email || "N/A",
    createdBy: prescription.createdBy?.userName || "Unknown",
    createdByEmail: prescription.createdBy?.email || "Unknown",
    createdById: prescription.createdBy._id,
    createdByRole: prescription.createdBy?.role || "N/A",
    medicine: prescription.medicine
      ? prescription.medicine.map((med) => ({
          medicineName: med.medicineName || "N/A",
          dosage: med.dosage || "N/A",
          frequency: med.frequency || "N/A",
          duration: med.duration || "N/A",
        }))
      : [],
    PrescriptionDate: prescription.PrescriptionDate || null,
  };
};

// const updatePrescriptionService = async (req) => {
//   const { loggedInUserId, loggedInUserRole } = req.accessControl;
//   const { id } = req.params;

//   const { patient: newPatientId, ...updateFields } = req.body;

//   let prescription = await prescriptionModel.findById(id);
//   if (!prescription) {
//     throw new NotFoundError("Prescription not found", 404);
//   }

//   if (newPatientId && newPatientId !== prescription.patient.toString()) {
//     const newPatient = await patientModel.findById(newPatientId);
//     if (!newPatient) {
//       throw new NotFoundError("New patient not found", 404);
//     }
//     updateFields.patient = newPatientId;
//   }

//   const updatedPrescription = await prescriptionModel
//     .findByIdAndUpdate(id, updateFields, { new: true })
//     .populate({
//       path: "patient",
//       populate: { path: "user", select: "userName email role" },
//     })
//     .populate("createdBy", "userName email role");

//   if (!updatedPrescription) {
//     throw new NotFoundError("Failed to update prescription", 500);
//   }

//   const formattedPrescription = {
//     _id: updatedPrescription._id,
//     patientId: updatedPrescription.patient?._id || null,
//     patientName: updatedPrescription.patient?.user?.userName || "Unknown",
//     patientEmail: updatedPrescription.patient?.user?.email || "N/A",
//     createdBy: updatedPrescription.createdBy?.userName || "Unknown",
//     createdByRole: updatedPrescription.createdBy?.role || "N/A",
//     medicine:
//       updatedPrescription.medicine?.map((med) => ({
//         medicineName: med.medicineName || "N/A",
//         dosage: med.dosage || "N/A",
//         frequency: med.frequency || "N/A",
//         duration: med.duration || "N/A",
//       })) || [],
//     updatedPrescriptionDate: updatedPrescription.PrescriptionDate || null,
//   };

//   return formattedPrescription;
// };

const updatePrescriptionService = async (req) => {
  const { id } = req.params;
  const { userId, role } = req.user;
  const { patientId, medicine } = req.body;

  // ✅ Ensure prescription exists
  const prescription = await prescriptionModel.findById(id);
  if (!prescription) {
    throw new NotFoundError("Prescription not found");
  }

  // ✅ Allow admin to update any prescription, pharmacist only their own
  const isAdmin = role === "admin";
  const isCreator = prescription.createdBy.toString() === userId;

  if (!isAdmin && !isCreator) {
    throw new ForbiddenError("You are not allowed to update this prescription");
  }

  // ✅ If patientId is provided, allow both admin and the pharmacist (creator) to update it
  if (patientId) {
    const patient = await patientModel.findById(patientId);
    if (!patient) {
      throw new NotFoundError("Patient not found");
    }
  }

  // ✅ Update prescription
  const updatedPrescription = await prescriptionModel
    .findByIdAndUpdate(
      id,
      {
        ...(patientId && { patient: patientId }), // Update only if provided
        ...(medicine && { medicine }), // Update only if provided
      },
      { new: true } // ✅ Return the updated document
    )
    .populate({
      path: "patient",
      populate: { path: "user", select: "userName email" },
    })
    .populate({
      path: "createdBy",
      select: "userName role",
    });

  return {
    message: "Prescription updated successfully",
    prescription: {
      _id: updatedPrescription._id,
      patientId: updatedPrescription.patient?._id || null,
      patientName: updatedPrescription.patient?.user?.userName || "Unknown",
      patientEmail: updatedPrescription.patient?.user?.email || "N/A",
      createdBy: updatedPrescription.createdBy?.userName || "Unknown",
      createdByRole: updatedPrescription.createdBy?.role || "N/A",
      medicine: updatedPrescription.medicine.map((med) => ({
        medicineName: med.medicineName || "N/A",
        dosage: med.dosage || "N/A",
        frequency: med.frequency || "N/A",
        duration: med.duration || "N/A",
      })),
      PrescriptionDate: updatedPrescription.PrescriptionDate || null,
    },
  };
};

// const deletePrescriptionService = async (req) => {
//   // const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
//   const { id } = req.params;

//   const deletedPrescription = await prescriptionModel
//     .findByIdAndDelete(id)
//     .populate({
//       path: "patient",
//       populate: { path: "user", select: "userName email role" },
//     })
//     .populate("createdBy", "userName email role");

//   console.log("see deleted patient ", deletedPrescription);

//   const formattedPrescription = {
//     _id: deletedPrescription._id,
//     patientId: deletedPrescription.patient?._id || null,
//     patientName: deletedPrescription.patient?.user?.userName || "Unknown",
//     patientEmail: deletedPrescription.patient?.user?.email || "N/A",
//     createdBy: deletedPrescription.createdBy?.userName || "Unknown",
//     createdByRole: deletedPrescription.createdBy?.role || "N/A",
//     medicine:
//       deletedPrescription.medicine?.map((med) => ({
//         medicineName: med.medicineName || "N/A",
//         dosage: med.dosage || "N/A",
//         frequency: med.frequency || "N/A",
//         duration: med.duration || "N/A",
//       })) || [],
//     deletedPrescriptionDate: deletedPrescription.PrescriptionDate || null,
//   };

//   return formattedPrescription;
// };

const deletePrescriptionService = async (req) => {
  const { id } = req.params;
  const { userId, role } = req.user;

  // ✅ Find prescription
  const prescription = await prescriptionModel.findById(id);
  if (!prescription) {
    throw new NotFoundError("Prescription not found");
  }

  // ✅ Allow deletion if user is an admin or the creator pharmacist
  const isAdmin = role === "admin";
  const isCreator = prescription.createdBy.toString() === userId;

  if (!isAdmin && !isCreator) {
    throw new ForbiddenError("You are not allowed to delete this prescription");
  }

  // ✅ Delete prescription
  const deletedPrescription = await prescriptionModel.findByIdAndDelete(id);

  return deletedPrescription;
};

module.exports = {
  createPrescriptionService,
  getAllPrescriptionsService,
  getPrescriptionByIdService,
  updatePrescriptionService,
  deletePrescriptionService,
};
