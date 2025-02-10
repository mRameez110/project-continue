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
  // authMiddleware,
  getPharmacyBranches
);
router.get(
  "/:id",
  // authMiddleware,
  getPharmacyBranchById
);

router.put(
  "/:id",
  //   authMiddleware,
  //   permissionMiddleware("admin"),
  updatePharmacyBranch
);

router.delete(
  "/:id",
  //   authMiddleware,
  //   permissionMiddleware("admin"),
  deletePharmacyBranch
);

module.exports = router;
