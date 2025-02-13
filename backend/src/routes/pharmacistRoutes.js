const express = require("express");
const {
  getAllPharmacists,
  getPharmacistById,
  updatePharmacist,
  deletePharmacist,
} = require("../controllers/pharmacistController");

const authMiddleware = require("../middlewares/authMiddleware");
const checkPermissionMiddleware = require("../middlewares/permissionsMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist"),
  getAllPharmacists
);

router.get(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  getPharmacistById
);

router.put(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  updatePharmacist
);

router.delete(
  "/:id",
  authMiddleware,
  checkPermissionMiddleware("admin", "pharmacist", "patient"),
  deletePharmacist
);

module.exports = router;
