const express = require("express");
const {
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientcontroller");
const authMiddleware = require("../middlwares/authMiddleware");
const checkPermissionMiddleware = require("../middlwares/permissionsMiddleware");
require("../controllers/patientcontroller");

const router = express.Router();

//router.post("/", createPatient); // can by Admin, Pharmacist

router.get(
  "/",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist"),
  getAllPatients
); // pharmacist and Admin

router.get(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  getPatient
);

router.put(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  updatePatient
); // by patient(own), pharmacist and Admin
router.delete(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  deletePatient
); // by patient(own), pharmacist and Admin

module.exports = router;
