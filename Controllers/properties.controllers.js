const Property = require("../Models/properties");
const Unit = require("../Models/units");

const create = async (req, res) => {
  Property.create(req.body)
    .then((instance) => {
      res.send(instance);
    })
    .catch((error) => {
      if ("errors" in error) {
        // to handle integrity errors
        const fields = error.errors.map((err) => {
          return {
            path: err.path,
            message: err.message,
          };
        });
        res.send({ errors: fields });
      } else {
        res.send(error);
      }
    });
};

const list = async (req, res) => {
  const objects = await Property.findAll({
    include: {
      model: Unit,
      required: true
    },
  });
  res.send(objects);
};

const detail = async (req, res) => {
  const instance = await Property.findByPk(req.params.id);
  if (!instance) {
    res.send("Resource not found");
  }
  res.send(instance);
};

const update = async (req, res) => {
  const instance = await Property.findByPk(req.params.id);
  if (!instance) {
    res.send("Resource not found");
    return;
  }
  Object.keys(req.body).forEach((key) => {
    if (key in instance) {
      instance[key] = req.body[key];
    } else {
      res.send(`sorry, "${key}" not a valid attribute`);
      return;
    }
  });
  await instance.save();
  res.send(instance);
};

const remove = async (req, res) => {
  const instance = await Property.findByPk(req.params.id);
  if (!instance) {
    res.send("Resource is not found");
    return;
  }
  const destroyed = await instance.destroy().catch((error) => {
    res.send(error);
    return;
  });
  res.send(destroyed);
};

module.exports = {
  create,
  list,
  detail,
  update,
  remove,
};
