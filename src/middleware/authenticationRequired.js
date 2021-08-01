const User = require("../models/users");
const jwt = require("jsonwebtoken");
const config = require("config");
const { AuthorizationError, BadRequestError } = require("./error-handler");

const authenticationRequired = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) throw new AuthorizationError("Unauthenticated.");

  let decoded;
  try {
    decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  } catch (ex) {
    throw new BadRequestError("invalid authentication token.");
  }

  const user = await User.findByPk(decoded.userId);
  if (!user) throw new BadRequestError("invalid authentication token.")
  
  const workspace = await user.getWorkspace();
  req.userId = user.id;
  req.workspaceId = workspace.id;
  next();
};

module.exports = authenticationRequired;
