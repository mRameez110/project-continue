const express = require("express");
const {
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermissionMiddleware = require("../middlewares/permissionsMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist"),
  getAllPatients
); 

router.get(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  getPatientById
);

router.put(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  updatePatient
); 
router.delete(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  deletePatient
); 

module.exports = router;
