const sequelize = require("../database/database");
const { plural, singular } = require("pluralize");
const { BadRequestError } = require("../Middleware/error-handler");

function tryAssociate(Model, associationString) {
  const isModel = singular(associationString) in sequelize.models;
  if (!isModel) {
    throw new BadRequestError(
      `${associationString} is not a valid model.`
    );
  }
  const associationModel = sequelize.model(singular(associationString));
  const isAssociated =
    isModel &&
    (singular(associationString) in Model.associations ||
      singular(associationString) in associationModel.associations ||
      plural(associationString) in Model.associations ||
      plural(associationString) in associationModel.associations);

  if (!isAssociated) {
    throw new BadRequestError(
      `could not include ${associationString}.`
    );
  }
  return { associationModel, isAssociated };
}

module.exports = tryAssociate;
