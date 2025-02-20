const express = require("express");
const {
	registerUser,
	loginUser,
	getAllUsers,
	getUserById,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/permissionsMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, checkPermission("admin"), getAllUsers);
router.get("/:id", authMiddleware, checkPermission("admin"), getUserById);

module.exports = router;
