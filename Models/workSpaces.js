const sequelize = require("../database/database");
const { Model, DataTypes, Op } = require("sequelize");

const User = require("./users");
const Property = require("./properties");

class WorkSpace extends Model {}

WorkSpace.init(
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
    modelName: "workSpace",    
  }
);

WorkSpace.hasMany(User);
User.belongsTo(WorkSpace);

WorkSpace.hasMany(Property, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "restrict",
});
Property.belongsTo(WorkSpace);

module.exports = WorkSpace;
