const sequelize = require("../database/database");
const { Model, DataTypes, Op } = require("sequelize");

class Unit extends Model {}

Unit.init(
  {
    num: {
      unique: "uniqueUnit",
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    beds: {
      type: DataTypes.NUMBER.UNSIGNED,
    },
    baths: {
      type: DataTypes.NUMBER.UNSIGNED,
    },
    size: {
      type: DataTypes.NUMBER.UNSIGNED,
    },
    marketRent: {
      type: DataTypes.NUMBER.UNSIGNED,
    },
  },
  {
    sequelize,
    modelName: "unit",
  }
);

module.exports = Unit;
