const { registerService, loginService } = require("../services/authServices");
const {
  validation,
  registerValidationSchema,
  loginValidationSchema,
} = require("../utils/validations/schemaValidations");
const registerUser = async (req, res, next) => {
  try {
    validation(req.body, registerValidationSchema);

    const newUser = await registerService(req.body);
    console.log("check new user in controler ", newUser);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    next(err);
  }
};

//  ---> Login User

const loginUser = async (req, res, next) => {
  try {
    // console.log("check login user controller ");

    validation(req.body, loginValidationSchema);
    const { user, token } = await loginService(req.body);

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser };
