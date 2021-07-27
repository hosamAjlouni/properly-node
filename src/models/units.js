const sequelize = require("./database");
const { Model, DataTypes, Op } = require("sequelize");

class Unit extends Model {}

Unit.init(
  {
    num: {
      unique: "uniqueUnit",
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    beds: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    baths: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    size: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    marketRent: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "unit",
  }
);

module.exports = Unit;
