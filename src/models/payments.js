const sequelize = require("./database");
const { Model, DataTypes } = require("sequelize");

class Payment extends Model {}

Payment.init(
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "payment",
  }
);

module.exports = Payment;
