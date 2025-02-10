const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../utils/errorHandlerClass");

require("../utils/errorHandlerClass");

const authMiddleware = (req, res, next) => {
  console.log("inspect token");
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("inspect token 2");

  if (!token) {
    console.log("inspect token 3", token);
    throw new BadRequestError("Access Denied, Token not found", 400);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      throw new BadRequestError("Invalid token or token expired", 400);
    console.log("inspect decoded token", decoded);

    req.user = decoded; // Attach/add user info (id, role) to the request object
    console.log("inspect req user ", req.user);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
