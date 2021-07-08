const sequelize = require("../database/database");
const { Model, DataTypes } = require("sequelize");

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
  },
  {
    sequelize,
    modelName: "unit",
    // validate: {
    //   async IsAvailable() {
    //     const units = await Unit.findAll();
    //     if (units.length >= 7) {
    //       throw new Error("you are allowed to have 7 units only!");
    //     }
    //   },
    // },
  }
);

module.exports = Unit;
