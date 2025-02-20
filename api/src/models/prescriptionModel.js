const { required } = require("joi");
const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	medicine: [
		{
			medicineName: { type: String, required: true },
			dosage: { type: String, required: true },
			frequency: { type: String, required: true },
			duration: { type: String, required: true },
		},
	],

	PrescriptionDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
