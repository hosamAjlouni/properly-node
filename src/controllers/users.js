const User = require("../models/users");
const { BadRequestError } = require("../middleware/error-handler");

const create = async (req, res) => {
  const instance = await User.create(req.body);
  res.send(instance);
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
  list,
  detail,
  update,
  remove,
};
