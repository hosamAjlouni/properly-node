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

Unit.prototype.isAvailableBetween = async function (
  start = new Date(),
  end = new Date()
) {
  const activeLeases = await this.getLeases({
    scope: [
      {
        method: ["activeBetween", start, end],
      },
    ],
  });
  return activeLeases;
};

Unit.isNumUnique = async function (propertyId, num) {
  const units = await Unit.findAll({
    where: {
      propertyId,
      num,
    },
  });
  return !units.length;
};

module.exports = Unit;
