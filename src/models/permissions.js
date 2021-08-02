const sequelize = require("./database");
const { Model, DataTypes } = require("sequelize");

class Permission extends Model {}

Permission.init(
  {
    title: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.action}_${this.module}`;
      },
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'permission'
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'permission'
    },
  },
  {
    sequelize,
    modelName: "permission",
  }
);

const permissions = [
  { action: "view", module: "properties" },
  { action: "add", module: "properties" },
  { action: "update", module: "properties" },
  { action: "delete", module: "properties" },
  { action: "view", module: "units" },
  { action: "add", module: "units" },
  { action: "update", module: "units" },
  { action: "delete", module: "units" },
  { action: "view", module: "leases" },
  { action: "add", module: "leases" },
  { action: "update", module: "leases" },
  { action: "delete", module: "leases" },
  { action: "view", module: "invoices" },
  { action: "add", module: "invoices" },
  { action: "update", module: "invoices" },
  { action: "delete", module: "invoices" },
  { action: "view", module: "payments" },
  { action: "add", module: "payments" },
  { action: "update", module: "payments" },
  { action: "delete", module: "payments" },
];

// Permission.bulkCreate(permissions).then((test) => {
//   console.log(test)
// })

module.exports = Permission;
