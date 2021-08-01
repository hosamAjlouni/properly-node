const sequelize = require("./database");
const { Model, DataTypes, Op } = require("sequelize");

class Property extends Model {}

Property.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: "uniqueProperty",
      allowNull: false,
    },
    yearBuilt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "property",
  }
);

Property.isNameUnique = async (workspaceId, name) => {
  const withSameName = await Property.findAll({
    where: {
      [Op.and]: {
        workspaceId,
        name,
      },
    },
  });
  return !withSameName.length;
};

module.exports = Property;
