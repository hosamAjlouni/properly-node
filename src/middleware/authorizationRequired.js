const { AuthorizationError } = require("../middleware/error-handler");
const User = require("../models/users");

const authorizationRequired = (action, module) => {
  return (req, res, next) => {
    const user = User.findByPk(req.userId);
    const permissions = user.getPermissions({
      where: { action: action, module: module },
    });
    if (!permissions)
      throw new AuthorizationError(
        "Sorry, you are not authorized to access this resource"
      );
    next();
  };
};
