const sequelize = require("./database");
const { Model, DataTypes } = require("sequelize");

class Contact extends Model {}

Contact.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "fullNameIndex",
      validate: {
        isAlpha: true,
      },
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "fullNameIndex",
      validate: {
        isAlpha: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "fullNameIndex",
      validate: {
        isAlpha: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "contact",
  }
);

module.exports = Contact;
