const sequelize = require("../database/database");
const { Model, DataTypes } = require("sequelize");

class Lease extends Model {}

Lease.init(
  {
    start: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "lease",
    scopes: {
      'active': {
        where: {

        }
      }
    }
  }
);

module.exports = Lease;
