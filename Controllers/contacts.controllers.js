const standardApiSet = require("./standardApiSet");
const Contact = require("../Models/contacts");

const viewSet = standardApiSet(Contact);

module.exports = {
  ...viewSet
};
