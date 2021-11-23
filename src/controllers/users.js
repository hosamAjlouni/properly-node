const _ = require("lodash");
const { BadRequestError } = require("../middleware/error-handler");
const { validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const signup = async (req, res) => {
  const instance = await User.create(req.body);
  res.send(instance);
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new BadRequestError(errors.array());

  const instance = await User.findOne({
    where: { email: req.body.email, password: req.body.password },
  });
  if (!instance) throw new BadRequestError("Invalid Email or Password");

  const token = jwt.sign({ userId: instance.id }, config.get("jwtPrivateKey"));

  res
    .header("x-auth-token", token)
    .send(_.pick(instance, ["id", "username", "email"]));
};

module.exports = {
  signup,
  login,
};
