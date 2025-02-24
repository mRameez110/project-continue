const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/permissionsMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, checkPermission("admin"), getAllUsers);
router.get("/:id", authMiddleware, checkPermission("admin"), getUserById);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
