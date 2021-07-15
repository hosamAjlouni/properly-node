const User = require("../models/users");
const _  = require('lodash')
const { validationResult } = require("express-validator");
const { BadRequestError } = require("../middleware/error-handler");
const config = require("config")
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  const instance = await User.create(req.body);
  res.send(instance);
};

const authenticate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new BadRequestError(errors.array());

  const instance = await User.findOne({ where: { email: req.body.email } });
  if (!instance) throw new BadRequestError("Invalid Email or Password");

  const isValid = req.body.password === instance.password;
  if (!isValid) throw new BadRequestError("Invalid Email or password");

  const token = jwt.sign({userId: instance.id}, config.get('jwtPrivateKey'))

  res.header('x-auth-token', token).send(_.pick(instance, ['id', 'username', 'email']));
};

const list = async (req, res) => {
  const objects = await User.findAll({ where: req.filter });
  res.send(objects);
};

const detail = async (req, res) => {
  const instance = await User.findByPk(req.params.id);
  if (!instance) throw new BadRequestError("Resource not found");
  res.send(instance);
};

const update = async (req, res) => {
  // const instance = await User.findByPk(req.params.id);

  // if (!instance) throw new BadRequestError("Resource not found");

  // const nonAttr = Object.keys(req.body).filter(key => !(key in instance))
  // if (nonAttr) throw new BadRequestError(`sorry, ${nonAttr.join(', ')} are not valid attributes.`);

  // await instance.save();
  // res.send(instance);
  res.send("route under construction");
};

const remove = async (req, res) => {
  const instance = await User.findByPk(req.params.id);
  if (!instance) throw new BadRequestError("Resource is not found");
  await instance.destroy();
  res.send(instance);
};

module.exports = {
  create,
  authenticate,
  list,
  detail,
  update,
  remove,
};
