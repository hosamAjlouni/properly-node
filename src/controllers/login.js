const BadRequestError = require("../middleware/error-handler");
const User = require("../models/users");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new BadRequestError(errors.array());
  const instance = await User.findOne({ where: { email: req.body.email } });
  if (!instance) throw new BadRequestError("Invalid Email or Password");

  const isValid = req.body.password === instance.password;
  if (!isValid) throw new BadRequestError("Invalid Email or password");

  const token = jwt.sign({ userId: instance.id }, config.get("jwtPrivateKey"));

  res
    .header("x-auth-token", token)
    .send(_.pick(instance, ["id", "username", "email"]));
};

module.exports = login;
