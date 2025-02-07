require("dotenv").config();
const express = require("express");
const { default: helmet } = require("helmet");

const connectDB = require("./utils/dbConnection");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");

const errorHandler = require("./middlwares/errorHandler");

connectDB();

const app = express();
app.use(express.json());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
// app.use("/api/pharmacists");
// app.use("/api/pharmacies");
// app.use("/api/prescriptions");

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not exist",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
