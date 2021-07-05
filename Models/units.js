const sequelize = require("../database/database");
const { Model, DataTypes } = require("sequelize");
const Property = require("./properties");

class Unit extends Model {}

Unit.init(
  {
    num: {
      unique: "propertyUnit",
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    beds: {
      type: DataTypes.NUMBER.UNSIGNED,
      // allowNull: false,
    },
    baths: {
      type: DataTypes.NUMBER.UNSIGNED,
      // allowNull: false,
    },
    size: {
      type: DataTypes.NUMBER.UNSIGNED,
      // allowNull: false,
    },
    marketRent: {
      type: DataTypes.NUMBER.UNSIGNED,
      // allowNull: false,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      unique: "propertyUnit",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "unit",
  }
);

module.exports = Unit;
