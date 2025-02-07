const joi = require("joi");

const { ValidationError } = require("../../utils/errorHandlerClass");

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

const updatePatientValidationSchema = joi
  .object({
    userName: joi.string().min(3).max(30).optional(),
    email: joi.string().email().optional(),
    fullName: joi.string().min(3).max(15).optional(),
    age: joi.number().integer().min(0).max(120).optional(),
    contact: joi.string().min(10).max(15).optional(),
  })
  .strict() // Ensures no extra fields are allowed
  .options({ abortEarly: true });

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
  updatePatientValidation: updatePatientValidationSchema,
  validation,
};
