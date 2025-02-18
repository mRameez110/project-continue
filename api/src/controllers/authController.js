const {
  registerService,
  loginService,
  getAllUsersService,
  getUserByIdService,
} = require("../services/authServices");
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

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    next(err);
  }
};

//  ---> Login User
const loginUser = async (req, res, next) => {
  try {
    

    validation(req.body, loginValidationSchema);
    const { user, token } = await loginService(req.body);

    res.status(200).json({
      message: "Login successfully",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    console.log("see all users(Patient/pharmacist/admin) ");

    const users = await getAllUsersService();
    res.status(200).json({
      message: "All users fetch successfully ",
      users,
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const findedUser = await getUserByIdService(req);
    console.log("see get by id patient in cont", findedUser);

    res.status(200).json({
      message: "Patient fetch Successfully",
      user: findedUser,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { registerUser, loginUser, getAllUsers, getUserById };
