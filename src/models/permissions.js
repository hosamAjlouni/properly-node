const sequelize = require("./database");
const { Model, DataTypes } = require("sequelize");

class Permission extends Model {}

Permission.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "permission",
  }
);

// const permissions = [
//   { title: 'view_properties' },
//   { title: 'add_properties' },
//   { title: 'update_properties' },
//   { title: 'delete_properties' },
//   { title: 'view_units' },
//   { title: 'add_units' },
//   { title: 'update_units' },
//   { title: 'delete_units' },
//   { title: 'view_leases' },
//   { title: 'add_leases' },
//   { title: 'update_leases' },
//   { title: 'delete_leases' },
//   { title: 'view_invoices' },
//   { title: 'add_invoices' },
//   { title: 'update_invoices' },
//   { title: 'delete_invoices' },
//   { title: 'view_payments' },
//   { title: 'add_payments' },
//   { title: 'update_payments' },
//   { title: 'delete_payments' }
// ]

// Permission.bulkCreate(permissions).then((test) => {
//   console.log(test)
// })

module.exports = Permission;
