const sequelize = require("../database/database");
const { Model, DataTypes } = require("sequelize");
const Unit = require("./units");

class Property extends Model {}

Property.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
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

Property.hasMany(Unit);
Unit.belongsTo(Property);

module.exports = Property;
