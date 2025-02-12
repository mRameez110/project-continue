const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const checkPermissionMiddleware = require("../middlewares/permissionsMiddleware");

const {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
} = require("../controllers/prescriptionController");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  getAllPrescriptions
);

router.post(
  "/",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist"),
  createPrescription
);

router.get(
  "/:id",
  // authMiddleware,
  // checkPermissionMiddleware("admin", "pharmacist", "patient"),
  getPrescriptionById
);

router.put(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  updatePrescription
);
router.delete(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  deletePrescription
);
module.exports = router;
