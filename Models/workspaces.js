const sequelize = require("../database/database");
const { Model, DataTypes } = require("sequelize");

class Workspace extends Model {}

Workspace.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [[0]],
          msg: "minimum of zero",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "workspace",    
  }
);

module.exports = Workspace;
