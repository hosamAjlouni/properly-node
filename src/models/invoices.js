const sequelize = require("./database");
const { Model, DataTypes } = require("sequelize");

class Invoice extends Model {}

Invoice.init(
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "invoice",
  }
);

module.exports = Invoice;
