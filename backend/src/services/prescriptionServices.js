const patientModel = require("../models/patientModel");
const userModel = require("../models/userModel");
const prescriptionModel = require("../models/prescriptionModel");

const {
  BadRequestError,
  NotFoundError,
} = require("../utils/errorHandlerClass");

const getAllPrescriptionsService = async (req) => {
  const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
  // const userIdToFetch = targetUserId || loggedInUserId;

  const query =
    loggedInUserRole === "pharmacist" ? { createdBy: loggedInUserId } : {};

  const prescriptions = await prescriptionModel
    .find(query)
    .populate("createdBy", "userName role")
    .populate({
      path: "patient",
      populate: { path: "user", select: "userName email" },
    });

  // if (!prescriptions.length)
  //   throw new NotFoundError("No prescription found", 200);

  const formattedPrescriptions = prescriptions.map((prescription) => ({
    _id: prescription._id,
    patientId: prescription.patient?._id || null,
    patientName: prescription.patient?.user?.userName || "Unknown",
    patientEmail: prescription.patient?.user?.email || "N/A",
    createdBy: prescription.createdBy?.userName || "Unknown",
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
  }));

  return formattedPrescriptions;
};

const createPrescriptionService = async (req) => {
  console.log("see req body ", req.body);

  const newPrescription = new prescriptionModel(req.body);
  await newPrescription.save();

  const newPopulatedPrescription = await prescriptionModel
    .findById(newPrescription._id)
    .populate({ path: "createdBy", select: "userName role" })
    .populate({
      path: "patient",
      populate: { path: "user", select: "userName email" },
    });

  if (!newPopulatedPrescription) {
    throw new NotFoundError("Internal Server Error", 500);
  }

  const formattedPrescription = {
    _id: newPopulatedPrescription._id,
    patientId: newPopulatedPrescription.patient?._id || null,
    patientName: newPopulatedPrescription.patient?.user?.userName || "Unknown",
    patientEmail: newPopulatedPrescription.patient?.user?.email || "N/A",
    createdBy: newPopulatedPrescription.createdBy?.userName || "Unknown",
    createdByRole: newPopulatedPrescription.createdBy?.role || "N/A",
    medicine: newPopulatedPrescription.medicine
      ? newPopulatedPrescription.medicine.map((med) => ({
          medicineName: med.medicineName || "N/A",
          dosage: med.dosage || "N/A",
          frequency: med.frequency || "N/A",
          duration: med.duration || "N/A",
        }))
      : [],
    PrescriptionDate: newPopulatedPrescription.PrescriptionDate || null,
  };

  return formattedPrescription;
};

const getPrescriptionService = async (req) => {
  const { id } = req.params;

  console.log("check prescriptio ", id);

  const prescription = await prescriptionModel
    .findById(id)
    .populate({ path: "createdBy", select: "userName role" })
    .populate({
      path: "patient",
      populate: { path: "user", select: "userName email" },
    });
  if (!prescription) {
    throw new NotFoundError("Prescription not found", 404);
  }

  const formattedPrescription = {
    _id: prescription._id,
    patientId: prescription.patient?._id || null,
    patientName: prescription.patient?.user?.userName || "Unknown",
    patientEmail: prescription.patient?.user?.email || "N/A",
    createdBy: prescription.createdBy?.userName || "Unknown",
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

  return formattedPrescription;
};

const updatePrescriptionService = async (req) => {
  const { loggedInUserId, loggedInUserRole } = req.accessControl;
  const { id } = req.params;

  const { patient: newPatientId, ...updateFields } = req.body;

  let prescription = await prescriptionModel.findById(id);
  if (!prescription) {
    throw new NotFoundError("Prescription not found", 404);
  }

  if (newPatientId && newPatientId !== prescription.patient.toString()) {
    const newPatient = await patientModel.findById(newPatientId);
    if (!newPatient) {
      throw new NotFoundError("New patient not found", 404);
    }
    updateFields.patient = newPatientId;
  }

  const updatedPrescription = await prescriptionModel
    .findByIdAndUpdate(id, updateFields, { new: true })
    .populate({
      path: "patient",
      populate: { path: "user", select: "userName email role" },
    })
    .populate("createdBy", "userName email role");

  if (!updatedPrescription) {
    throw new NotFoundError("Failed to update prescription", 500);
  }

  const formattedPrescription = {
    _id: updatedPrescription._id,
    patientId: updatedPrescription.patient?._id || null,
    patientName: updatedPrescription.patient?.user?.userName || "Unknown",
    patientEmail: updatedPrescription.patient?.user?.email || "N/A",
    createdBy: updatedPrescription.createdBy?.userName || "Unknown",
    createdByRole: updatedPrescription.createdBy?.role || "N/A",
    medicine:
      updatedPrescription.medicine?.map((med) => ({
        medicineName: med.medicineName || "N/A",
        dosage: med.dosage || "N/A",
        frequency: med.frequency || "N/A",
        duration: med.duration || "N/A",
      })) || [],
    updatedPrescriptionDate: updatedPrescription.PrescriptionDate || null,
  };

  return formattedPrescription;
};

const deletePrescriptionService = async (req) => {
  // const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;
  const { id } = req.params;

  const deletedprescription = await prescriptionModel
    .findByIdAndUpdate(id)
    .populate({
      path: "patient",
      populate: { path: "user", select: "userName email role" },
    })
    .populate("createdBy", "userName email role");

  console.log("see deleted patient ", deletedprescription);

  const formattedPrescription = {
    _id: deletedprescription._id,
    patientId: deletedprescription.patient?._id || null,
    patientName: deletedprescription.patient?.user?.userName || "Unknown",
    patientEmail: deletedprescription.patient?.user?.email || "N/A",
    createdBy: deletedprescription.createdBy?.userName || "Unknown",
    createdByRole: deletedprescription.createdBy?.role || "N/A",
    medicine:
      deletedprescription.medicine?.map((med) => ({
        medicineName: med.medicineName || "N/A",
        dosage: med.dosage || "N/A",
        frequency: med.frequency || "N/A",
        duration: med.duration || "N/A",
      })) || [],
    deletedprescriptionDate: deletedprescription.PrescriptionDate || null,
  };

  return formattedPrescription;
};

module.exports = {
  createPrescriptionService,
  getAllPrescriptionsService,
  getPrescriptionService,
  updatePrescriptionService,
  deletePrescriptionService,
};
