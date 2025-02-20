require("dotenv").config();
const express = require("express");
const { default: helmet } = require("helmet");
const cors = require("cors");

const connectDB = require("./utils/dbConnection");

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const pharmacistRoutes = require("./routes/pharmacistRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const pharmacyBranchRoutes = require("./routes/pharmacyBranchRoutes");
const medicineOrderRoutes = require("./routes/medicineOrderRoutes");

const errorHandler = require("./middlewares/errorHandler");

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/pharmacists", pharmacistRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/pharmacy-branches", pharmacyBranchRoutes);
app.use("/api/order-medicines", medicineOrderRoutes);

app.use("*", (req, res) => {
	res.status(404).json({
		message: "Route not exist 2",
	});
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
