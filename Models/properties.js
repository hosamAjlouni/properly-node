const sequelize = require("../database/database");
const { Model, DataTypes } = require("sequelize");

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
    defaultScope: {
      order: [
        ["name", "ASC"]
      ]
    }
  }
);

module.exports = Property;
