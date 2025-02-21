const joi = require("joi");

const { ValidationError } = require("../errorHandlerClass");

const registerValidationSchema = joi
	.object({
		userName: joi.string().min(3).max(50).trim().required(),
		email: joi.string().email().min(5).max(50).trim().required(),
		password: joi.string().min(6).required(),
		role: joi.string().required(),
	})
	.options({ abortEarly: true });

const loginValidationSchema = joi
	.object({
		email: joi.string().email().min(1).max(50).trim().required(),
		password: joi.string().min(1).required(),
	})
	.options({ abortEarly: true });

const updatePatientValidationSchema = joi
	.object({
		fullName: joi.string().min(3).max(50).empty("").optional(),
		age: joi.number().integer().min(1).max(999).empty("").optional(),
		contact: joi
			.string()
			.allow("")
			.pattern(/^[0-9\s\-\(\)]*$/)
			.min(10)
			.max(15)
			.messages({
				"string.pattern.base": "Contact must contain only numbers.",
				"string.min": "Contact must be at least 10 digits.",
				"string.max": "Contact must not exceed 15 digits.",
			})
			.optional(),
	})
	.unknown(false)
	.options({ abortEarly: false });

const updatePharmacistValidationSchema = joi
	.object({
		userName: joi.string().min(3).max(50).optional(),
		email: joi.string().email().optional(),
		fullName: joi.string().min(3).max(50).optional(),
		age: joi.number().integer().min(1).max(999).empty("").optional().messages({
			"number.base": "Age must be a valid number.",
			"number.min": "Age must be greater than or equal to 1",
		}),
		contact: joi
			.string()
			.allow("")
			.pattern(/^[0-9\s\-\(\)]*$/)
			.min(10)
			.max(15)
			.messages({
				"string.pattern.base": "Contact must contain only numbers.",
				"string.min": "Contact must be at least 10 digits.",
				"string.max": "Contact must not exceed 15 digits.",
			})
			.optional(),
		pharmacyBranch: joi.string().min(3).max(25).optional(),
	})
	.unknown(false)
	.options({ abortEarly: false });

// ----> Create Prescription Validationi Schema
const createPrescriptionValidationSchema = joi
	.object({
		patientId: joi.optional() || null,
		medicine: joi
			.array()
			.items(
				joi.object({
					medicineName: joi.string().min(3).required().messages({
						"string.base": "Medicine name must be a string.",
						"string.empty": "Medicine name must be provided.",
						"string.min": "Medicine name must be at least 3 characters long.",
						"any.required": "Medicine name is required.",
					}),
					dosage: joi.string().required().messages({
						"string.base": "Dosage must be a string.",
						"string.empty": "Dosage must be provided.",
						"any.required": "Dosage is required.",
					}),
					frequency: joi.string().required().messages({
						"string.base": "Frequency must be a string.",
						"string.empty": "Frequency must be provided.",
						"any.required": "Frequency is required.",
					}),
					duration: joi.string().required().messages({
						"string.base": "Duration must be a string.",
						"string.empty": "Duration must be provided.",
						"any.required": "Duration is required.",
					}),
				})
			)
			.min(1)
			.required()
			.messages({
				"array.min": "At least one medicine is required.",
				"any.required": "Medicine is required.",
			}),
	})
	.strict()
	.options({ abortEarly: false });

// ----> Edit Prescription Validationi Schema
const updatePrescriptionValidationSchema = joi
	.object({
		patientId: joi.optional() || null,
		medicine: joi
			.array()
			.items(
				joi.object({
					medicineName: joi.string().min(3).required().messages({
						"string.base": "Medicine name must be a string.",
						"string.empty": "Medicine name must be provided.",
						"string.min": "Medicine name must be at least 3 characters long.",
						"any.required": "Medicine name is required.",
					}),
					dosage: joi.string().required().messages({
						"string.base": "Dosage must be a string.",
						"string.empty": "Dosage must be provided.",
						"any.required": "Dosage is required.",
					}),
					frequency: joi.string().required().messages({
						"string.base": "Frequency must be a string.",
						"string.empty": "Frequency must be provided.",
						"any.required": "Frequency is required.",
					}),
					duration: joi.string().required().messages({
						"string.base": "Duration must be a string.",
						"string.empty": "Duration must be provided.",
						"any.required": "Duration is required.",
					}),
				})
			)
			.min(1)
			.required()
			.messages({
				"array.min": "At least one medicine is required.",
				"any.required": "Medicine is required.",
			}),
	})
	.strict()
	.options({ abortEarly: false });

const createPharmacyBranchValidationSchema = joi
	.object({
		name: joi.string().min(3).required(),
		address: joi.string().trim().min(3),
		contact: joi.string().min(10),
		pharmacists: joi
			.array()
			.items(joi.string().trim())
			.min(1)
			.required()
			.messages({
				"string.pharmacists": "must select 1 pharmacist to create new branch",
			}),
	})
	.strict()
	.options({ abortEarly: false });

const updatePharmacyBranchValidationSchema = joi
	.object({
		name: joi.string().min(3).optional(),
		address: joi.string().trim().min(3).optional(),
		contact: joi.string().min(9).optional(),
		pharmacists: joi.array().items(joi.string().optional()).optional(),
	})
	.strict()
	.options({ abortEarly: false })
	.unknown(true);

const validation = (dataObject, validationSchema) => {
	const { error } = validationSchema.validate(dataObject);
	if (error) {
		throw new ValidationError(error.details[0].message, 400);
	}
};

module.exports = {
	registerValidationSchema,
	loginValidationSchema,
	updatePatientValidationSchema,
	updatePharmacistValidationSchema,
	createPrescriptionValidationSchema,
	updatePrescriptionValidationSchema,
	createPharmacyBranchValidationSchema,
	updatePharmacyBranchValidationSchema,
	validation,
};
