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
    },
    baths: {
      type: DataTypes.NUMBER,
    },
    size: {
      type: DataTypes.NUMBER,
    },
    marketRent: {
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    modelName: "unit",
  }
);

module.exports = Unit;
