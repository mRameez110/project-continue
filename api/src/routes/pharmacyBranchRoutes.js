const express = require("express");

const {
  createPharmacyBranch,
  getPharmacyBranches,
  getPharmacyBranchById,
  updatePharmacyBranch,
  deletePharmacyBranch,
} = require("../controllers/pharmacyBranchController");

const authMiddleware = require("../middlewares/authMiddleware");
const checkPermissionMiddleware = require("../middlewares/permissionsMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermissionMiddleware("admin"),
  createPharmacyBranch
);

router.get(
  "/",
  authMiddleware,
  checkPermissionMiddleware("pharmacist", "admin"),
  getPharmacyBranches
);
router.get(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("pharmacist", "admin"),
  getPharmacyBranchById
);

router.put(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin"),
  updatePharmacyBranch
);

router.delete(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin"),
  deletePharmacyBranch
);

module.exports = router;
