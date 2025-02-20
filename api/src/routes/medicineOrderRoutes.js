const express = require("express");
const router = express.Router();

const {
	getAllMedicineOrders,
	createMedicineOrder,
	getMedicineOrderById,
	updateMedicineOrder,
	deleteMedicineOrder,
} = require("../controllers/medicineOrderController");
const authMiddleware = require("../middlewares/authMiddleware");

const checkPermissionMiddleware = require("../middlewares/permissionsMiddleware");

router.get(
	"/",
	authMiddleware,
	checkPermissionMiddleware("admin", "pharmacist", "patient"),
	getAllMedicineOrders
);
router.post("/", authMiddleware, createMedicineOrder);
router.get("/:id", authMiddleware, getMedicineOrderById);
router.put(
	"/:id",
	authMiddleware,
	checkPermissionMiddleware("admin", "pharmacist", "patient"),
	updateMedicineOrder
);
router.delete("/:id", authMiddleware, deleteMedicineOrder);

module.exports = router;
