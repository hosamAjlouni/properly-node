const { Model: baseModel } = require("sequelize");

const standardModelControllers = (Model) => {
  if (!(Model.prototype instanceof baseModel)) {
    const error = "Sorry, Provided model is not an instance of the base Model";
    throw new Error(error);
  }

  const create = async (req, res) => {
    Model.create(req.body)
      .then((instance) => {
        res.send(instance);
      })
      .catch((error) => {
        const fields = error.errors.map((err) => {
          return {
            path: err.path,
            message: err.message,
          };
        });
        const errors = {errors: fields}
        res.send(errors);
      });
  };

  const list = async (req, res) => {
    const objects = await Model.findAll();
    res.send(objects);
  };

  const detail = async (req, res) => {
    const instance = await Model.findByPk(req.params.id);
    if (!instance) {
      res.send("Resource not found");
    }
    res.send(instance);
  };

  const update = async (req, res) => {
    const instance = await Model.findByPk(req.params.id);
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
    const instance = await Model.findByPk(req.params.id);
    if (!instance) {
      res.send("Resource is not found");
      return;
    }
    const destroyed = await instance.destroy();
    res.send(destroyed);
  };

  return {
    create,
    list,
    detail,
    update,
    remove,
  };
};

module.exports = standardModelControllers;
