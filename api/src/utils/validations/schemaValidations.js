const joi = require("joi");

const { ValidationError } = require("../errorHandlerClass");

const registerValidationSchema = joi
  .object({
    userName: joi.string().min(3).max(50).trim().required(),
    email: joi.string().email().min(1).max(50).trim().required(),
    password: joi.string().min(1).required(),
    role: joi.string().required(),
  })
  .options({ abortEarly: true });

const loginValidationSchema = joi
  .object({
    email: joi.string().email().min(1).max(50).trim().required(),
    password: joi.string().min(1).required(),
  })
  .options({ abortEarly: true });

// const updatePatientValidationSchema = joi
//   .object({
//     // userName: joi.string().min(2).max(30).optional(),
//     // email: joi.string().email().optional(),
//     fullName: joi.string().min(3).max(15).optional(),
//     age: joi.string().min(0).max(120).optional(),
//     contact: joi.string().min(10).max(15).optional(),
//   })
//   // .strict() // Ensures no extra fields are allowed
//   .options({ abortEarly: true });

const updatePatientValidationSchema = joi
  .object({
    fullName: joi.string().min(3).max(15).empty("").optional(),
    age: joi.string().min(1).max(3).empty("").optional(),
    // contact: joi.string().allow("").min(10).max(15).allow("").optional(),
    contact: joi.string().min(10).max(15).empty("").optional(),
  })
  .unknown(false) // ❌ Reject unknown fields (like "message")
  .options({ abortEarly: false }); // Allow multiple validation errors

const updatePharmacistValidationSchema = joi
  .object({
    userName: joi.string().min(3).max(30).optional(),
    email: joi.string().email().optional(),
    fullName: joi.string().min(3).max(15).optional(),
    age: joi.string().min(0).max(120).optional(),
    contact: joi.string().min(11).max(20).optional(),
    pharmacyBranch: joi.string().min(3).max(15).optional(),
  })
  .strict() // Ensures no extra fields are allowed
  .options({ abortEarly: true });

const createPrescriptionValidationSchema = joi
  .object({
    patientId: joi.optional() || null,
    medicine: joi
      .array()
      .items(
        joi.object({
          medicineName: joi.string().trim().min(3).required(),
          dosage: joi.string(),
          frequency: joi.string(),
          duration: joi.string(),
        })
      )
      .min(1)
      .strict()
      .required(),
  })
  .strict()
  .options({ abortEarly: false });

const updatePrescriptionValidationSchema = joi
  .object({
    patientId: joi.optional() || null,
    medicine: joi
      .array()
      .items(
        joi.object({
          medicineName: joi.string().trim().min(3).required(),
          dosage: joi.string(),
          frequency: joi.string(),
          duration: joi.string(),
        })
      )
      .min(1)
      .optional(),
  })
  .strict()
  .options({ abortEarly: false });

const createPharmacyBranchValidationSchema = joi
  .object({
    name: joi.string().min(3).required(),
    address: joi.string().trim().min(3),
    contactInfo: joi.string().min(5),
    pharmacists: joi.array().items(joi.string().trim()).min(1).required(),
  })
  .strict()
  .options({ abortEarly: false });

const updatePharmacyBranchValidationSchema = joi
  .object({
    name: joi.string().min(3).optional(),
    address: joi.string().trim().min(3).optional(),
    contactInfo: joi.string().min(5).optional(),
    pharmacists: joi.array().items(joi.string()).min(1).optional(),
  })
  .strict()
  .options({ abortEarly: false });

const validation = (dataObject, validationSchema) => {
  const { error } = validationSchema.validate(dataObject);
  if (error) {
    // throw new Error(error.details[0].message);
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
