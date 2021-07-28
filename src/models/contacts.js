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

Contact.isFullNameUnique = async function (
  workspaceId,
  firstName,
  middleName,
  lastName
) {
  const withSameName = await Contact.findAll({
    where: {
      workspaceId,
      firstName,
      middleName,
      lastName,
    },
  });
  return !withSameName.length;
};

Contact.isPhoneUnique = async function (
  workspaceId,
  phone
) {
  const withSameName = await Contact.findAll({
    where: {
      workspaceId,
      phone
    },
  });
  return !withSameName.length;
};

module.exports = Contact;
