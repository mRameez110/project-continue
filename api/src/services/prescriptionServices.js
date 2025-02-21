const patientModel = require("../models/patientModel");
const userModel = require("../models/userModel");
const prescriptionModel = require("../models/prescriptionModel");

const { NotFoundError, ForbiddenError } = require("../utils/errorHandlerClass");

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
    patientName:
      prescription.patient?.user?.userName || "Unknown(May account Deleted)",
    createdBy:
      prescription.createdBy?.userName || "Unknown(May Account Deleted)",
    PrescriptionDate: prescription.PrescriptionDate || null,
  }));
  console.log(
    "see formated prescriptions length and fields ",
    formattedPrescriptions.length,
    formattedPrescriptions
  );

  return formattedPrescriptions;
};

const createPrescriptionService = async (req) => {
  const { role, userId } = req.user;

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
    assignedPatient = patient._id;
  }

  const newPrescription = new prescriptionModel({
    patient: assignedPatient,
    createdBy: userId,
    medicine,
  });

  await newPrescription.save();
  return newPrescription;
};

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
    patientName:
      prescription.patient?.user?.userName || "Unknown(May account deleted)",
    patientEmail: prescription.patient?.user?.email || "N/A",
    createdBy:
      prescription.createdBy?.userName || "Unknown(May account deleted)",
    createdByEmail: prescription.createdBy?.email || "Unknown",
    createdById: prescription.createdBy?._id || "N/A",
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

const updatePrescriptionService = async (req) => {
  const { id } = req.params;
  const { userId, role } = req.user;
  const { patientId, medicine } = req.body;

  const prescription = await prescriptionModel.findById(id);
  if (!prescription) {
    throw new NotFoundError("Prescription not found");
  }

  const isAdmin = role === "admin";
  const isCreator = prescription.createdBy.toString() === userId;

  if (!isAdmin && !isCreator) {
    throw new ForbiddenError("You are not allowed to update this prescription");
  }

  if (patientId) {
    const patient = await patientModel.findById(patientId);
    if (!patient) {
      throw new NotFoundError("Patient not found");
    }
  }

  const updatedPrescription = await prescriptionModel
    .findByIdAndUpdate(
      id,
      {
        ...(patientId && { patient: patientId }),
        ...(medicine && { medicine }),
      },
      { new: true }
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

const deletePrescriptionService = async (req) => {
  const { id } = req.params;
  const { userId, role } = req.user;

  const prescription = await prescriptionModel.findById(id);
  if (!prescription) {
    throw new NotFoundError("Prescription not found");
  }

  const isAdmin = role === "admin";
  const isCreator = prescription.createdBy.toString() === userId;

  if (!isAdmin && !isCreator) {
    throw new ForbiddenError("You are not allowed to delete this prescription");
  }

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
