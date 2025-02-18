const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../utils/errorHandlerClass");

require("../utils/errorHandlerClass");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    console.log("inspect token 3", token);
    throw new BadRequestError("Access Denied, Token not found", 400);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      throw new BadRequestError("Invalid token or token expired", 400);
    console.log("inspect decoded token", decoded);

    req.user = decoded;
    console.log("inspect req user ", req.user);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
