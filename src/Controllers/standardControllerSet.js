const { Model: BaseModel } = require("sequelize");
const sequelize = require("../database/database");
const filterFilter = require("../utils/filterFilter.util");
const { plural, singular } = require("pluralize");
const { ValidationError, BaseError } = require("../Middleware/error-handler");

function tryAssociate(Model, associationString) {
  const isModel = singular(associationString) in sequelize.models;
  let associationModel = null;
  if (isModel) {
    associationModel = sequelize.model(singular(associationString));
  }
  const isAssociated =
    isModel &&
    (singular(associationString) in Model.associations ||
      singular(associationString) in associationModel.associations ||
      plural(associationString) in Model.associations ||
      plural(associationString) in associationModel.associations);

  return { associationModel, isAssociated };
}

const standardControllerSet = (Model) => {
  if (!(Model.prototype instanceof BaseModel)) {
    throw new Error(
      "Sorry, Provided Model is not a subclass of the base Model"
    );
  }

  const create = async (req, res) => {
    const instance = await Model.create(req.body);
    res.send(instance);
  };

  const list = async (req, res) => {
    throw new BaseError([{name:'hosam', age: 27}, {name:'masoh', age: 72}], 444)

    filter = filterFilter(req.filter, Model.rawAttributes);
    const objects = await Model.findAll({ where: filter });

    res.send(objects);
  };

  const listInclude = async (req, res) => {
    const include = {};
    const { associationModel, isAssociated } = tryAssociate(
      Model,
      req.params.include
    );

    if (associationModel && isAssociated) {
      include.model = associationModel;
      include.where = filterFilter(req.filter, associationModel.rawAttributes);
      include.required = false;
    }
    console.log(associationModel.rawAttributes);
    const objects = await Model.findAll({ include: { ...include } });

    res.send(objects);
  };

  const detail = async (req, res) => {
    const instance = await Model.findByPk(req.params.id);
    res.send(instance);
  };

  const detailInclude = async (req, res) => {
    const include = {};
    const { associationModel, isAssociated } = tryAssociate(
      Model,
      req.params.include
    );

    if (associationModel && isAssociated) {
      include.model = associationModel;
      include.where = filterFilter(req.filter, associationModel.rawAttributes);
      include.required = false;
    }

    const instance = await Model.findByPk(req.params.id, {
      include: { ...include },
    });
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
        res.send(`sorry, "${key}" is not a valid attribute`);
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
    const destroyed = await instance.destroy().catch((error) => {
      res.send(error);
      return;
    });
    res.send(destroyed);
  };

  return {
    create,
    list,
    listInclude,
    detail,
    detailInclude,
    update,
    remove,
  };
};

module.exports = standardControllerSet;
