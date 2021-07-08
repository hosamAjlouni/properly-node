const { Unit } = require("../Models");
const { Model: BaseModel } = require("sequelize");
const sequelize = require("../database/database");
const { getPlural, getSingular } = require("../utils/pluralSingular");

function tryAssociate(Model, associationString) {
  const isModel = getSingular(associationString) in sequelize.models;
  let associationModel = null;
  if (isModel) {
    associationModel = sequelize.model(getSingular(associationString));
  }
  const isAssociated =
    isModel &&
    (getSingular(associationString) in Model.associations ||
      getSingular(associationString) in associationModel.associations ||
      getPlural(associationString) in Model.associations ||
      getPlural(associationString) in associationModel.associations);

  return {
    associationModel: associationModel,
    isAssociated: isAssociated,
  };
}

const standardApiSet = (Model) => {
  if (!(Model.prototype instanceof BaseModel)) {
    throw new Error(
      "Sorry, Provided Model is not a subclass of the base Model"
    );
  }

  const create = async (req, res) => {
    Model.create(req.body)
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

  const detailAssociation = async (req, res) => {
    const { associationModel, isAssociated } = tryAssociate(
      Model,
      req.params.association
    );
    
    const options = {}
    if (associationModel && isAssociated) {
      options.include = associationModel
    }
    
    const instance = await Model.findByPk(req.params.id, options);
    if (!instance) {
      res.send("Resource not found");
    }
    res.send(instance);
  };

  const listAssociation = async (req, res) => {
    // console.log(Property.prototype);
    console.log(Unit.associations);
    return;

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
    const destroyed = await instance.destroy().catch((error) => {
      res.send(error);
      return;
    });
    res.send(destroyed);
  };

  return {
    create,
    list,
    listAssociation,
    detail,
    detailAssociation,
    update,
    remove,
  };
};

module.exports = standardApiSet;
