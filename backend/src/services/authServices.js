const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const {
  UserAlreadyExistError,
  InvalidCredentialError,
  BadRequestError,
} = require("../utils/errorHandlerClass");
const patientModel = require("../models/patientModel");
const pharmacistModel = require("../models/pharmacistModel");

const registerService = async (req) => {
  const { userName, email, password, role } = req;
  const userNameAlreadyExist = await userModel.findOne({ userName });

  if (userNameAlreadyExist) {
    throw new UserAlreadyExistError("Username already in use", 400);
  }

  const userEmailAlreadyExist = await userModel.findOne({ email });

  if (userEmailAlreadyExist) {
    throw new UserAlreadyExistError("Email already exist", 400);
  }

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new userModel({
    userName,
    email,
    password: hashPassword,
    role,
  });

  await newUser.save();
  console.log("see new user ", newUser);

  if (role === "patient") {
    const newPatient = new patientModel({ user: newUser._id });
    await newPatient.save();
    console.log("see new patient ", newPatient);
  }

  if (role === "pharmacist") {
    const newPharmacist = new pharmacistModel({ user: newUser._id });
    await newPharmacist.save();
    console.log("see new pharmacist ", newPharmacist);
  }

  const userWithoutPassword = newUser.toObject();
  delete userWithoutPassword.password;

  return { newUser: userWithoutPassword };
};

// const loginService = async (dataObject) => {
//   const { email, password } = dataObject;
//   const user = await userModel.findOne({ email });
//   if (!user) {
//     throw new BadRequestError("Email not found", 400);
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new BadRequestError("Wrong Password", 400);
//   }

//   const token = jwt.sign(
//     { userId: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "8h" }
//   );

//   return { user, token };
// };

const loginService = async (dataObject) => {
  const { email, password } = dataObject;

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new BadRequestError("Email not found", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequestError("Wrong Password", 400);
  }

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return { user: userWithoutPassword, token };
};

const getAllUsersService = async () => {
  const users = await userModel.find();
  console.log("see All users ", users);
  return users;
};

const getUserByIdService = async (dataObject) => {
  const userId = dataObject.params.id;

  const findedUser = await userModel.findOne({ _id: userId });

  if (!findedUser) throw new NotFoundError("No patient found", 404);

  console.log("see get patient by id ", findedUser);

  return findedUser;
};

module.exports = {
  registerService,
  loginService,
  getAllUsersService,
  getUserByIdService,
};
