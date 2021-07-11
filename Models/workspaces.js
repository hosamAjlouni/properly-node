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
  },
  {
    sequelize,
    modelName: "workspace",    
  }
);

module.exports = Workspace;
