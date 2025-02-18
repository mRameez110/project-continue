const { ForbiddenError } = require("../utils/errorHandlerClass");

const checkPermission = (...allowedRoles) => {
  return (req, res, next) => {
    const loggedInUserId = req.user.userId;
    const loggedInUserRole = req.user.role;
    const targetUserId = req.params.id || null;

    console.log("check things", loggedInUserId, loggedInUserRole, targetUserId);

    if (loggedInUserRole === "admin") {
      req.accessControl = {
        loggedInUserId,
        loggedInUserRole,
        targetUserId,
      };
      return next();
    }

    if (!allowedRoles.includes(loggedInUserRole)) {
      throw new ForbiddenError(
        "You are not allowed to perform this action",
        403
      );
    }

    if (
      loggedInUserRole === "patient" &&
      ["/patients"].some((route) => req.originalUrl.includes(route)) &&
      targetUserId &&
      loggedInUserId !== targetUserId
    ) {
      throw new ForbiddenError("Patients can only update their own data", 403);
    }

    if (
      loggedInUserRole === "pharmacist" &&
      ["/pharmacists", "/branches"].some((route) =>
        req.originalUrl.includes(route)
      ) &&
      loggedInUserId !== targetUserId
    ) {
      throw new ForbiddenError(
        "You are not authorized for this request action",
        403
      );
    }

    req.accessControl = {
      loggedInUserId,
      loggedInUserRole,
      targetUserId,
    };

    next();
  };
};

module.exports = checkPermission;
